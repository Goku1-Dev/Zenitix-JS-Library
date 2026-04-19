import { h } from "../../src/index";
import { globalStore } from "./StoreDemo.state";

export default function StoreDemo() {
  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">Global State Management</h2>

        <p class="doc-body">
          Sometimes you don't want to use standard state files and instead want a more dynamic, unified store similar to React's Context+Reducer or SolidJS stores. The <code>createStore</code> function provides exactly this wrapper, offering fine-grained reactivity over an object without requiring explicit signals or exports for every property.
        </p>

        <div class="tip-card">
          <strong>Why it is useful:</strong> It allows you to colocate complex UI states (like user session, layout configurations, notifications) into one globally accessible reactive object, avoiding prop drilling and boilerplate.
        </div>

        <div class="doc-subheading">Creating a Store</div>
        <p class="doc-body">
          You initialize it by passing an initial state object. Primitive properties are wrapped in signals internally.
        </p>

        <div class="demo-section" style={{ marginTop: '24px' }}>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>StoreDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">import</span> {"{"} createStore {"}"} <span class="highlight-keyword">from</span> <span class="highlight-string">"@engine/index"</span>;{"\n\n"}
              <span class="highlight-keyword">export const</span> globalStore = <span class="highlight-func">createStore</span>({"{"}{"\n"}
              {"  "}count: <span class="highlight-number">0</span>,{"\n"}
              {"  "}user: <span class="highlight-keyword">null</span>,{"\n"}
              {"  "}notifications: <span class="highlight-number">0</span>{"\n"}
              {"}"});
            </div>
          </div>
        </div>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>

        {/* Monitor: User Session */}
        <div class="monitor-card">
          <div class="monitor-card-top">
            <div class="monitor-meta">
              <div class="monitor-tag">
                <div class="monitor-pulse" />
                <span class="monitor-tag-text">Session Store</span>
              </div>
              <div class="monitor-title">Global Authentication</div>
            </div>
            <div class="monitor-actions">
              {() => globalStore.user ? (
                 <button class="demo-btn" onClick={() => globalStore.user = null}>Logout</button>
              ) : (
                 <button class="demo-btn primary" onClick={() => globalStore.user = { name: 'Alice', role: 'admin' }}>Login</button>
              )}
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Current User</div>
              <div class="monitor-value">{() => globalStore.user ? globalStore.user.name : "Guest"}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Role Level</div>
              <div class="monitor-value accent">{() => globalStore.user ? globalStore.user.role : "none"}</div>
            </div>
          </div>
        </div>

        {/* Monitor: Metrics */}
        <div class="monitor-card" style={{ marginTop: '1.5rem' }}>
          <div class="monitor-card-top">
            <div class="monitor-meta">
              <div class="monitor-tag">
                <div class="monitor-pulse" />
                <span class="monitor-tag-text">Metrics Store</span>
              </div>
              <div class="monitor-title">Shared Numeric State</div>
            </div>
            <div class="monitor-actions">
              <button class="demo-btn primary" onClick={() => globalStore.count++}>+1 Count</button>
              <button class="demo-btn" onClick={() => globalStore.setState(prev => ({ notifications: prev.notifications + 1 }))}>+1 Alert</button>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Direct Mutation (count)</div>
              <div class="monitor-value large">{() => globalStore.count}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Functional State (notifications)</div>
              <div class="monitor-value large">{() => globalStore.notifications}</div>
            </div>
          </div>
        </div>

        <div class="tip-card">
          <strong>Pro Tip:</strong> Click the buttons above. Notice how only the individual values update directly in the DOM. The store seamlessly marries a centralized object with fine-grained reactivity.
        </div>

      </div>
    </div>
  );
}
