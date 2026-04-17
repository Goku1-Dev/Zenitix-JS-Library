import { h, onMount } from "../../src/index";
import { setContainer, registerRoutes, navigate, params } from "../../src/navigate";

function DashboardLayout(props: any) {
  // Using exact monitor-card classes from DemoStyles.css
  return (
    <div class="monitor-card">
      <div class="monitor-card-top">
        <div class="monitor-meta">
          <div class="monitor-tag">
            <div class="monitor-pulse" />
            <span class="monitor-tag-text">Layout Boundary</span>
          </div>
          <div class="monitor-title">Router Context</div>
        </div>
        <div class="monitor-actions">
          <button class="demo-btn" onClick={() => navigate("/demo")}>Home</button>
          <button class="demo-btn" onClick={() => navigate("/demo/users")}>Users</button>
          <button class="demo-btn primary" onClick={() => navigate("/demo/users/42/posts/hello-zen")}>Deep Link</button>
          <button class="demo-btn" onClick={() => navigate("/demo/settings")}>Settings</button>
        </div>
      </div>
      
      <div style={{ padding: "32px 24px", minHeight: "180px", background: "var(--bg)" }}>
        {props.children}
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <div class="tip-card" style={{ margin: "0" }}>
      <strong>Welcome Home!</strong><br />
      Clicking the buttons above executes an exact path match. Since we use a nested framework, only this internal box remounts while the outer layout stays intact.
    </div>
  );
}

function Users() {
  return (
    <div>
      <h3 class="monitor-title" style={{ marginBottom: "12px" }}>Users Directory</h3>
      <div class="doc-body" style={{ margin: 0 }}>
        The user configuration dashboard. Click the Deep Link to observe how wildcards and strict parameters resolve within nested contexts securely.
      </div>
    </div>
  );
}

function UserPosts() {
  const { id, slug } = params();
  return (
    <div>
       <h3 class="monitor-title" style={{ marginBottom: "12px" }}>Global Extraction Hook</h3>
       <div class="doc-body" style={{ marginBottom: "16px" }}>
          Matching route: <code>users/:id/posts/:slug</code>
       </div>
       <div class="trace-log" style={{ minHeight: "auto" }}>
          <div class="trace-log-line">
            <span class="trace-tag">[param]</span> id   = <span style={{ color: "var(--text)", fontWeight: "bold" }}>{id}</span>
          </div>
          <div class="trace-log-line">
            <span class="trace-tag">[param]</span> slug = <span style={{ color: "var(--text)", fontWeight: "bold" }}>{slug}</span>
          </div>
       </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h3 class="monitor-title" style={{ marginBottom: "12px" }}>Global Settings</h3>
      <div class="doc-body" style={{ margin: 0 }}>Configure the preferences of your secure router boundary layer.</div>
    </div>
  );
}

export default function NestedRouterDemo() {
  onMount(() => {
    const el = document.getElementById("nested-router-mount");
    if (el) {
      setContainer(el);
      
      // Delay to ensure the container is fully appended
      setTimeout(() => {
        registerRoutes([
          {
            path: "/demo",
            component: DashboardLayout,
            children: [
              { path: "", component: Welcome },
              { path: "users", component: Users },
              { path: "users/:id/posts/:slug", component: UserPosts },
              { path: "settings", component: Settings },
            ]
          }
        ]);
        navigate("/demo");
      }, 50);
    }
  });

  return (
    <div class="demo-module">
      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>
        <h2 class="doc-heading">Nested Router</h2>
        
        <p class="doc-body">
          The router subsystem provides recursive matching logic mapping dynamically down to zero dependencies. Rather than enforcing an arbitrary <code>Outlet</code> system, Zenitix structurally evaluates functional evaluation from the inside out — injecting deep node branches safely into <code>props.children</code>.
        </p>
        
        <div class="doc-subheading">Features Audited</div>
        <div class="list-item" style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
             <div class="list-item-dot" /> Unidirectional parent fallback logic
          </div>
        </div>
        <div class="list-item" style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
             <div class="list-item-dot" /> Layered structural layouts
          </div>
        </div>
        <div class="list-item">
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
             <div class="list-item-dot" /> Multi-level global parameter extraction
          </div>
        </div>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>
        
        {/* Router output renders here, DashboardLayout has the monitor-card wrap */}
        <div id="nested-router-mount"></div>

        {/* Code: router */}
        <div class="demo-section" style={{ marginTop: '36px' }}>
          <div class="demo-section-label">Router Configuration</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>RouterDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">import</span> {"{"} registerRoutes {"}"} <span class="highlight-keyword">from</span> <span class="highlight-string">"@engine/navigate"</span>;{"\n\n"}
              <span class="highlight-func">registerRoutes</span>([{"\n"}
              {"  "}{"{"}{"\n"}
              {"    "}path: <span class="highlight-string">"/demo"</span>,{"\n"}
              {"    "}component: DashboardLayout,{"\n"}
              {"    "}children: [{"\n"}
              {"      "}{"{"} path: <span class="highlight-string">""</span>, component: Welcome {"}"},{"\n"}
              {"      "}{"{"} path: <span class="highlight-string">"users/:id/posts/:slug"</span>, component: UserPosts {"}"}{"\n"}
              {"    "}]{"\n"}
              {"  "}{"}"}{"\n"}
              ]);
            </div>
          </div>
        </div>

        {/* Code: component */}
        <div class="demo-section">
          <div class="demo-section-label">Layout Component Logic</div>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>RouterDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-comment">// Parent components automatically receive resolved deep routing logic as children!</span>{"\n"}
              <span class="highlight-keyword">function</span> <span class="highlight-func">DashboardLayout</span>(props) {"{"}{"\n"}
              {"  "}<span class="highlight-keyword">return</span> ({"\n"}
              {"    "}&lt;<span class="highlight-keyword">div</span>&gt;{"\n"}
              {"      "}&lt;<span class="highlight-keyword">Sidebar</span> /&gt;{"\n"}
              {"      "}&lt;<span class="highlight-keyword">main</span>&gt;{"{"}props.children{"}"}&lt;/<span class="highlight-keyword">main</span>&gt;{"\n"}
              {"    "}&lt;/<span class="highlight-keyword">div</span>&gt;{"\n"}
              {"  "});{"\n"}
              {"}"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
