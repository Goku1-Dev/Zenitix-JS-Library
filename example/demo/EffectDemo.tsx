import { effect, onMount, onUnmount } from "../../src/index";
import { count, logs, increment, reset, addLog } from "./EffectDemo.state";

export default function EffectDemo() {
  onMount(() => {
    effect(() => {});
    addLog("Component mounted");
    return () => console.log("cleanup");
  });

  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">Reactive Side Effects</h2>

        <p class="doc-body">
          While signals and derived state handle the <strong>data</strong> and <strong>view</strong>,
          sometimes you need to interact with the "outside world". This is where <strong>Effects</strong>{" "}
          come in. An effect is a piece of code that runs automatically whenever the reactive values
          it reads are updated.
        </p>
        <p class="doc-body">
          Effects are perfect for tasks like synchronizing with external APIs, manipulating the{" "}
          <code>document.title</code>, logging analytics, or setting up timers. They bridge the gap
          between our reactive system and non-reactive browser APIs.
        </p>

        <div class="doc-subheading">The Effect Lifecycle</div>
        <p class="doc-body">
          When you define an <code>effect(() =&gt; ...)</code>, the engine immediately runs the function
          once to track its dependencies. After that, it schedules a re-run whenever those dependencies
          change. What's unique about our implementation is <strong>Automatic Cleanup</strong> — if your
          component unmounts, the engine intelligently stops the effects to prevent memory leaks.
        </p>

        <div class="tip-card">
          <strong>Batching:</strong> If you update five signals in a single function, the effect only
          runs <strong>once</strong> at the end of the operation. This prevents "state flapping" and
          ensures your side effects are efficient.
        </div>

        <div class="doc-subheading">Reactive Synchronicity</div>
        <p class="doc-body">
          Effects provide a reliable way to ensure that your application's external state always matches
          its internal data. It's the ultimate tool for developers who want to maintain high consistency
          across the entire user experience without writing complex event listeners.
        </p>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>

        {/* Monitor */}
        <div class="monitor-card">
          <div class="monitor-card-top">
            <div class="monitor-meta">
              <div class="monitor-tag">
                <div class="monitor-pulse" />
                <span class="monitor-tag-text">Action Monitor</span>
              </div>
              <div class="monitor-title">Side Effect Synchronization</div>
            </div>
            <div class="monitor-actions">
              <button class="demo-btn primary" onClick={() => increment()}>Increment</button>
              <button class="demo-btn" onClick={() => reset()}>Reset</button>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Target Status</div>
              <div class="monitor-value" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>"Count: {count}"</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Engine Status</div>
              <div class="monitor-value accent">SYNC ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Trace log */}
        <div style={{ marginBottom: '28px' }}>
          <div class="demo-section-label">Execution Trace</div>
          <div class="trace-log">
            {logs.map((log: string) => (
              <div class="trace-log-line">
                <span class="trace-tag">LOG</span>
                <span>{log}</span>
              </div>
            ))}
            {logs.length === 0 && (
              <div class="trace-log-dim">Waiting for updates...</div>
            )}
          </div>
        </div>

        <div class="tip-card">
          <strong>Observe:</strong> Look at the browser tab title or the logs above as you interact
          with the counter.
        </div>

        {/* Code blocks */}
        <div class="demo-section" style={{ marginTop: '36px' }}>
          <div class="demo-section-label">State &amp; Actions</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>EffectDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Standard variables transformed into signals</span>{"\n"}
              <span class="highlight-keyword">export let</span> count = 0;{"\n"}
              <span class="highlight-keyword">export let</span> logs = [];{"\n\n"}
              <span class="highlight-keyword">export function</span> <span class="highlight-func">increment</span>() {"{"}{"\n"}
              {"  "}count++;{"\n"}
              {"}"}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section-label">Side Effect Logic</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>EffectDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">import</span> {"{"} effect {"}"} <span class="highlight-keyword">from</span> <span class="highlight-string">"@engine"</span>;{"\n\n"}
              <span class="highlight-comment">// Auto-runs when dependencies change</span>{"\n"}
              <span class="highlight-func">effect</span>(() =&gt; {"{"}{"\n"}
              {"  "}document.title = <span class="highlight-string">`Count: ${"{"}count{"}"}`</span>;{"\n"}
              {"  "}<span class="highlight-func">addLog</span>(<span class="highlight-string">"Updated title"</span>);{"\n"}
              {"}"});
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}