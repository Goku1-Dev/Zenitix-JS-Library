// @ts-ignore - import.meta.env is provided by Vite
// @ts-ignore
const isDev = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.DEV : true;

// -----------------------------------------------
// styles
// -----------------------------------------------

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

  #engine-overlay {
    position:        fixed;
    inset:           0;
    pointer-events:  none;
    z-index:         99999;
    display:         flex;
    align-items:     center;
    justify-content: center;
    font-family:     'Syne', system-ui, sans-serif;
    padding:         30px;
    background:      rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
  }

  #engine-overlay * {
    box-sizing: border-box;
  }

  #engine-overlay-box {
    pointer-events:  auto;
    background:      #0a0a0a;
    border:          1px solid #1f1f1f;
    border-radius:   6px;
    width:           min(1100px, 100vw - 40px);
    max-height:      min(82vh, 100vh - 40px);
    height:          min(82vh, 100vh - 40px);
    display:         flex;
    flex-direction:  row;
    box-shadow:      0 40px 80px rgba(0, 0, 0, 0.7);
    overflow:        hidden;
  }

  /* ── Sidebar ── */
  #engine-overlay-sidebar {
    width:          240px;
    min-width:      240px;
    background:     #0f0f0f;
    border-right:   1px solid #1f1f1f;
    display:        flex;
    flex-direction: column;
    overflow-y:     auto;
  }

  .engine-sidebar-header {
    padding:        16px 18px 14px;
    border-bottom:  1px solid #1f1f1f;
    font-family:    'Space Mono', monospace;
    font-size:      8px;
    font-weight:    700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color:          #666;
  }

  .engine-sidebar-item {
    padding:        14px 18px;
    cursor:         pointer;
    border-bottom:  1px solid #141414;
    border-left:    2px solid transparent;
    transition:     background .12s, border-color .12s;
    display:        flex;
    flex-direction: column;
    gap:            5px;
    position:       relative;
  }

  .engine-sidebar-item:hover {
    background: #141414;
  }

  .engine-sidebar-item.active {
    background:   rgba(255, 59, 59, 0.06);
    border-left-color: #ff3b3b;
  }

  .engine-warning.engine-sidebar-item.active {
    background:        rgba(232, 255, 71, 0.05);
    border-left-color: #e8ff47;
  }

  .engine-sidebar-title {
    font-size:            12px;
    font-weight:          600;
    color:                #aaa;
    display:              -webkit-box;
    -webkit-line-clamp:   2;
    -webkit-box-orient:   vertical;
    overflow:             hidden;
    line-height:          1.45;
    word-break:           break-word;
  }

  .engine-sidebar-item.active .engine-sidebar-title { color: #f0ede8; }

  .engine-sidebar-meta {
    font-family:    'Space Mono', monospace;
    font-size:      9px;
    color:          #555;
    display:        flex;
    justify-content: space-between;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  .engine-sidebar-item.active .engine-sidebar-meta { color: #888; }

  /* ── Main panel ── */
  #engine-overlay-main {
    flex:           1;
    display:        flex;
    flex-direction: column;
    overflow:       hidden;
    background:     #0a0a0a;
    min-width:      0;
    min-height:     0;
  }

  /* ── Header ── */
  #engine-overlay-header {
    display:         flex;
    align-items:     center;
    justify-content: space-between;
    padding:         0 24px;
    height:          56px;
    border-bottom:   1px solid #1f1f1f;
    flex-shrink:     0;
    gap:             16px;
  }

  #engine-overlay-title {
    display:     flex;
    align-items: center;
    gap:         12px;
    flex-wrap:   wrap;
    min-width:   0;
  }

  #engine-overlay-category {
    background:     rgba(255, 59, 59, 0.1);
    color:          #ff3b3b;
    padding:        4px 10px;
    border-radius:  3px;
    font-family:    'Space Mono', monospace;
    font-size:      9px;
    font-weight:    700;
    text-transform: uppercase;
    letter-spacing: .1em;
    white-space:    nowrap;
    border:         1px solid rgba(255, 59, 59, 0.18);
  }

  #engine-overlay-severity {
    font-family:    'Space Mono', monospace;
    font-size:      9px;
    font-weight:    700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color:          #666;
  }

  /* Warning variants */
  .engine-warning #engine-overlay-category {
    background: rgba(232, 255, 71, 0.08);
    color:      #e8ff47;
    border-color: rgba(232, 255, 71, 0.15);
  }

  /* ── Scroll area ── */
  #engine-overlay-scroll {
    flex:       1;
    overflow-y: auto;
    padding:    28px 28px 32px;
    min-height: 0;
    min-width:  0;
  }

  /* ── Sections ── */
  .engine-section {
    margin-bottom: 28px;
  }

  .engine-section:last-child {
    margin-bottom: 0;
  }

  .engine-section-label {
    font-family:    'Space Mono', monospace;
    font-size:      8px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color:          #555;
    margin-bottom:  12px;
    display:        flex;
    align-items:    center;
    gap:            10px;
  }

  .engine-section-label::before {
    content:    '';
    display:    block;
    width:      14px;
    height:     1px;
    background: #2a2a2a;
    flex-shrink: 0;
  }

  /* ── What / Why ── */
  .engine-what {
    font-size:   22px;
    font-weight: 700;
    color:       #f0ede8;
    line-height: 1.35;
    letter-spacing: -.01em;
  }

  .engine-why {
    font-size:   13.5px;
    line-height: 1.75;
    color:       #888;
  }

  /* ── Tree ── */
  .engine-tree {
    font-family: 'Space Mono', monospace;
    font-size:   12px;
    line-height: 1.7;
    color:       #999;
    padding:     14px 18px;
    background:  #0f0f0f;
    border:      1px solid #1a1a1a;
    border-radius: 4px;
  }

  .engine-tree-item {
    display:    flex;
    align-items: center;
    gap:         8px;
    white-space: pre;
    padding:     1px 0;
  }

  .engine-tree-item.active {
    color:       #e8ff47;
    font-weight: 700;
  }

  .engine-tree-item.sibling { opacity: .4; }

  .engine-tree-item .marker {
    color:       #222;
    user-select: none;
    width:       12px;
  }

  /* ── Code block ── */
  .engine-code-block {
    background:    #000;
    border-radius: 4px;
    overflow-x:    auto;
    margin-top:    12px;
    font-family:   'Space Mono', monospace;
    border:        1px solid #1a1a1a;
    scrollbar-width: thin;
    scrollbar-color: #222 transparent;
    display:       flex;
    flex-direction: column;
  }

  .engine-code-header {
    background:    #0f0f0f;
    padding:       8px 18px;
    border-bottom: 1px solid #1a1a1a;
    font-family:   'Space Mono', monospace;
    font-size:     9px;
    letter-spacing: .08em;
    color:         #555;
    display:       flex;
    justify-content: space-between;
    text-transform: uppercase;
  }

  .engine-code-header .file-path {
    color: #777;
    text-transform: none;
    letter-spacing: .02em;
  }

  .engine-code-line {
    display:     flex;
    font-size:   12px;
    line-height: 2;
    padding:     0 18px;
    gap:         20px;
    color:       #555;
    min-width:   max-content;
  }

  .engine-code-line.error-line {
    background: rgba(255, 59, 59, 0.07);
    color:      #ccc;
  }

  .engine-warning .engine-code-line.error-line {
    background: rgba(232, 255, 71, 0.05);
  }

  .engine-code-line .line-num {
    min-width:   32px;
    text-align:  right;
    color:       #3a3a3a;
    user-select: none;
    font-size:   11px;
  }

  .engine-code-line.error-line .line-num { color: #ff3b3b; }
  .engine-warning .engine-code-line.error-line .line-num { color: #e8ff47; }

  .engine-code-line .line-code {
    flex:       1;
    white-space: pre;
  }

  .engine-error-marker {
    font-family:  'Space Mono', monospace;
    font-size:    10px;
    font-weight:  700;
    font-style:   normal;
    letter-spacing: .06em;
    color:        #ff3b3b;
    margin-left:  14px;
    opacity:      .85;
  }

  .engine-warning .engine-error-marker { color: #e8ff47; }

  /* ── Fix block ── */
  .engine-fix-block {
    background:  #0f0f0f;
    border:      1px solid rgba(232, 255, 71, 0.1);
    border-radius: 4px;
    padding:     16px 20px;
    font-family: 'Space Mono', monospace;
    font-size:   12px;
    line-height: 1.8;
    color:       #aaa;
    white-space: pre-wrap;
  }

  /* ── Stack trace ── */
  .engine-stack-block {
    font-family: 'Space Mono', monospace;
    font-size:   11px;
    line-height: 1.9;
    color:       #444;
    white-space: pre-wrap;
    padding:     16px 18px;
    background:  #0f0f0f;
    border:      1px solid #1a1a1a;
    border-radius: 4px;
  }

  .engine-stack-block .stack-highlight { color: #888; }

  /* ── Footer ── */
  #engine-overlay-footer {
    display:         flex;
    justify-content: flex-end;
    gap:             10px;
    padding:         14px 24px;
    border-top:      1px solid #1a1a1a;
    background:      #0f0f0f;
    flex-shrink:     0;
  }

  .engine-btn {
    padding:        8px 18px;
    border-radius:  3px;
    border:         1px solid transparent;
    font-family:    'Space Mono', monospace;
    font-size:      10px;
    font-weight:    700;
    letter-spacing: .08em;
    text-transform: uppercase;
    cursor:         pointer;
    transition:     all .15s;
  }

  .engine-btn-dismiss {
    background: none;
    border-color: #2a2a2a;
    color:      #666;
  }

  .engine-btn-dismiss:hover {
    background:   #141414;
    border-color: #3a3a3a;
    color:        #aaa;
  }

  .engine-btn-copy {
    background:   #ff3b3b;
    border-color: #ff3b3b;
    color:        #0a0a0a;
  }

  .engine-btn-copy:hover {
    opacity:   .88;
    transform: translateY(-1px);
  }

  .engine-warning .engine-btn-copy {
    background:  #e8ff47;
    border-color: #e8ff47;
    color:       #0a0a0a;
  }

  /* ── Scrollbars ── */
  #engine-overlay-scroll::-webkit-scrollbar,
  .engine-code-block::-webkit-scrollbar,
  #engine-overlay-sidebar::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  #engine-overlay-scroll::-webkit-scrollbar-thumb,
  .engine-code-block::-webkit-scrollbar-thumb,
  #engine-overlay-sidebar::-webkit-scrollbar-thumb {
    background:    #1f1f1f;
    border-radius: 2px;
  }

  #engine-overlay-scroll::-webkit-scrollbar-thumb:hover,
  .engine-code-block::-webkit-scrollbar-thumb:hover {
    background: #2a2a2a;
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    #engine-overlay-box {
      flex-direction: column;
    }

    #engine-overlay-sidebar {
      width:         100%;
      min-width:     auto;
      max-height:    28vh;
      border-right:  none;
      border-bottom: 1px solid #1f1f1f;
    }

    #engine-overlay-scroll { padding: 20px 18px; }
    #engine-overlay-header { padding: 0 18px; }
    #engine-overlay-footer { padding: 12px 18px; }
  }
`;

// -----------------------------------------------
// types
// -----------------------------------------------

export type Severity = "error" | "warning";

export interface OverlayError {
  category: string;
  severity: Severity;
  what: string;
  why?: string;
  file?: string;
  line?: number;
  col?: number;
  source?: string; // full source of the file
  fix?: string;
  stack?: string;
}

// -----------------------------------------------
// overlay state
// -----------------------------------------------

let overlayEl: HTMLElement | null = null;
let styleEl: HTMLStyleElement | null = null;
const errors: OverlayError[] = [];
let current = 0;

// -----------------------------------------------
// inject styles once
// -----------------------------------------------

function injectStyles() {
  if (styleEl) return;
  styleEl = document.createElement("style");
  styleEl.id = "engine-overlay-styles";
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
}

// -----------------------------------------------
// parse stack trace to get file and line
// -----------------------------------------------

export function parseStack(stack: string): {
  file: string | null;
  line: number | null;
  col: number | null;
} {
  const lines = stack.split("\n");

  for (const line of lines) {
    // skip engine internal files and node_modules
    if (
      line.includes("error-overlay") ||
      line.includes("errors.ts") ||
      line.includes("node_modules") ||
      // Skip anything in the engine's src directory to find user code
      line.includes("/src/dom.ts") ||
      line.includes("/src/component.ts") ||
      line.includes("/src/reactive.ts") ||
      line.includes("/src/navigate.ts") ||
      line.includes("/src/state.ts") ||
      line.includes("/src/derived.ts") ||
      line.includes("/src/effect.ts") ||
      line.includes("/src/scheduler.ts")
    ) {
      continue;
    }

    // match: at file:///path/to/file.ts:10:5
    // or:    at ComponentName (path/to/file.ts:10:5)
    // or:    at path/to/file.ts:10:5
    const match = line.match(/(?:at\s+)?(?:\S+\s+\()?([^()]+):(\d+):(\d+)\)?/);
    if (match) {
      const raw = match[1];
      let file = raw
        .trim()
        .replace(/^at\s+/, "")
        .replace(/^file:\/\//, "")
        .replace(window.location.origin, "")
        .replace(/^\//, "");

      // Strip query parameters that Vite adds for cache busting
      if (file.includes("?")) {
        file = file.split("?")[0];
      }

      // If it's a full path but we're in a dev environment,
      // let's try to keep it relative to the root for fetching
      if (file.includes(window.location.host)) {
        file = file.split(window.location.host).pop() || file;
      }

      // Remove Vite /@fs/ prefix which breaks physical file locating
      // BUT keep it if it's part of an absolute path we want to fetch safely
      if (file.startsWith("@fs/")) {
        file = "/" + file;
      }

      file = file.replace(/^\/\//, "/");

      return {
        file: file || null,
        line: parseInt(match[2]),
        col: parseInt(match[3]),
      };
    }
  }

  return { file: null, line: null, col: null };
}

// -----------------------------------------------
// fetch directory siblings
// -----------------------------------------------

async function fetchSiblings(
  file: string,
): Promise<{ name: string; isDir: boolean }[]> {
  try {
    const res = await fetch(`/__engine-ls?path=${encodeURIComponent(file)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.files || [];
  } catch {
    return [];
  }
}

// -----------------------------------------------
// fetch source file for code preview
// -----------------------------------------------

async function fetchSource(file: string): Promise<string | null> {
  try {
    // If it's already an absolute path or has /@fs/, use it as is
    // Otherwise, ensure it starts with a /
    const url = file.startsWith("/") ? file : `/${file}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

// -----------------------------------------------
// render code block with highlighted error line
// -----------------------------------------------

function renderCodeBlock(
  source: string,
  errorLine: number,
  context: number = 4,
): string {
  const lines = source.split("\n");
  const start = Math.max(0, errorLine - context - 1);
  const end = Math.min(lines.length, errorLine + context);

  return lines
    .slice(start, end)
    .map((code, i) => {
      const num = start + i + 1;
      const isError = num === errorLine;
      const marker = isError
        ? '<span class="engine-error-marker">← target</span>'
        : "";
      const cls = isError ? "engine-code-line error-line" : "engine-code-line";
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return (
        `<div class="${cls}">` +
        `<span class="line-num">${num}</span>` +
        `<span class="line-code">${escaped}${marker}</span>` +
        `</div>`
      );
    })
    .join("");
}

// -----------------------------------------------
// render the overlay HTML
// -----------------------------------------------

async function renderOverlay(err: OverlayError) {
  injectStyles();

  let file = err.file;
  let line = err.line;
  let source = err.source;

  // parse from stack if not provided
  if (err.stack && (!file || !line)) {
    const parsed = parseStack(err.stack);
    file = file ?? parsed.file ?? undefined;
    line = line ?? parsed.line ?? undefined;
  }

  // fetch source if we have a file but no source
  if (file && !source) {
    source = (await fetchSource(file)) ?? undefined;
  }

  const isWarning = err.severity === "warning";
  const severityClass = isWarning ? "engine-warning" : "";
  const severityLabel = isWarning ? "Warning" : "Error";

  // Clean file path (strip query params and relativize)
  let cleanFile = file ? file.split("?")[0] : "";

  const projectRoot = "Reactivity-Engine";
  if (cleanFile.includes(projectRoot)) {
    cleanFile =
      cleanFile.split(projectRoot).pop()?.replace(/^\//, "") || cleanFile;
  }

  const fileParts = cleanFile.split("/");
  const fileName = fileParts.pop() || "";
  const dirParts = fileParts.filter(Boolean);

  // Generate Tree View HTML
  let treeItemsHtml = `<div class="engine-tree-item">.</div>`;

  dirParts.forEach((part, i) => {
    const indent = "&nbsp;".repeat((i + 1) * 2);
    treeItemsHtml += `<div class="engine-tree-item">${indent}${part}/</div>`;
  });

  const levelIndent = "&nbsp;".repeat((dirParts.length + 1) * 2);
  const siblings = file && file !== "unknown" ? await fetchSiblings(file) : [];

  if (siblings.length > 0) {
    const targetIdx = siblings.findIndex((s) => s.name === fileName);
    if (targetIdx !== -1) {
      const start = Math.max(0, targetIdx - 3);
      const end = Math.min(siblings.length, targetIdx + 4);

      siblings.slice(start, end).forEach((s) => {
        const isActive = s.name === fileName;
        const cls = isActive
          ? "engine-tree-item active"
          : "engine-tree-item sibling";
        const label = s.name + (isActive && line ? `:${line}` : "");
        treeItemsHtml += `<div class="${cls}">${levelIndent}${label}</div>`;
      });
    } else {
      treeItemsHtml += `<div class="engine-tree-item active">${levelIndent}${fileName}${line ? `:${line}` : ""}</div>`;
    }
  } else if (fileName) {
    treeItemsHtml += `<div class="engine-tree-item active">${levelIndent}${fileName}${line ? `:${line}` : ""}</div>`;
  }

  const codeBlock =
    source && line
      ? `<div class="engine-section">
         <div class="engine-section-label">Source</div>
         <div class="engine-code-block">
           <div class="engine-code-header">
             <span class="file-path">${cleanFile}:${line}</span>
             <span>preview</span>
           </div>
           ${renderCodeBlock(source, line)}
         </div>
       </div>`
      : "";

  const fileBlock = cleanFile
    ? `<div class="engine-section">
         <div class="engine-section-label">Location</div>
         <div class="engine-tree">${treeItemsHtml}</div>
       </div>`
    : "";

  const whyBlock = err.why
    ? `<div class="engine-section">
         <div class="engine-section-label">Why</div>
         <div class="engine-why">${err.why}</div>
       </div>`
    : "";

  const fixBlock = err.fix
    ? `<div class="engine-section">
         <div class="engine-section-label">How to fix</div>
         <div class="engine-fix-block">${err.fix}</div>
       </div>`
    : "";

  const stackLines = err.stack
    ?.split("\n")
    .filter((l) => !l.includes("error-overlay") && !l.includes("errors.ts"))
    .map((l) => {
      const isUserCode = !l.includes("node_modules");
      return isUserCode ? `<span class="stack-highlight">${l}</span>` : l;
    })
    .join("\n");

  const stackBlock = stackLines
    ? `<div class="engine-section">
         <div class="engine-section-label">Stack Trace</div>
         <div class="engine-stack-block">${stackLines}</div>
       </div>`
    : "";

  const sidebarHtml =
    errors.length > 1
      ? `
    <div id="engine-overlay-sidebar">
      <div class="engine-sidebar-header">Diagnostics &nbsp;(${errors.length})</div>
      ${errors
        .map((e, idx) => {
          const isActive = idx === current ? "active" : "";
          const warnClass = e.severity === "warning" ? "engine-warning" : "";
          const title = e.what || "Unknown Error";
          return `
          <div class="engine-sidebar-item ${isActive} ${warnClass}" data-index="${idx}">
            <div class="engine-sidebar-meta">
              <span>${e.category}</span>
              <span>${e.severity}</span>
            </div>
            <div class="engine-sidebar-title">${title}</div>
          </div>
        `;
        })
        .join("")}
    </div>
  `
      : "";

  const html = `
    <div id="engine-overlay" class="${severityClass}">
      <div id="engine-overlay-box">

        ${sidebarHtml}

        <div id="engine-overlay-main">
          <div id="engine-overlay-header">
            <div id="engine-overlay-title">
              <span id="engine-overlay-category">${err.category}</span>
              <span id="engine-overlay-severity">${severityLabel}</span>
            </div>
          </div>

          <div id="engine-overlay-scroll">
            <div class="engine-section">
              <div class="engine-what">${err.what}</div>
            </div>

            ${whyBlock}
            ${fileBlock}
            ${codeBlock}
            ${fixBlock}
            ${stackBlock}
          </div>

          <div id="engine-overlay-footer">
            <button class="engine-btn engine-btn-dismiss" id="engine-btn-dismiss">Dismiss</button>
            <button class="engine-btn engine-btn-copy"    id="engine-btn-copy">Copy stack</button>
          </div>
        </div>

      </div>
    </div>
  `;

  return html;
}

// -----------------------------------------------
// Add nav styles
// -----------------------------------------------

const navStyles = `
  #engine-overlay-nav {
    display:     flex;
    align-items: center;
    gap:         8px;
  }

  .nav-btn {
    background:      transparent;
    border:          1px solid #2a2a2a;
    color:           #555;
    cursor:          pointer;
    padding:         5px 12px;
    border-radius:   3px;
    font-family:     'Space Mono', monospace;
    font-size:       10px;
    font-weight:     700;
    letter-spacing:  .06em;
    text-transform:  uppercase;
    transition:      all .15s;
    display:         flex;
    align-items:     center;
    justify-content: center;
  }

  .nav-btn:hover:not(:disabled) {
    background:   #141414;
    border-color: #2a2a2a;
    color:        #888;
  }

  .nav-btn:active:not(:disabled) { transform: scale(.96); }

  .nav-btn:disabled {
    opacity: .2;
    cursor:  not-allowed;
  }

  #engine-nav-count {
    font-family:          'Space Mono', monospace;
    font-size:            10px;
    font-weight:          700;
    color:                #333;
    min-width:            48px;
    text-align:           center;
    letter-spacing:       .06em;
    font-variant-numeric: tabular-nums;
  }
`;

// -----------------------------------------------
// show the overlay
// -----------------------------------------------

export async function showOverlay(err: OverlayError) {
  if (!isDev) return;

  if (!document.getElementById("engine-nav-styles")) {
    const s = document.createElement("style");
    s.id = "engine-nav-styles";
    s.textContent = navStyles;
    document.head.appendChild(s);
  }

  errors.push(err);
  current = errors.length - 1;

  await updateUI();
}

let isUpdating = false;
let pendingUpdate = false;

async function updateUI() {
  if (isUpdating) {
    pendingUpdate = true;
    return;
  }
  isUpdating = true;

  const err = errors[current];
  if (!err) {
    isUpdating = false;
    return;
  }

  const html = await renderOverlay(err);

  // Remove existing overlay *after* await to avoid race conditions
  // where multiple instances get appended to the DOM.
  if (overlayEl) {
    overlayEl.remove();
  }

  overlayEl = document.createElement("div");
  overlayEl.innerHTML = html;
  document.body.appendChild(overlayEl);

  // sidebar item clicks
  const sidebarItems = overlayEl.querySelectorAll(".engine-sidebar-item");
  sidebarItems.forEach((el) => {
    el.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const idx = parseInt(target.dataset.index || "0", 10);
      if (idx !== current) {
        current = idx;
        updateUI();
      }
    });
  });

  // dismiss button
  overlayEl
    .querySelector("#engine-btn-dismiss")
    ?.addEventListener("click", dismissOverlay);

  // copy button
  overlayEl.querySelector("#engine-btn-copy")?.addEventListener("click", () => {
    const text = [
      `[Engine] ${err.category} ${err.severity}`,
      `What: ${err.what}`,
      err.why  ? `Why:  ${err.why}`   : "",
      err.file ? `File: ${err.file}`  : "",
      err.line ? `Line: ${err.line}`  : "",
      err.fix  ? `Fix:\n${err.fix}`   : "",
      err.stack ? `\nStack:\n${err.stack}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    navigator.clipboard.writeText(text).then(() => {
      const btn = overlayEl?.querySelector(
        "#engine-btn-copy",
      ) as HTMLButtonElement;
      if (btn) {
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = "Copy stack";
        }, 2000);
      }
    });
  });

  // click outside to dismiss
  overlayEl.querySelector("#engine-overlay")?.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "engine-overlay") dismissOverlay();
  });

  // escape to dismiss
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      dismissOverlay();
      window.removeEventListener("keydown", onKey);
    }
  };
  window.addEventListener("keydown", onKey);

  isUpdating = false;
  if (pendingUpdate) {
    pendingUpdate = false;
    updateUI();
  }
}

export function dismissOverlay() {
  overlayEl?.remove();
  overlayEl = null;
  // Clear errors when dismissed
  errors.length = 0;
  current = 0;
}