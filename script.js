/* =========================================================================
   Product Decision Map — render / interaction logic
   ========================================================================= */

const STATUS_META = {
  "done":         { icon: "✓", label: "已實踐 Done" },
  "in-progress":  { icon: "◐", label: "進行中 In Progress" },
  "todo":         { icon: "!", label: "待補 To Do" },
  "not-started":  { icon: "○", label: "尚未深入 Not Started" }
};

const STATUS_COLOR_VAR = {
  "done": "--status-done",
  "in-progress": "--status-inprogress",
  "todo": "--status-todo",
  "not-started": "--status-notstarted"
};

const state = {
  activeTab: "capability",
  statusFilter: "all",
  priorityFilter: "all"
};

const MAPS = {
  capability: {
    nodes: capabilityNodes,
    edges: capabilityEdges,
    loopEdge: capabilityLoopEdge,
    groups: capabilityGroups,
    canvasId: "capability-canvas"
  },
  flow: {
    nodes: flowNodes,
    edges: flowEdges,
    loopEdge: flowLoopEdge,
    groups: flowGroups,
    canvasId: "flow-canvas"
  }
};

/* ---------------------------------------------------------------------- */
/* local persistence — status/priority edits and user-added nodes         */
/* ---------------------------------------------------------------------- */

const STORAGE_KEY = "pdm_overrides_v1";

function loadOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { fields: {}, added: { capability: [], flow: [] } };
    const parsed = JSON.parse(raw);
    return {
      fields: parsed.fields || {},
      added: { capability: parsed.added?.capability || [], flow: parsed.added?.flow || [] }
    };
  } catch (e) {
    return { fields: {}, added: { capability: [], flow: [] } };
  }
}

function saveOverrides() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

const overrides = loadOverrides();

/* Merge saved edits into the base data, once, before first render. */
function applyOverrides() {
  Object.entries(overrides.fields).forEach(([nodeId, fields]) => {
    for (const key of Object.keys(MAPS)) {
      const node = MAPS[key].nodes.find(n => n.id === nodeId);
      if (node) Object.assign(node, fields);
    }
  });

  Object.entries(overrides.added).forEach(([mapKey, addedNodes]) => {
    const map = MAPS[mapKey];
    if (!map) return;
    addedNodes.forEach(n => {
      if (map.nodes.some(existing => existing.id === n.id)) return;
      map.nodes.push({
        id: n.id,
        title: n.title,
        subtitle: "",
        status: n.status || "not-started",
        priority: n.priority || null,
        hasIssue: false,
        tier: "branch",
        children: [],
        description: n.description || "",
        workDone: [],
        issues: [],
        currentAction: [],
        learning: []
      });
      const parent = map.nodes.find(p => p.id === n.parentId);
      if (parent) {
        parent.children = parent.children || [];
        if (!parent.children.includes(n.id)) parent.children.push(n.id);
      }
    });
  });
}

applyOverrides();

/* ---------------------------------------------------------------------- */
/* layout engine                                                          */
/* ---------------------------------------------------------------------- */

/* Node position is computed, not stored: `column` places a root node's
   x-slot; `children` (an ordered id list) hangs a chain of nodes below it.
   This is what lets "+ 新增" insert a node anywhere without redoing any
   coordinate math — it only has to push an id into a children array. */

const NODE_HALF_WIDTH = 113;
const NODE_ANCHOR_Y = 34; // approx vertical center of a node card
const COLUMN_X_START = 150;
const COLUMN_X_STEP = 300;
const ROOT_Y = 200;
const ROW_STEP = 150;

function computeLayout(map) {
  const nodeById = {};
  map.nodes.forEach(n => nodeById[n.id] = n);

  const columns = {};
  map.nodes.forEach(n => {
    if (typeof n.column === "number") {
      (columns[n.column] = columns[n.column] || []).push(n.id);
    }
  });

  const positions = {};
  const childEdges = [];

  Object.keys(columns).map(Number).sort((a, b) => a - b).forEach(colIndex => {
    const x = COLUMN_X_START + colIndex * COLUMN_X_STEP;
    let cursorY = ROOT_Y;

    function place(id) {
      positions[id] = { x, y: cursorY };
      cursorY += ROW_STEP;
      const node = nodeById[id];
      (node.children || []).forEach(childId => {
        if (!nodeById[childId]) return;
        childEdges.push([id, childId]);
        place(childId);
      });
    }

    columns[colIndex].forEach(place);
  });

  return { positions, childEdges };
}

function computeCanvasSize(positions) {
  let maxX = 0, maxY = 0;
  Object.values(positions).forEach(p => {
    maxX = Math.max(maxX, p.x + NODE_HALF_WIDTH);
    maxY = Math.max(maxY, p.y + 100);
  });
  return { width: maxX + 80, height: maxY + 170 }; // extra bottom space for the loop-back arc
}

function anchorRight(p) { return { x: p.x + NODE_HALF_WIDTH, y: p.y + NODE_ANCHOR_Y }; }
function anchorLeft(p) { return { x: p.x - NODE_HALF_WIDTH, y: p.y + NODE_ANCHOR_Y }; }
function anchorBottom(p, tier) { return { x: p.x, y: p.y + (tier === "branch" ? 46 : 78) }; }
function anchorTop(p) { return { x: p.x, y: p.y }; }

function buildEdgePath(a, b) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

/* Vertical connector: a node → its children (a chain hanging below it,
   not part of the main left-to-right flow). */
function buildBranchEdgePath(a, b) {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
}

function buildLoopPath(a, b, canvasHeight) {
  const dropY = canvasHeight - 40;
  return `M ${a.x} ${a.y} C ${a.x} ${dropY}, ${b.x} ${dropY}, ${b.x} ${b.y}`;
}

function renderMap(key) {
  const map = MAPS[key];
  const canvas = document.getElementById(map.canvasId);
  canvas.innerHTML = "";

  const nodeById = {};
  map.nodes.forEach(n => nodeById[n.id] = n);

  const { positions, childEdges } = computeLayout(map);
  const size = computeCanvasSize(positions);
  canvas.style.width = size.width + "px";
  canvas.style.height = size.height + "px";

  // group boxes — bounding box computed from the current position of their root ids
  (map.groups || []).forEach(g => {
    const pts = g.rootIds.map(id => positions[id]).filter(Boolean);
    if (!pts.length) return;
    const minX = Math.min(...pts.map(p => p.x)) - 150;
    const maxX = Math.max(...pts.map(p => p.x)) + 150;
    const minY = Math.min(...pts.map(p => p.y)) - 30;
    const maxY = Math.max(...pts.map(p => p.y)) + 130;
    const box = document.createElement("div");
    box.className = "group-box";
    box.style.left = minX + "px";
    box.style.top = minY + "px";
    box.style.width = (maxX - minX) + "px";
    box.style.height = (maxY - minY) + "px";
    const label = document.createElement("div");
    label.className = "group-box-label";
    label.textContent = g.label;
    box.appendChild(label);
    canvas.appendChild(box);
  });

  // svg edge layer
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "edge-layer");
  svg.setAttribute("width", size.width);
  svg.setAttribute("height", size.height);
  svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`);

  map.edges.forEach(([fromId, toId]) => {
    const a = positions[fromId], b = positions[toId];
    if (!a || !b) return;
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", buildEdgePath(anchorRight(a), anchorLeft(b)));
    path.setAttribute("class", "edge-line");
    path.dataset.from = fromId;
    path.dataset.to = toId;
    svg.appendChild(path);
  });

  childEdges.forEach(([fromId, toId]) => {
    const a = positions[fromId], b = positions[toId];
    if (!a || !b) return;
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", buildBranchEdgePath(anchorBottom(a, nodeById[fromId].tier), anchorTop(b)));
    path.setAttribute("class", "edge-line branch-edge");
    path.dataset.from = fromId;
    path.dataset.to = toId;
    svg.appendChild(path);
  });

  if (map.loopEdge) {
    const [fromId, toId] = map.loopEdge;
    const a = positions[fromId], b = positions[toId];
    if (a && b) {
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", buildLoopPath(anchorBottom(a, nodeById[fromId].tier), anchorBottom(b, nodeById[toId].tier), size.height));
      path.setAttribute("class", "edge-line loop");
      path.dataset.from = fromId;
      path.dataset.to = toId;
      svg.appendChild(path);
    }
  }

  canvas.appendChild(svg);

  // nodes
  map.nodes.forEach(node => {
    const p = positions[node.id];
    if (!p) return;
    const el = document.createElement("div");
    el.className = "node" + (node.tier === "branch" ? " node-branch" : "");
    el.dataset.status = node.status;
    el.dataset.priority = node.priority || "none";
    el.dataset.id = node.id;
    el.style.left = p.x + "px";
    el.style.top = p.y + "px";

    const statusMeta = STATUS_META[node.status];

    el.innerHTML = `
      <div class="node-top">
        <span class="node-status-icon">${statusMeta.icon}</span>
        <div class="node-title-wrap">
          <div class="node-title">${escapeHtml(node.title)}</div>
          ${node.subtitle ? `<div class="node-subtitle">${escapeHtml(node.subtitle)}</div>` : ""}
        </div>
        <div class="node-badges">
          ${node.hasIssue ? `<span class="issue-flag">⚠</span>` : ""}
          ${node.priority ? `<span class="priority-badge ${node.priority}">${node.priority}</span>` : ""}
        </div>
      </div>
    `;

    el.addEventListener("click", () => openDrawer(node, key));
    canvas.appendChild(el);
  });

  applyFilters(key);

  if (selectedNodeId) {
    const stillSelected = canvas.querySelector(`.node[data-id="${selectedNodeId}"]`);
    if (stillSelected) stillSelected.classList.add("selected");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* Data entries store bilingual text as "中文\nEnglish". Render as two lines:
   Chinese normal weight, English muted/smaller underneath. */
function renderBilingualHtml(str) {
  const parts = str.split("\n");
  if (parts.length === 1) return escapeHtml(parts[0]);
  const [zh, ...rest] = parts;
  return `<span class="bi-zh">${escapeHtml(zh)}</span><span class="bi-en">${escapeHtml(rest.join(" "))}</span>`;
}

/* ---------------------------------------------------------------------- */
/* filters                                                                 */
/* ---------------------------------------------------------------------- */

function applyFilters(key) {
  const map = MAPS[key];
  const canvas = document.getElementById(map.canvasId);
  const nodeEls = canvas.querySelectorAll(".node");
  const edgeEls = canvas.querySelectorAll(".edge-line");

  const matchesFn = (node) => {
    const statusOk = state.statusFilter === "all" || node.status === state.statusFilter;
    const priorityOk = state.priorityFilter === "all" || node.priority === state.priorityFilter;
    return statusOk && priorityOk;
  };

  const nodeById = {};
  map.nodes.forEach(n => nodeById[n.id] = n);
  const matchSet = new Set();

  nodeEls.forEach(el => {
    const node = nodeById[el.dataset.id];
    const match = matchesFn(node);
    el.classList.toggle("dim", !match);
    if (match) matchSet.add(node.id);
  });

  edgeEls.forEach(el => {
    const bothMatch = matchSet.has(el.dataset.from) && matchSet.has(el.dataset.to);
    el.classList.toggle("dim", !bothMatch);
  });
}

function setupFilterBar() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.filterType;
      const value = btn.dataset.filterValue;

      document.querySelectorAll(`.filter-btn[data-filter-type="${type}"]`)
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (type === "status") state.statusFilter = value;
      if (type === "priority") state.priorityFilter = value;

      applyFilters(state.activeTab);
    });
  });
}

/* ---------------------------------------------------------------------- */
/* tabs                                                                    */
/* ---------------------------------------------------------------------- */

function setupTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      state.activeTab = tab;

      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".mappanel").forEach(p => p.classList.remove("active"));
      document.getElementById(`panel-${tab}`).classList.add("active");

      closeDrawer();
    });
  });
}

/* ---------------------------------------------------------------------- */
/* drawer                                                                  */
/* ---------------------------------------------------------------------- */

let selectedNodeId = null;
let drawerMapKey = null;

const STATUS_ORDER = ["done", "in-progress", "todo", "not-started"];
const PRIORITY_ORDER = ["P0", "P1", "P2", null];

function findNode(mapKey, nodeId) {
  return MAPS[mapKey].nodes.find(n => n.id === nodeId);
}

/* Persist a status/priority change, update the in-memory node, re-render
   the map so the card on canvas reflects it immediately, and refresh the
   open drawer if it's still showing this node. */
function updateNodeFields(mapKey, nodeId, fields) {
  const node = findNode(mapKey, nodeId);
  if (!node) return;
  Object.assign(node, fields);

  overrides.fields[nodeId] = { ...(overrides.fields[nodeId] || {}), ...fields };
  saveOverrides();

  renderMap(mapKey);
  if (selectedNodeId === nodeId && drawerMapKey === mapKey) {
    openDrawer(node, mapKey, { keepScroll: true });
  }
}

let addChildCounter = 0;

function addChildNode(mapKey, parentId, title, description) {
  const map = MAPS[mapKey];
  const parent = findNode(mapKey, parentId);
  if (!parent || !title.trim()) return;

  addChildCounter += 1;
  const newId = `${parentId}-custom-${addChildCounter}-${Math.floor(Math.random() * 100000)}`;

  const newNode = {
    id: newId,
    title: title.trim(),
    subtitle: "",
    status: "not-started",
    priority: null,
    hasIssue: false,
    tier: "branch",
    children: [],
    description: description.trim(),
    workDone: [],
    issues: [],
    currentAction: [],
    learning: []
  };

  map.nodes.push(newNode);
  parent.children = parent.children || [];
  parent.children.push(newId);

  overrides.added[mapKey] = overrides.added[mapKey] || [];
  overrides.added[mapKey].push({ id: newId, parentId, title: newNode.title, description: newNode.description });
  saveOverrides();

  renderMap(mapKey);
  openDrawer(newNode, mapKey);
}

function renderStatusEditor(node, mapKey) {
  const wrap = document.createElement("div");
  wrap.className = "editor-row";
  STATUS_ORDER.forEach(statusKey => {
    const meta = STATUS_META[statusKey];
    const btn = document.createElement("button");
    btn.className = "editor-btn" + (node.status === statusKey ? " active" : "");
    btn.innerHTML = `${meta.icon} <span>${escapeHtml(meta.label)}</span>`;
    btn.addEventListener("click", () => updateNodeFields(mapKey, node.id, { status: statusKey }));
    wrap.appendChild(btn);
  });
  return wrap;
}

function renderPriorityEditor(node, mapKey) {
  const wrap = document.createElement("div");
  wrap.className = "editor-row";
  PRIORITY_ORDER.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "editor-btn" + (node.priority === p ? " active" : "");
    btn.textContent = p || "無 None";
    btn.addEventListener("click", () => updateNodeFields(mapKey, node.id, { priority: p }));
    wrap.appendChild(btn);
  });
  return wrap;
}

function renderAddChildForm(node, mapKey) {
  const wrap = document.createElement("div");
  wrap.className = "add-child-form";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "add-child-input";
  titleInput.placeholder = "項目名稱 Title";

  const descInput = document.createElement("textarea");
  descInput.className = "add-child-textarea";
  descInput.placeholder = "這是什麼（選填） What it solves (optional)";
  descInput.rows = 2;

  const submitBtn = document.createElement("button");
  submitBtn.className = "add-child-submit";
  submitBtn.textContent = "+ 新增 Add";
  submitBtn.addEventListener("click", () => {
    if (!titleInput.value.trim()) {
      titleInput.focus();
      return;
    }
    addChildNode(mapKey, node.id, titleInput.value, descInput.value);
  });

  wrap.appendChild(titleInput);
  wrap.appendChild(descInput);
  wrap.appendChild(submitBtn);
  return wrap;
}

function openDrawer(node, mapKey, opts) {
  selectedNodeId = node.id;
  drawerMapKey = mapKey;

  const canvas = document.getElementById(MAPS[mapKey].canvasId);
  canvas.querySelectorAll(".node.selected").forEach(el => el.classList.remove("selected"));
  const el = canvas.querySelector(`.node[data-id="${node.id}"]`);
  if (el) el.classList.add("selected");

  const statusMeta = STATUS_META[node.status];
  const colorVar = STATUS_COLOR_VAR[node.status];

  document.getElementById("drawer-status-line").innerHTML = `
    <span class="dot" style="background: var(${colorVar})"></span>
    <span>${statusMeta.icon} ${statusMeta.label}</span>
    ${node.priority ? `<span class="priority-badge ${node.priority}">${node.priority}</span>` : `<span>無優先級 No Priority</span>`}
  `;
  document.getElementById("drawer-title").textContent = node.title;

  const body = document.getElementById("drawer-body");
  const scrollTop = opts?.keepScroll ? body.scrollTop : 0;
  body.innerHTML = "";

  // inline editors — always available, on every node
  const editorSection = document.createElement("div");
  editorSection.className = "drawer-section editor-section";

  const statusLabel = document.createElement("div");
  statusLabel.className = "drawer-section-title";
  statusLabel.innerHTML = `<span class="zh">編輯狀態</span><span class="en">Edit status</span>`;
  editorSection.appendChild(statusLabel);
  editorSection.appendChild(renderStatusEditor(node, mapKey));

  const priorityLabel = document.createElement("div");
  priorityLabel.className = "drawer-section-title";
  priorityLabel.style.marginTop = "12px";
  priorityLabel.innerHTML = `<span class="zh">編輯優先級</span><span class="en">Edit priority</span>`;
  editorSection.appendChild(priorityLabel);
  editorSection.appendChild(renderPriorityEditor(node, mapKey));

  body.appendChild(editorSection);

  const sections = [
    { key: "description", titleZh: "這是什麼", titleEn: "What it solves", type: "text" },
    { key: "workDone", titleZh: "我們做過什麼", titleEn: "What we've done", type: "list" },
    { key: "issues", titleZh: "實戰碰到的問題", titleEn: "Issues hit in production", type: "list", issue: true },
    { key: "currentAction", titleZh: "目前處理", titleEn: "Currently addressing", type: "list" },
    { key: "learning", titleZh: "Learning 學到什麼", titleEn: "Learning", type: "list" }
  ];

  sections.forEach(sec => {
    const val = node[sec.key];
    const isEmpty = sec.type === "text" ? !val : (!val || val.length === 0);
    if (isEmpty) return;

    const section = document.createElement("div");
    section.className = "drawer-section" + (sec.issue ? " issues" : "");

    const titleEl = document.createElement("div");
    titleEl.className = "drawer-section-title" + (sec.issue ? " issue" : "");
    titleEl.innerHTML = `${sec.issue ? "⚠ " : ""}<span class="zh">${escapeHtml(sec.titleZh)}</span><span class="en">${escapeHtml(sec.titleEn)}</span>`;
    section.appendChild(titleEl);

    if (sec.type === "text") {
      const p = document.createElement("p");
      p.innerHTML = renderBilingualHtml(val);
      section.appendChild(p);
    } else {
      const ul = document.createElement("ul");
      val.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = renderBilingualHtml(item);
        ul.appendChild(li);
      });
      section.appendChild(ul);
    }

    body.appendChild(section);
  });

  // add-child — always available, on every node
  const addSection = document.createElement("div");
  addSection.className = "drawer-section add-section";
  const addLabel = document.createElement("div");
  addLabel.className = "drawer-section-title";
  addLabel.innerHTML = `<span class="zh">新增子項目</span><span class="en">Add sub-item</span>`;
  addSection.appendChild(addLabel);
  addSection.appendChild(renderAddChildForm(node, mapKey));
  body.appendChild(addSection);

  body.scrollTop = scrollTop;

  document.getElementById("drawer").classList.add("open");
  document.getElementById("drawer-backdrop").classList.add("open");
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("drawer-backdrop").classList.remove("open");
  document.querySelectorAll(".node.selected").forEach(el => el.classList.remove("selected"));
  selectedNodeId = null;
  drawerMapKey = null;
}

function setupDrawer() {
  document.getElementById("drawer-close").addEventListener("click", closeDrawer);
  document.getElementById("drawer-backdrop").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });
}

/* ---------------------------------------------------------------------- */
/* export / import — a portable backup of the localStorage edit history   */
/* ---------------------------------------------------------------------- */

function exportOverrides() {
  const blob = new Blob([JSON.stringify(overrides, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "product-decision-map-edits.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importOverrides(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try {
      parsed = JSON.parse(reader.result);
    } catch (e) {
      alert("這個檔案不是有效的 JSON。This file is not valid JSON.");
      return;
    }
    const ok = confirm(
      "匯入將會覆蓋目前這台瀏覽器上的所有編輯紀錄（狀態變更、新增節點），確定要繼續嗎？\n" +
      "Importing will overwrite all local edits in this browser (status changes, added nodes). Continue?"
    );
    if (!ok) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      fields: parsed.fields || {},
      added: { capability: parsed.added?.capability || [], flow: parsed.added?.flow || [] }
    }));

    // A full reload re-parses data.js from scratch and re-applies the
    // newly-imported overrides on top of it — patching the already-mutated
    // in-memory nodes in place can't "un-apply" fields the import removed.
    location.reload();
  };
  reader.readAsText(file);
}

function setupExportImport() {
  document.getElementById("export-btn").addEventListener("click", exportOverrides);

  const fileInput = document.getElementById("import-file-input");
  document.getElementById("import-btn").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) importOverrides(fileInput.files[0]);
    fileInput.value = "";
  });
}

/* ---------------------------------------------------------------------- */
/* init                                                                    */
/* ---------------------------------------------------------------------- */

function init() {
  setupTabs();
  setupFilterBar();
  setupDrawer();
  setupExportImport();
  renderMap("capability");
  renderMap("flow");
}

document.addEventListener("DOMContentLoaded", init);
