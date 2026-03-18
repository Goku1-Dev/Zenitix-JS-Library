import { Suspense } from "../../src/index";
import { userId, setUserId, userData } from "./AsyncDemo.state";

function UserProfile() {
  const user = userData;
  if (!user) return (
    <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '20px 0' }}>
      Initializing user profile...
    </div>
  );

  return (
    <div class="user-profile-card">
      <h3>{user.name}</h3>
      <div class="username">@{user.username}</div>
      <div class="email-row">
        <span class="email-label">email</span>
        <span class="email-value">{user.email}</span>
      </div>
    </div>
  );
}

export default function AsyncDemo() {
  return (
    <div class="demo-module">

      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">The Async Revolution</h2>

        <p class="doc-body">
          Handling asynchronous data is one of the most repetitive tasks in frontend development.
          Developers often find themselves managing multiple boolean flags like <code>isLoading</code>,{" "}
          <code>isError</code>, and <code>data</code> for every single API call. Our engine eliminates
          this boilerplate by introducing a deep integration between signals and{" "}
          <strong>Suspense Boundaries</strong>.
        </p>
        <p class="doc-body">
          Instead of manually toggling loading states, you simply "wrap" your potentially async
          components in a <code>&lt;Suspense&gt;</code> component. The engine automatically detects
          when an underlying signal is waiting for data and switches to your provided fallback UI
          until the resolution is complete.
        </p>

        <div class="doc-subheading">Understanding trackAsync</div>
        <p class="doc-body">
          The <code>trackAsync</code> utility is the bridge between standard Promises and our reactive
          system. When you call it within a state function, it tells the engine: "Wait for this specific
          operation before considering the UI ready." This allows you to coordinate complex data fetching
          across multiple components with zero effort.
        </p>

        <div class="tip-card">
          <strong>Race Condition Protection:</strong> One of the silent killers in web apps is the
          race condition — where an old API response overwrites a newer one. Our engine's async
          tracking is designed to be cancellation-aware, ensuring that only the most recent request
          affects the final UI state.
        </div>

        <div class="doc-subheading">Flicker-Free Transitions</div>
        <p class="doc-body">
          By managing async flows at the engine level, we can intelligently batch updates and prevent
          the common "loading flicker" that occurs when multiple components update slightly out of sync.
          Your app feels solid, professional, and reliable.
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
                  <span class="monitor-tag-text">Telemetry Monitor</span>
              </div>
              <div class="monitor-title">Async Data Stream</div>
            </div>
          </div>
          <div class="monitor-grid">
            <div class="monitor-cell">
              <div class="monitor-label">Tracked ID</div>
              <div class="monitor-value large">#{userId}</div>
            </div>
            <div class="monitor-cell">
              <div class="monitor-label">Network Resolution</div>
              <div class="monitor-value accent">{() => userData ? 'RESOLVED' : 'PENDING'}</div>
            </div>
          </div>
        </div>

        {/* User buttons */}
        <div class="user-fetch-grid" style={{ marginBottom: '20px' }}>
          {[1, 2, 3, 4].map(id => (
            <button
              class={() => userId === id ? 'demo-btn primary' : 'demo-btn'}
              onClick={() => setUserId(id)}
            >
              User #{id}
            </button>
          ))}
        </div>

        {/* Suspense */}
        <div style={{ minHeight: '120px', marginBottom: '36px' }}>
          <Suspense fallback={
            <div class="suspense-fallback">
              <div class="suspense-pending">PENDING...</div>
              <div class="suspense-sub">Fetching remote API data via trackAsync</div>
            </div>
          }>
            <UserProfile />
          </Suspense>
        </div>

        {/* Code blocks */}
        <div class="demo-section">
          <div class="demo-section-label">Logic (State File)</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>AsyncDemo.state.ts</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Signals can hold pending or resolved values</span>{"\n"}
              <span class="highlight-keyword">export let</span> userData = <span class="highlight-keyword">null</span>;{"\n\n"}
              <span class="highlight-comment">// trackAsync interacts with Suspense boundaries</span>{"\n"}
              <span class="highlight-keyword">export async function</span> <span class="highlight-func">fetchUser</span>(id) {"{"}{"\n"}
              {"  "}userData = <span class="highlight-keyword">await</span> <span class="highlight-func">trackAsync</span>(API_REQUEST);{"\n"}
              {"}"}
            </div>
          </div>
        </div>

        <div class="demo-section">
          <div class="demo-section-label">UI Rendering</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>AsyncDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Handle loading states declaratively</span>{"\n"}
              &lt;<span class="highlight-func">Suspense</span> <span class="highlight-func">fallback</span>={"{"}&lt;Loading /&gt;{"}"}&gt;{"\n"}
              {"  "}<span class="highlight-comment">// Waits for userData to resolve</span>{"\n"}
              {"  "}&lt;<span class="highlight-func">UserProfile</span> /&gt;{"\n"}
              &lt;/<span class="highlight-func">Suspense</span>&gt;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}