# Zenitix JS Library

A lightweight, from-scratch Zenitix JS Library system for the web. Write components in JSX-like syntax, manage state through plain TypeScript files, and get fine-grained Zenitix JS Library, async handling, routing, and devtools out of the box.

> **Status:** Early stage — core features are stable and actively expanding.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
  - [Signals](#signals)
  - [State Files](#state-files)
  - [Effects](#effects)
  - [Derived Values](#derived-values)
  - [Components](#components)
- [Advanced Features](#advanced-features)
  - [Async & Suspense](#async--suspense)
  - [Layout System](#layout-system)
  - [Router](#router)
  - [Portals](#portals)
  - [Slots](#slots)
- [Developer Experience](#developer-experience)
  - [Error Overlay](#error-overlay)
  - [Theme System](#theme-system)
  - [DevTools Panel](#devtools-panel)
- [Compiler](#compiler)
- [Project Structure](#project-structure)

## Overview

Zenitix JS Library Engine is a **zero-dependency** Zenitix JS Library layer that brings a reactive programming model to the DOM without a virtual DOM or a heavy framework. Key ideas:

- **Signals** are the atomic unit of state — no VDOM diffing, just direct DOM updates.
- **State files** are plain `.state.ts` files; the compiler transforms `export let` into reactive signals transparently.
- **Compiler-First**: Uses a custom Vite plugin powered by `oxc` and Babel for high-performance transformations.
- **Unidirectional Data Flow**: Strict runtime protection against direct state mutation from components.
- **Nested Routing**: Intuitive array-based route matching handling deep dynamic layouts effortlessly via `props.children`.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (includes HMR + DevTools + Error Overlay)
npm run dev
```

The entry point is `example/main.ts`. Open [http://localhost:5173](http://localhost:5173) to explore the interactive dashboard.

## Core Concepts

### Signals

Signals are the primitive reactive value. Reading `.value` inside a reactive context (effect, derived, component render) automatically subscribes to future updates.

```ts
import { Signal, createSignal } from "@engine/index";

// Low-level Signal class
const count = new Signal(0);
count.value = 1; // triggers any subscribers

// Functional API — returns a [getter, setter] pair
const [getCount, setCount] = createSignal(0);
getCount(); // read
setCount(10); // write + notify
```

### State Files

The recommended pattern. Create a `.state.ts` file with plain `export let` variables and exported functions:

```ts
// counter.state.ts
export let count = 0;

export function increment() {
  count++;
}
```

The **compiler** rewrites assignments to `count` into signal notifications. Components import and use state directly:

```tsx
import { count, increment } from "./counter.state";

export default function Counter() {
  return (
    <div>
      <p>{() => count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

**State Guard:** Any mutation of state variables from _outside_ the state file is blocked at runtime, ensuring your business logic stays in your state files.

### Global State Management

Sometimes you don't want to use standard state files and instead want a more dynamic, unified store similar to React's Context+Reducer or SolidJS stores. The `createStore` function provides exactly this wrapper, offering fine-grained reactivity over an object without requiring explicit signals or exports for every property.

**Why it is useful:** It allows you to colocate complex UI states (like user session, layout configurations, notifications) into one globally accessible reactive object, avoiding prop drilling and boilerplate.

**How to use it:**

```ts
import { createStore } from "@engine/index";

export const globalStore = createStore({
  count: 0,
  user: null as { name: string; role: string } | null,
});
```

Components can then consume it directly. You can update state using immediate mutation or the functional `.setState(...)` helper:

```tsx
import { globalStore } from "./store";

export function Counter() {
  return (
    <div>
      <p>Count: {() => globalStore.count}</p>
      {/* Update via direct mutation */}
      <button onClick={() => globalStore.count++}>+1</button>
      
      {/* Update via functional helper */}
      <button onClick={() => globalStore.setState(prev => ({ count: prev.count + 1 }))}>
        +1 (Fn)
      </button>
    </div>
  );
}
```

### Form Handling Management

Building on top of `createStore`, Zenitix provides a native `createForm` utility for robust, fine-grained reactive form states and validation. It handles values, touched tracking, and error messaging seamlessly.

**Why it is useful:** Instead of manually binding `onInput` and building your own error tracking maps, `createForm` provides a structured, reactive wrapper that updates inputs instantly without causing unnecessary re-renders.

**How to use it:**

```tsx
import { createForm } from "@engine/index";

export function RegistrationForm() {
  const form = createForm({
    initialValues: { username: "", email: "" },
    validate: (values) => {
      const errors = {};
      if (!values.username) errors.username = "Required";
      return errors;
    }
  });

  const onSubmit = (values) => {
    console.log("Submitting:", values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input 
        name="username" 
        value={() => form.values.username}
        onInput={form.handleChange}
        onBlur={form.handleBlur}
      />
      {() => form.touched.username && form.errors.username && (
        <span>{form.errors.username}</span>
      )}
      <button type="submit" disabled={() => form.isSubmitting.value}>
        Submit
      </button>
    </form>
  );
}
```

### Effects & Lifecycle

Effects run immediately and re-run whenever a signal they read changes.

```ts
import { effect, onMount, onUnmount } from "@engine/index";

effect(() => {
  document.title = `Count: ${count}`;
});

onMount(() => {
  console.log("Mounted!");
  return () => console.log("Cleanup");
});
```

## Advanced Features

### Async & Suspense

Zenitix features first-class async integration. `trackAsync` integrates any promise into the global pending state, which `Suspense` uses to show fallbacks.

```tsx
<Suspense fallback={<Spinner />}>
  <UserProfile />
</Suspense>
```

### Layout System

A powerful OOP-based layout system that integrates classes with Zenitix JS Library. Define a `Layout` class, and its properties become fully tracked signals.

```ts
export class DashboardLayout extends Layout {
  header = Header;
  sidebar = Sidebar;
  user = null;

  constructor() {
    super();
    effect(() => {
      this.user = currentUser;
    });
  }
}
```

### Router

Detailed client-side routing supporting layout nesting, dynamic parameters, and wildcard endpoints natively.

```ts
import { registerRoutes, navigate, params } from "@engine/navigate";

// 1. Define layouts and nested children
registerRoutes([
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "users", component: UserList },
      { path: "users/:id/posts/:slug", component: UserPostProfile },
      { path: "*", component: NotFound }
    ]
  }
]);

// 2. Dynamic parameters are instantly accessible
function UserPostProfile() {
  const { id, slug } = params();
  return <p>Post: {slug} | User: {id}</p>;
}

// 3. Layout Resolution - automatically renders children
function DashboardLayout(props: any) {
  return (
    <div class="dashboard">
      <Sidebar />
      <main>{props.children}</main>
    </div>
  );
}

// 4. Navigate programmatically
navigate("/dashboard/users/42/posts/hello");
```

## Developer Experience

### Theme System

Zenitix comes with a professional **Dark/Light Mode** system built-in.

- **Persistent**: Theme preference is saved to `localStorage`.
- **Flicker-Free**: A blocking script in the HTML ensures no "white flash" on page load.
- **Softer Light Mode**: A carefully tuned off-white palette for better readability.

### Error Overlay

The "Test Bench" for errors. If you violate state rules or have a circular dependency, a beautiful full-screen overlay appears with:

- **Exact Fixes**: Copy-pasteable code to solve the issue.
- **Visual Diagnostics**: Categorized errors (State, Effect, DOM, etc.).

### DevTools Panel

Toggle with `Ctrl+Shift+E` or `toggleDevPanel()` to see:

- Live signal values across all state files.
- Full mutation history with old and new values.

## Compiler

The `compiler/` directory contains a high-performance Vite plugin (`plugin.ts`):

| Component           | Role                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| **oxc Transform**   | Modern, fast JSX and TypeScript transformation.                           |
| **State Transform** | Rewrites imports to inject reactive proxies.                              |
| **Babel Plugin**    | Handles complex `export let` notification injection in `.state.ts` files. |

## Project Structure

- `src/`: Core Zenitix JS Library, DOM runtime, and internal utilities.
- `compiler/`: Vite plugin and Babel transformation logic.
- `example/`: The feature-rich demo dashboard showcasing all engine capabilities.

## License

ISC
