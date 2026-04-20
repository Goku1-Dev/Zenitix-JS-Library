import { h } from "../../src/index";
import { createForm } from "../../src/index";

export default function FormDemo() {
  const form = createForm({
    initialValues: {
      username: "",
      email: "",
      age: 18,
      terms: false,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof typeof values, string>> = {};
      if (!values.username) {
        errors.username = "Username is required";
      } else if (values.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      }
      
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Email is invalid";
      }
      
      if (values.age < 18) {
        errors.age = "You must be at least 18 years old";
      }

      if (!values.terms) {
        errors.terms = "You must accept the terms";
      }

      return errors;
    }
  });

  const onSubmit = async (values: any) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form Submitted Successfully:", values);
    alert("Form submitted successfully! Check console for data.");
    form.reset();
  };

  return (
    <div class="demo-module">
      {/* ── Doc pane ── */}
      <div class="demo-doc-pane">
        <div class="demo-section-label">Documentation</div>

        <h2 class="doc-heading">Form Handling System</h2>

        <p class="doc-body">
          The <code>createForm</code> utility leverages Zenitix's <code>createStore</code> to provide a robust, fine-grained reactive form management system. It tracks values, validation errors, and touched states seamlessly without unnecessary re-renders.
        </p>

        <div class="tip-card">
          <strong>Key Benefits:</strong> Native integration with Zenitix reactivity means your form inputs update instantly, and validation error messages appear exactly when expected—usually on blur or when actively typing after an initial error.
        </div>

        <div class="doc-subheading">Creating a Form</div>
        <p class="doc-body">
          You initialize the form with <code>initialValues</code> and a <code>validate</code> hook.
        </p>

        <div class="demo-section" style={{ marginTop: '24px' }}>
          <div class="demo-code-block">
            <div class="demo-code-header"><span>FormDemo.tsx</span></div>
            <div class="demo-code-content">
              <span class="highlight-keyword">const</span> form = <span class="highlight-func">createForm</span>({"{"}{"\n"}
              {"  "}initialValues: {"{"} username: <span class="highlight-string">""</span>, email: <span class="highlight-string">""</span> {"}"},{"\n"}
              {"  "}validate: (values) =&gt; {"{"}{"\n"}
              {"    "}<span class="highlight-keyword">const</span> errors = {"{"}{"}"};{"\n"}
              {"    "}<span class="highlight-keyword">if</span> (!values.username) errors.username = <span class="highlight-string">"Required"</span>;{"\n"}
              {"    "}<span class="highlight-keyword">return</span> errors;{"\n"}
              {"  "}{"}"}{"\n"}
              {"}"});
            </div>
          </div>
        </div>
      </div>

      {/* ── Demo pane ── */}
      <div class="demo-demo-pane">
        <div class="demo-section-label">Live Example</div>

        <div class="monitor-card" style={{ padding: '0' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div class="monitor-meta">
              <div class="monitor-tag">
                <div class="monitor-pulse" style={{ background: 'var(--primary)' }} />
                <span class="monitor-tag-text">Zenitix Form</span>
              </div>
              <div class="monitor-title">Account Registration</div>
            </div>
            
            <form onSubmit={form.handleSubmit(onSubmit)} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              {/* Username Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500 }}>Username</label>
                <input 
                  type="text" 
                  name="username" 
                  value={() => form.values.username}
                  onInput={form.handleChange}
                  onBlur={form.handleBlur}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: () => (form.touched.username && form.errors.username) ? '1px solid #ef4444' : '1px solid var(--border)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  placeholder="cool_user_123"
                />
                {() => form.touched.username && form.errors.username && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{form.errors.username}</span>
                )}
              </div>

              {/* Email Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500 }}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={() => form.values.email}
                  onInput={form.handleChange}
                  onBlur={form.handleBlur}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: () => (form.touched.email && form.errors.email) ? '1px solid #ef4444' : '1px solid var(--border)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  placeholder="hello@example.com"
                />
                {() => form.touched.email && form.errors.email && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{form.errors.email}</span>
                )}
              </div>

              {/* Age Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500 }}>Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={() => form.values.age}
                  onInput={form.handleChange}
                  onBlur={form.handleBlur}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: () => (form.touched.age && form.errors.age) ? '1px solid #ef4444' : '1px solid var(--border)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                {() => form.touched.age && form.errors.age && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{form.errors.age}</span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text)' }}>
                  <input 
                    type="checkbox" 
                    name="terms" 
                    checked={() => form.values.terms}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  I accept the Terms and Conditions
                </label>
                {() => form.touched.terms && form.errors.terms && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{form.errors.terms}</span>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                class="demo-btn primary" 
                disabled={() => form.isSubmitting.value}
                style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
              >
                {() => form.isSubmitting.value ? "Submitting..." : "Create Account"}
              </button>

            </form>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg)', borderRadius: '0 0 12px 12px' }}>
            <div class="monitor-label" style={{ marginBottom: '0.75rem' }}>Live State Feed</div>
            <div style={{ 
              background: '#0d1117', 
              padding: '1rem', 
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#c9d1d9',
              whiteSpace: 'pre-wrap',
              maxHeight: '200px',
              overflowY: 'auto',
              border: '1px solid var(--border)'
            }}>
              {() => JSON.stringify({
                values: form.values,
                errors: form.errors,
                touched: form.touched,
                isValid: form.isValid()
              }, null, 2)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
