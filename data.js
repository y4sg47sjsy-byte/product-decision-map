/* =========================================================================
   Product Decision Map — data
   來源 Source：產品決策知識地圖.md / 產品數據分析與決策流程圖.md
   修改狀態 / 新增坑 / 調整優先級，直接改這個檔案即可。
   To edit status / add a new issue / change priority, just edit this file.
   status: "done" | "in-progress" | "todo" | "not-started"
   priority: "P0" | "P1" | "P2" | null
   title: "English Name 中文名稱" — node title is bilingual, English first.

   Tab 1（產品決策知識地圖）現在分兩層：
   - Trunk 主幹節點：來自 md 的 14 個實戰能力，狀態/坑/優先級都是真實內容。
   - Branch 分支節點：業界常見的子能力框架，md 沒有明確提到，狀態一律
     "not-started"（尚未深入），只提供「這是什麼」的定義，不杜撰做過什麼。
     要新增/調整分支，只要編輯下面 CAPABILITY_TRUNK_DEFS 裡對應 trunk 的
     branches 陣列即可，座標會自動計算。
   ========================================================================= */

/* -------------------------------------------------------------------------
   Tab 1：產品決策知識地圖 Product Decision Capability Map
   （主幹來源：產品決策知識地圖.md 第2節；分支為業界框架補充）
   Layout: horizontal trunk spine, branches hang below each trunk node
   ------------------------------------------------------------------------- */

const CAPABILITY_TRUNK_DEFS = [
  {
    id: "business-goal",
    title: "Business Goal 商業目標",
    subtitle: "我們真正要改善什麼？What are we truly trying to improve?",
    status: "done",
    priority: "P1",
    hasIssue: true,
    description: "我們真正要改善什麼？\nWhat are we truly trying to improve?",
    issues: [
      "高層關注整體流量，但流量受 SEO、內容、事件、產品等多因素影響\nLeadership focuses on overall traffic, but traffic is shaped by many factors — SEO, content, events, product changes."
    ],
    currentAction: [
      "將總流量拆成可分析的 Growth Drivers\nBreak total traffic into analyzable growth drivers."
    ],
    branches: [
      { title: "North Star Metric 北極星指標", description: "定義能代表整體商業健康的單一指標，讓所有團隊對齊同一個成功定義。\nDefine a single metric that represents overall business health so every team aligns on the same definition of success." },
      { title: "Growth Driver Decomposition 成長槓桿拆解", description: "把總體目標拆成可歸因、可分別優化的成長槓桿（如流量來源、留存、轉換）。\nBreak the overall goal into attributable, separately-optimizable growth drivers such as traffic sources, retention, and conversion." },
      { title: "OKR / Goal Alignment 目標對齊機制", description: "建立跨團隊目標與關鍵結果的對齊機制，確保各專案往同一方向努力。\nEstablish a cross-team OKR alignment mechanism so individual projects push in the same direction." },
      { title: "Competitive / Market Context 市場與競爭脈絡", description: "理解外部市場與競品動態，避免只用內部數據解讀商業表現。\nUnderstand external market and competitor dynamics, rather than reading business performance from internal data alone." }
    ]
  },
  {
    id: "opportunity-leverage",
    title: "Opportunity / Leverage 機會與槓桿",
    subtitle: "哪個投入最值得做？Which investment is worth making most?",
    status: "not-started",
    priority: "P1",
    hasIssue: true,
    description: "哪個投入最值得做？\nWhich investment is worth making most?",
    issues: [
      "容易直接從既有功能／UI 找優化點，可能忽略 SEO、內容、社群等更高槓桿項目\nEasy to default to optimizing existing features/UI, which can overlook higher-leverage areas like SEO, content, or social."
    ],
    currentAction: [
      "建立 Driver / Opportunity 的比較方式\nBuild a way to compare drivers and opportunities."
    ],
    branches: [
      { title: "Impact vs Effort Framework 影響力／投入評估框架", description: "用影響力與投入成本兩個維度評估每個潛在項目，作為排序依據。\nEvaluate each candidate initiative on impact vs. effort as the basis for prioritization." },
      { title: "Opportunity Sizing 機會規模估算", description: "估算每個機會點可能帶來的數量級效益，避免只憑直覺判斷值不值得做。\nEstimate the order-of-magnitude upside of each opportunity, rather than judging worth by gut feeling alone." },
      { title: "Portfolio Prioritization 專案組合排序", description: "在多個候選專案之間做組合層級的排序與取捨，而非逐案獨立決定。\nPrioritize and trade off across the whole portfolio of candidate projects, rather than deciding case by case." },
      { title: "Leverage Point Mapping 槓桿點盤點", description: "系統性盤點 SEO、內容、社群、產品體驗等不同槓桿點，避免視野侷限在單一管道。\nSystematically map leverage points — SEO, content, social, product experience — so the view isn't limited to a single channel." }
    ]
  },
  {
    id: "problem-framing",
    title: "Problem Framing 問題界定",
    subtitle: "現在真正要回答什麼問題？What question are we actually answering?",
    status: "done",
    priority: "P1",
    hasIssue: true,
    description: "現在真正要回答什麼問題？\nWhat question are we actually answering right now?",
    issues: [
      "Business Health、Feature 成效、Release 異常容易混在一起討論\nBusiness health, feature performance, and release anomalies easily get discussed as if they were one question."
    ],
    currentAction: [
      "明確區分不同問題類型\nClearly separate the different problem types."
    ],
    branches: [
      { title: "Problem Type Taxonomy 問題類型分類", description: "區分 Business Health、Feature 成效、Release 異常三種問題類型，各自對應不同分析方法。\nDistinguish business health, feature performance, and release-anomaly problem types, each requiring a different analysis approach." },
      { title: "Hypothesis Framing 假設陳述", description: "把模糊的疑問轉化成可驗證的假設陳述，作為後續分析的起點。\nTurn a vague question into a testable hypothesis statement as the starting point for analysis." },
      { title: "Success Criteria Definition 成功標準定義", description: "在分析開始前先定義「什麼結果算成功」，避免事後套用不同標準。\nDefine what counts as success before the analysis starts, to avoid applying a different standard after the fact." },
      { title: "Stakeholder Question Alignment 利害關係人提問對齊", description: "確認不同角色（主管、工程、營運）關心的問題是否一致，避免各自解讀同一組數據。\nConfirm that different stakeholders — leadership, engineering, ops — are asking the same question, rather than each interpreting the same data differently." }
    ]
  },
  {
    id: "measurement-design",
    title: "Measurement Design 觀測設計",
    subtitle: "什麼數字能回答問題？What numbers can answer the question?",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    description: "什麼數字能回答問題？\nWhat numbers can answer the question?",
    workDone: [
      "已能為部分專案定義觀測方式\nAlready able to define a measurement approach for some projects."
    ],
    issues: [
      "仍需逐案調整，尚無穩定通用方法\nStill needs case-by-case adjustment — no stable, general method yet."
    ],
    currentAction: [
      "補齊 Primary / Guardrail / Diagnostic Metric 概念\nFill in the concepts of Primary / Guardrail / Diagnostic metrics."
    ],
    branches: [
      { title: "Primary Metric 核心指標", description: "定義能直接代表這次問題成功與否的主要指標。\nDefine the primary metric that directly represents whether this problem is being solved." },
      { title: "Guardrail Metric 防護指標", description: "定義不能因為追求 Primary Metric 而犧牲的防護指標。\nDefine guardrail metrics that must not be sacrificed while chasing the primary metric." },
      { title: "Diagnostic Metric 診斷指標", description: "定義用來解釋「為什麼」Primary Metric 變動的輔助診斷指標。\nDefine diagnostic metrics used to explain why the primary metric moved." },
      { title: "Leading vs Lagging Indicator 領先／落後指標", description: "區分能提早示警的領先指標，與只能事後驗證的落後指標。\nDistinguish leading indicators that warn early from lagging indicators that only confirm after the fact." }
    ]
  },
  {
    id: "event-governance",
    title: "Event Governance 事件治理",
    subtitle: "資料是否能正確取得與理解？Can the data be captured and understood correctly?",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    description: "資料是否能正確取得與理解？\nCan the data actually be captured and understood correctly?",
    issues: [
      "事件過多\nToo many events.",
      "部分事件無法正確對應\nSome events don't map correctly.",
      "跨工程與營運定義不一致，限制可觀測範圍\nInconsistent definitions across engineering and ops limit what can be observed."
    ],
    currentAction: [
      "盤點既有事件\nInventory existing events.",
      "淘汰無使用目的、重複或無法正確對應的事件\nRetire events with no purpose, duplicates, or ones that don't map correctly.",
      "對齊設計、工程、營運的事件名稱、Trigger、Parameter 與用途\nAlign naming, triggers, parameters, and purpose across design, engineering, and ops."
    ],
    branches: [
      { title: "Event Taxonomy / Inventory 事件盤點與分類", description: "盤點所有既有事件，依用途分類，作為治理的第一步。\nInventory all existing events and categorize them by purpose, as the first step of governance." },
      { title: "Naming Convention 命名規範", description: "建立一致的事件與參數命名規則，避免同義事件重複建立。\nEstablish a consistent naming convention for events and parameters, to avoid duplicate events for the same meaning." },
      { title: "Trigger & Parameter Spec 觸發與參數規格", description: "明確定義每個事件的觸發時機與參數內容，作為工程實作的依據。\nClearly define each event's trigger condition and parameter payload as the spec for engineering implementation." },
      { title: "Deprecation Process 淘汰／下線流程", description: "建立事件淘汰的流程與判斷標準，避免事件只增不減。\nEstablish a process and criteria for deprecating events, so the event list doesn't only ever grow." },
      { title: "Cross-team Spec Alignment 跨團隊規格對齊機制", description: "讓設計、工程、營運對同一組事件規格有共同的理解與版本控管。\nGive design, engineering, and ops a shared understanding and version control over the same event spec." }
    ]
  },
  {
    id: "data-quality",
    title: "Data Quality 資料品質",
    subtitle: "收到的資料是否可信？Can the data we receive be trusted?",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    description: "收到的資料是否可信？\nCan the data we receive be trusted?",
    issues: [
      "有事件不代表資料一定能直接分析\nHaving an event fire doesn't mean the data is ready for direct analysis."
    ],
    currentAction: [
      "建立重要事件的驗證方式與 owner\nEstablish validation methods and an owner for key events.",
      "核心事件上線前確認是否正確觸發\nConfirm core events fire correctly before launch."
    ],
    branches: [
      { title: "Validation & QA Process 驗證流程", description: "在事件上線前後建立驗證流程，確認資料確實符合預期。\nEstablish a validation process before and after launch to confirm the data actually matches expectations." },
      { title: "Data Owner / Accountability 資料 Owner 機制", description: "為重要事件指定明確的負責人，確保資料品質有人把關。\nAssign a clear owner to key events so data quality has someone accountable." },
      { title: "Anomaly Detection on Ingestion 資料異常偵測", description: "在資料進入分析系統前，自動偵測異常筆數或欄位缺失。\nAutomatically detect abnormal volume or missing fields before data enters the analytics system." },
      { title: "Schema / Version Change Management 欄位與版本變更管理", description: "追蹤事件結構與版本的變更歷史，避免舊資料與新版定義混用。\nTrack the change history of event schemas and versions, to avoid mixing old data with a new definition." }
    ]
  },
  {
    id: "baseline",
    title: "Baseline 基準值",
    subtitle: "什麼叫正常？What counts as normal?",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    description: "什麼叫正常？\nWhat counts as normal?",
    issues: [
      "最近上線觀測缺乏基準值，導致團隊依個人經驗自由心證\nRecent launch monitoring lacked a baseline, so the team judged by individual gut feeling."
    ],
    currentAction: [
      "為核心指標建立歷史基準與合理波動範圍\nEstablish historical baselines and reasonable variance ranges for core metrics."
    ],
    branches: [
      { title: "Historical Baseline Calculation 歷史基準計算方法", description: "用歷史資料計算每個核心指標的正常區間。\nCalculate the normal range for each core metric from historical data." },
      { title: "Seasonality / Cyclical Pattern 季節性與週期性模式", description: "辨識日／週／季節性的規律波動，避免誤判為異常。\nIdentify daily/weekly/seasonal patterns so regular fluctuation isn't mistaken for an anomaly." },
      { title: "Variance Range Definition 合理波動範圍定義", description: "定義多少幅度的變化算是正常波動、多少算需要留意。\nDefine how much variation counts as normal fluctuation versus something worth watching." },
      { title: "Segment-level Baseline 分眾基準值", description: "針對不同來源、裝置、地區等分眾各自建立基準值，而非只看總體平均。\nEstablish a baseline per segment — source, device, region — rather than relying on the overall average alone." }
    ]
  },
  {
    id: "threshold-guardrail",
    title: "Threshold / Guardrail 門檻與防護線",
    subtitle: "什麼時候需要採取行動？When should we actually take action?",
    status: "todo",
    priority: "P0",
    hasIssue: true,
    description: "什麼時候需要採取行動？\nWhen should we actually take action?",
    issues: [
      "即使看到數字，也缺乏一致的異常判斷條件\nEven with the numbers visible, there's no consistent condition for judging what's abnormal."
    ],
    currentAction: [
      "定義需要調查／升級處理的條件\nDefine the conditions that require investigation or escalation."
    ],
    branches: [
      { title: "Alert Tiering 警示分級", description: "把異常訊號分成資訊、警告、緊急等不同層級，對應不同處理速度。\nTier anomaly signals into info / warning / critical, each mapped to a different response speed." },
      { title: "Escalation Path 升級處理流程", description: "定義發現異常後該通知誰、多久內要回應。\nDefine who to notify when an anomaly is found, and how quickly they need to respond." },
      { title: "Automated Monitoring 自動化監控", description: "用自動化規則取代人工每天盯數字，降低監控成本。\nUse automated rules instead of manually watching numbers every day, reducing monitoring cost." },
      { title: "False Positive Tuning 誤報調校", description: "持續調整門檻，減少過度敏感造成的誤報疲勞。\nContinuously tune thresholds to reduce alert fatigue from oversensitive rules." }
    ]
  },
  {
    id: "product-analytics",
    title: "Product Analytics 產品數據分析",
    subtitle: "發生了什麼、在哪裡發生？What happened, and where?",
    status: "done",
    priority: "P1",
    hasIssue: false,
    description: "發生了什麼、在哪裡發生？\nWhat happened, and where?",
    workDone: [
      "已能透過 GA / Dashboard / Segment 等協助功能驗收與分析\nAlready able to use GA / dashboards / segments to help verify and analyze."
    ],
    currentAction: [
      "持續累積診斷方法，而非增加報表數量\nKeep building diagnostic methods, rather than just adding more reports."
    ],
    branches: [
      { title: "Funnel Analysis 漏斗分析", description: "拆解使用者完成任務的每個步驟，找出流失發生的位置。\nBreak down each step of a user's task completion to find where drop-off happens." },
      { title: "Segmentation 使用者區隔", description: "依行為或屬性把使用者分群，比較不同群體的表現差異。\nGroup users by behavior or attributes to compare performance differences across segments." },
      { title: "Cohort Analysis 世代分析", description: "依加入時間分組追蹤留存與行為變化。\nTrack retention and behavior change by grouping users according to when they joined." },
      { title: "Session / Path Analysis 路徑分析", description: "還原使用者在單一 Session 內的實際瀏覽路徑，理解真實使用情境。\nReconstruct a user's actual browsing path within a single session to understand real usage context." },
      { title: "Feature Adoption Tracking 功能採用追蹤", description: "追蹤新功能上線後的採用率與持續使用率。\nTrack the adoption rate and continued usage rate of a feature after launch." }
    ]
  },
  {
    id: "insight",
    title: "Insight 洞察",
    subtitle: "數據支持什麼判斷？What judgment does the data support?",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    description: "數據支持什麼判斷？\nWhat judgment does the data support?",
    workDone: [
      "已有分析案例\nHave existing analysis cases."
    ],
    issues: [
      "新聞流量外部干擾高，容易陷入「到底發生什麼」的長時間分析\nNews traffic has high external interference — easy to get stuck in long analyses of \"what actually happened\"."
    ],
    currentAction: [
      "強化 evidence quality、confounder 與歸因意識\nStrengthen evidence quality, confounder awareness, and attribution thinking."
    ],
    branches: [
      { title: "Confounder / Bias Awareness 干擾因子意識", description: "主動辨識可能混淆結果解讀的外部干擾因子。\nProactively identify external confounders that could distort how results are interpreted." },
      { title: "Attribution Modeling 歸因模型", description: "在多因素同時影響結果時，建立方法拆解各因素的貢獻度。\nBuild a method to decompose each factor's contribution when multiple factors affect the outcome at once." },
      { title: "Evidence Quality Assessment 證據品質評估", description: "評估目前證據足以支持多強的判斷，還是仍屬於推測階段。\nAssess how strong a conclusion the current evidence can actually support, versus still being speculative." },
      { title: "Root Cause Analysis Method 根因分析方法", description: "用結構化方法（如 5 Why）往下追問，避免只停在表面現象。\nUse a structured method (e.g. 5 Whys) to dig past the surface symptom toward the root cause." }
    ]
  },
  {
    id: "decision",
    title: "Decision 決策",
    subtitle: "所以產品應該做什麼？So what should the product actually do?",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    description: "所以產品應該做什麼？\nSo what should the product actually do?",
    workDone: [
      "已有專案能讓數據參與設計／迭代決策\nSome projects already let data inform design and iteration decisions."
    ],
    issues: [
      "尚未穩定複製為通用流程\nNot yet reliably repeatable as a general process."
    ],
    currentAction: [
      "在基礎治理成熟後增加可重複案例\nAdd more repeatable cases once the foundational governance matures."
    ],
    branches: [
      { title: "Decision Framework 決策框架", description: "建立「做／不做／調整／繼續驗證」的決策選項與判斷依據。\nEstablish the decision options — do / don't / adjust / keep validating — and the criteria behind each." },
      { title: "Roadmap Integration Roadmap 整合機制", description: "讓數據洞察能實際進入 Roadmap 排序，而不是分析完就結束。\nLet data insight actually feed into roadmap prioritization, rather than ending once the analysis is done." },
      { title: "Resource Allocation Linkage 資源分配連結", description: "把決策結果與實際的人力／資源投入連結起來。\nConnect the decision outcome to actual headcount and resource allocation." },
      { title: "Decision Documentation 決策紀錄留存", description: "把決策的依據與脈絡留下紀錄，方便日後回顧與追蹤。\nKeep a record of the reasoning and context behind a decision, so it can be reviewed and traced later." }
    ]
  },
  {
    id: "align-execute",
    title: "Align / Execute 對齊與執行",
    subtitle: "如何讓正確的事情真的發生？How do we make the right thing actually happen?",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    description: "如何讓正確的事情真的發生？\nHow do we make the right thing actually happen?",
    issues: [
      "分析結果可能涉及設計、工程、SEO、營運、內容，不應由單一角色全部執行\nFindings may involve design, engineering, SEO, ops, and content — no single role should own execution alone."
    ],
    currentAction: [
      "強化跨角色對齊與責任分工\nStrengthen cross-role alignment and division of responsibility."
    ],
    branches: [
      { title: "Cross-functional RACI 跨職能責任分工", description: "明確定義設計、工程、SEO、營運、內容在這件事上各自的角色。\nClearly define the role of design, engineering, SEO, ops, and content in a given initiative." },
      { title: "Communication Cadence 溝通節奏機制", description: "建立固定的同步節奏，避免資訊只靠臨時會議傳遞。\nEstablish a regular sync cadence, rather than relying on ad-hoc meetings to pass along information." },
      { title: "Handoff Quality 交接品質", description: "確保分析結果交接到執行端時，脈絡與限制條件不會遺失。\nEnsure that context and constraints aren't lost when analysis is handed off to the execution team." }
    ]
  },
  {
    id: "outcome-validation",
    title: "Outcome Validation 成果驗證",
    subtitle: "做完真的有效嗎？Did it actually work?",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    description: "做完真的有效嗎？\nDid it actually work after we did it?",
    issues: [
      "新聞環境干擾因素多，前後比較不一定代表因果\nNews environments have many confounders — a before/after comparison doesn't always mean causation."
    ],
    currentAction: [
      "依問題選擇 before/after、灰度、experiment 等方法\nChoose before/after, gradual rollout, or experiments depending on the question."
    ],
    branches: [
      { title: "Before/After Comparison 前後比較法", description: "比較上線前後的指標變化，作為效果驗證的基本方法。\nCompare metrics before and after launch as the basic method of validating effect." },
      { title: "A/B / Experiment Design 實驗設計", description: "透過對照組設計，排除其他干擾因子，驗證真正的因果關係。\nUse a controlled experiment design to rule out confounders and validate true causality." },
      { title: "Gradual Rollout / Canary 灰度發布", description: "先在小範圍使用者上線，觀察無異常後再擴大範圍。\nLaunch to a small user segment first, then expand only after confirming no issues." },
      { title: "Side-effect / Regression Check 副作用與回歸檢查", description: "確認這次改動沒有在其他指標上造成非預期的負面影響。\nConfirm the change hasn't caused unintended negative effects on other metrics." }
    ]
  },
  {
    id: "learning-standardization",
    title: "Learning / Standardization 學習與制度化",
    subtitle: "如何避免下次重新踩坑？How do we avoid repeating the same mistake?",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    description: "如何避免下次重新踩坑？\nHow do we avoid hitting the same wall again next time?",
    issues: [
      "目前多由實戰撞牆後補流程\nMost of today's processes are only patched in after hitting a real wall in production."
    ],
    currentAction: [
      "將已驗證有效的方法逐步沉澱，而非一次建立完整制度\nGradually codify methods proven to work, rather than building a complete system all at once."
    ],
    branches: [
      { title: "Playbook / Runbook 方法論文件化", description: "把驗證有效的分析與處理方法寫成可複用的文件。\nWrite proven analysis and response methods into reusable documentation." },
      { title: "Postmortem Process 事後檢討機制", description: "針對重大事件建立固定的事後檢討流程，找出流程缺口。\nEstablish a standard postmortem process for major incidents to surface gaps in the process." },
      { title: "Knowledge Sharing Cadence 知識分享機制", description: "建立固定的知識分享節奏，讓踩過的坑不會只留在個人身上。\nEstablish a regular knowledge-sharing cadence so lessons learned don't stay with just one person." },
      { title: "Reusable Template Library 可複用範本庫", description: "把常用的分析框架、報表格式整理成可重複使用的範本。\nOrganize commonly used analysis frameworks and report formats into a reusable template library." }
    ]
  }
];

/* Node positions are no longer fixed here — script.js computes them from
   `column` (which x-slot a root node sits in) and `children` (the ordered
   list of child ids hanging below a node). This is what lets the "+ 新增"
   button in the UI insert a node anywhere without needing to redo any
   coordinate math. Trunk nodes each own one column; their branches become
   that trunk's children list. */

const capabilityNodes = [];
const capabilityEdges = [];

CAPABILITY_TRUNK_DEFS.forEach((def, i) => {
  const branchIds = (def.branches || []).map((b, bi) => `${def.id}-b${bi + 1}`);

  capabilityNodes.push({
    id: def.id,
    title: def.title,
    subtitle: def.subtitle,
    status: def.status,
    priority: def.priority,
    hasIssue: def.hasIssue,
    tier: "trunk",
    column: i,
    children: branchIds,
    description: def.description || "",
    workDone: def.workDone || [],
    issues: def.issues || [],
    currentAction: def.currentAction || [],
    learning: def.learning || []
  });

  if (i > 0) {
    capabilityEdges.push([CAPABILITY_TRUNK_DEFS[i - 1].id, def.id]);
  }

  (def.branches || []).forEach((b, bi) => {
    capabilityNodes.push({
      id: branchIds[bi],
      title: b.title,
      subtitle: "",
      status: "not-started",
      priority: null,
      hasIssue: false,
      tier: "branch",
      children: [],
      description: b.description || "",
      workDone: [],
      issues: [],
      currentAction: [],
      learning: []
    });
  });
});

const capabilityLoopEdge = ["learning-standardization", "business-goal"];

const capabilityGroups = [
  { label: "Data Foundation 資料基礎", rootIds: ["event-governance", "data-quality"] },
  { label: "Observation / Analysis 觀測與分析", rootIds: ["baseline", "threshold-guardrail", "product-analytics"] }
];

/* -------------------------------------------------------------------------
   Tab 2：產品數據分析與決策流程 Product Analytics → Decision Flow
   （來源：產品數據分析與決策流程圖.md）
   Layout: horizontal, left → right
   ------------------------------------------------------------------------- */
const flowNodes = [
  {
    id: "f-business-goal",
    title: "Business Goal 商業目標",
    subtitle: "[1]",
    status: "in-progress",
    priority: null,
    hasIssue: false,
    column: 0,
    children: [],
    description: "希望推動 Data-driven Decision\nWe want to drive data-driven decisions.",
    workDone: [],
    issues: [],
    currentAction: [],
    learning: []
  },
  {
    id: "f-opportunity-problem",
    title: "Opportunity / Problem 機會／問題",
    subtitle: "[2]",
    status: "in-progress",
    priority: null,
    hasIssue: false,
    column: 1,
    children: [],
    description: "",
    workDone: [],
    issues: [],
    currentAction: [],
    learning: []
  },
  {
    id: "f-metric-goal",
    title: "Define Success Metrics 定義成功與觀測指標",
    subtitle: "[3]",
    status: "in-progress",
    priority: null,
    hasIssue: false,
    column: 2,
    children: [],
    description: "",
    workDone: [],
    issues: [],
    currentAction: [],
    learning: []
  },
  {
    id: "f-event-governance",
    title: "Event Governance 事件治理",
    subtitle: "Data Foundation 資料基礎",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    column: 3,
    children: [],
    description: "資料是否能正確取得與理解？\nCan the data be captured and understood correctly?",
    workDone: [],
    issues: [
      "事件數量過多\nToo many events.",
      "定義不一致\nInconsistent definitions.",
      "部分事件無法正確對應\nSome events don't map correctly.",
      "→ 可觀測內容受限\n→ Observable scope becomes limited."
    ],
    currentAction: [
      "盤點事件與實際使用目的\nInventory events and their actual purpose.",
      "淘汰重複、無效、無法正確對應事件\nRetire duplicate, unused, or mis-mapped events.",
      "對齊工程、營運、設計的事件規格\nAlign event specs across engineering, ops, and design."
    ],
    learning: []
  },
  {
    id: "f-data-quality",
    title: "Data Quality 資料品質",
    subtitle: "Data Foundation 資料基礎",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    column: 3,
    children: [],
    description: "收到的資料是否可信？\nCan the data we receive be trusted?",
    workDone: [],
    issues: [
      "有事件不代表資料一定能直接分析\nHaving an event fire doesn't mean the data is ready for direct analysis."
    ],
    currentAction: [
      "核心事件建立驗證方式\nBuild validation methods for core events.",
      "上線前確認事件與參數是否符合規格\nConfirm events and parameters meet spec before launch."
    ],
    learning: []
  },
  {
    id: "f-metric-definition",
    title: "Metric Definition 指標定義",
    subtitle: "Data Foundation 資料基礎",
    status: "in-progress",
    priority: "P1",
    hasIssue: false,
    column: 3,
    children: [],
    description: "什麼數字能回答問題？\nWhat numbers can answer the question?",
    workDone: [
      "已能為部分專案定義觀測方式\nAlready able to define a measurement approach for some projects."
    ],
    issues: [
      "仍需逐案調整\nStill needs case-by-case adjustment."
    ],
    currentAction: [],
    learning: []
  },
  {
    id: "f-baseline",
    title: "Baseline 基準值",
    subtitle: "Observation Foundation 觀測基礎",
    status: "in-progress",
    priority: "P0",
    hasIssue: true,
    column: 4,
    children: [],
    description: "什麼叫正常？\nWhat counts as normal?",
    workDone: [],
    issues: [
      "Dashboard 已經可以看到數字，但缺乏 Baseline／判斷標準\nThe dashboard already shows numbers, but there's no baseline or judgment standard.",
      "每個人依經驗自由心證\nEveryone judges based on their own experience.",
      "上線異常未被及時辨識\nLaunch anomalies aren't identified in time."
    ],
    currentAction: [
      "為核心觀測指標建立基準\nEstablish a baseline for core metrics."
    ],
    learning: []
  },
  {
    id: "f-threshold-guardrail",
    title: "Threshold / Guardrail 門檻與防護線",
    subtitle: "Observation Foundation 觀測基礎",
    status: "todo",
    priority: "P0",
    hasIssue: true,
    column: 4,
    children: [],
    description: "什麼時候需要採取行動？\nWhen should we actually take action?",
    workDone: [],
    issues: [
      "即使看到數字，也缺乏一致的異常判斷條件\nEven with the numbers visible, there's no consistent condition for judging what's abnormal."
    ],
    currentAction: [
      "定義正常波動、需調查、需立即處理的判斷層級\nDefine tiers: normal variance, needs investigation, needs immediate action."
    ],
    learning: []
  },
  {
    id: "f-dashboard-segment",
    title: "Dashboard / Segment 儀表板／區隔",
    subtitle: "Observation Foundation 觀測基礎",
    status: "done",
    priority: "P1",
    hasIssue: false,
    column: 4,
    children: [],
    description: "發生了什麼、在哪裡發生？\nWhat happened, and where?",
    workDone: [
      "已能透過 GA / Dashboard / Segment 等協助功能驗收與分析\nAlready able to use GA / dashboards / segments to help verify and analyze."
    ],
    issues: [],
    currentAction: [
      "持續累積診斷方法，而非增加報表數量\nKeep building diagnostic methods, rather than just adding more reports."
    ],
    learning: [
      "三種觀測不要混在一起 Three kinds of observation shouldn't be mixed together：\nBusiness/Product Health（總流量、來源、SEO、內容結構；重點是建立 Driver 拆解 / focus: build driver breakdown）\nProduct/Feature（CTR、使用率、路徑、轉換；已有 Data-driven Case 可持續累積 / already have data-driven cases to build on）\nRelease/Guardrail（核心行為異常、關鍵指標驟降；優先補 Baseline/Threshold / top priority is Baseline/Threshold）"
    ]
  },
  {
    id: "f-analysis",
    title: "Analysis 分析",
    subtitle: "[6]",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    column: 5,
    children: [],
    description: "發生什麼？在哪裡？可能為什麼？\nWhat happened? Where? What might explain it?",
    workDone: [],
    issues: [
      "新聞流量受 SEO、內容、重大事件、來源結構等因素影響\nNews traffic is affected by SEO, content, major events, and source structure.",
      "Attribution / Diagnosis 困難\nAttribution and diagnosis are difficult."
    ],
    currentAction: [],
    learning: []
  },
  {
    id: "f-insight",
    title: "Insight 洞察",
    subtitle: "[7]",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    column: 6,
    children: [],
    description: "Evidence 支持哪些假設？哪些仍無法判斷？\nWhich hypotheses does the evidence support? What's still undecided?",
    workDone: [],
    issues: [
      "新聞流量外部干擾高，容易陷入「到底發生什麼」的長時間分析\nNews traffic has high external interference — easy to get stuck in long analyses of \"what actually happened\"."
    ],
    currentAction: [
      "強化 evidence quality、confounder 與歸因意識\nStrengthen evidence quality, confounder awareness, and attribution thinking."
    ],
    learning: []
  },
  {
    id: "f-decision",
    title: "Product Decision 產品決策",
    subtitle: "[8]",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    column: 7,
    children: [],
    description: "做 / 不做 / 調整 / 繼續驗證\nDo / don't / adjust / keep validating.",
    workDone: [
      "已有專案能讓數據參與設計／迭代決策\nSome projects already let data inform design and iteration decisions."
    ],
    issues: [
      "尚未穩定複製\nNot yet reliably repeatable."
    ],
    currentAction: [],
    learning: []
  },
  {
    id: "f-align-execute",
    title: "Align & Execute 對齊與執行",
    subtitle: "[9]",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    column: 8,
    children: [],
    description: "設計 / 工程 / 營運 / SEO / 內容\nDesign / engineering / ops / SEO / content.",
    workDone: [],
    issues: [
      "分析結果可能涉及設計、工程、SEO、營運、內容，不應由單一角色全部執行\nFindings may involve design, engineering, SEO, ops, and content — no single role should own execution alone."
    ],
    currentAction: [
      "強化跨角色對齊與責任分工\nStrengthen cross-role alignment and division of responsibility."
    ],
    learning: []
  },
  {
    id: "f-outcome-validation",
    title: "Outcome Validation 成果驗證",
    subtitle: "[10]",
    status: "in-progress",
    priority: "P2",
    hasIssue: true,
    column: 9,
    children: [],
    description: "結果是否改善？是否有副作用？\nDid the result improve? Were there side effects?",
    workDone: [],
    issues: [
      "新聞環境干擾因素多，前後比較不一定代表因果\nNews environments have many confounders — a before/after comparison doesn't always mean causation."
    ],
    currentAction: [
      "依問題選擇 before/after、灰度、experiment 等方法\nChoose before/after, gradual rollout, or experiments depending on the question."
    ],
    learning: []
  },
  {
    id: "f-learning",
    title: "Learning 學習沉澱",
    subtitle: "[11]",
    status: "in-progress",
    priority: "P1",
    hasIssue: true,
    column: 10,
    children: [],
    description: "沉澱有效方法 → 回到下一輪\nCodify what worked → feed back into the next cycle.",
    workDone: [],
    issues: [
      "目前多由實戰撞牆後補流程\nMost of today's processes are only patched in after hitting a real wall in production."
    ],
    currentAction: [
      "將已驗證有效的方法逐步沉澱，而非一次建立完整制度\nGradually codify methods proven to work, rather than building a complete system all at once."
    ],
    learning: []
  }
];

const flowEdges = [
  ["f-business-goal", "f-opportunity-problem"],
  ["f-opportunity-problem", "f-metric-goal"],
  ["f-metric-goal", "f-event-governance"],
  ["f-metric-goal", "f-data-quality"],
  ["f-metric-goal", "f-metric-definition"],
  ["f-event-governance", "f-baseline"],
  ["f-data-quality", "f-threshold-guardrail"],
  ["f-metric-definition", "f-dashboard-segment"],
  ["f-baseline", "f-analysis"],
  ["f-threshold-guardrail", "f-analysis"],
  ["f-dashboard-segment", "f-analysis"],
  ["f-analysis", "f-insight"],
  ["f-insight", "f-decision"],
  ["f-decision", "f-align-execute"],
  ["f-align-execute", "f-outcome-validation"],
  ["f-outcome-validation", "f-learning"]
];

const flowLoopEdge = ["f-learning", "f-business-goal"];

const flowGroups = [
  { label: "[4] Data Foundation 資料基礎", rootIds: ["f-event-governance", "f-data-quality", "f-metric-definition"] },
  { label: "[5] Observation Foundation 觀測基礎", rootIds: ["f-baseline", "f-threshold-guardrail", "f-dashboard-segment"] }
];
