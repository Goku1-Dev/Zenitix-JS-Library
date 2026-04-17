import { mountComponent, unmountComponent } from "./component";
import { engineError, engineWarn, engineInfo } from "./errors";
import { h } from "./dom";

export interface RouteDef {
  path: string;
  component: (props?: any) => Node;
  children?: RouteDef[];
}

export interface MatchedRoute {
  route: RouteDef;
  params: Record<string, string>;
}

const routes: RouteDef[] = [];
let current = window.location.pathname;
let container: Element | null = null;
const ROOT = "router-root";

let currentParams: Record<string, string> = {};

export function setContainer(el: Element) {
  if (!el) {
    engineError({
      category: "Navigation",
      what: "setContainer() received null or undefined.",
      why: "The element does not exist in the DOM.",
      fix:
        "Make sure the element exists before calling setContainer.\n" +
        '  setContainer(document.getElementById("app")!)',
    });
  }
  container = el;
}

export function registerRoute(path: string, component: (props?: any) => Node) {
  if (!path.startsWith("/") && path !== "*") {
    engineWarn({
      category: "Navigation",
      what: `Route path '${path}' does not start with '/'.`,
      why: "Top-level route paths must be absolute.",
      fix: `Change '${path}' to '/${path}'.`,
    });
  }
  routes.push({ path, component });
  engineInfo("Navigation", `Route registered: ${path}`);
}

export function registerRoutes(newRoutes: RouteDef[]) {
  routes.push(...newRoutes);
  engineInfo("Navigation", `Registered ${newRoutes.length} top-level routes.`);
}

export function navigate(to: string | number) {
  if (typeof to === "number") {
    window.history.go(to);
    return;
  }

  if (routes.length === 0) {
    engineWarn({
      category: "Navigation",
      what: `navigate('${to}') called but no routes are registered.`,
      fix: "Register routes before navigating.",
    });
    return;
  }

  const clean = to.split("?")[0];
  const urlSegments = clean === "/" ? [] : clean.split("/").filter(Boolean);
  const matched = matchRoutes(routes, urlSegments, {});

  if (!matched) {
    engineWarn({
      category: "Navigation",
      what: `No route registered for '${to}'.`,
      fix: `Register the route or ensure wildcard '*' exists.`,
    });
    return;
  }

  if (to === current) return;

  window.history.pushState({}, "", to);
  current = to;
  renderRoute();
}

export function route() {
  return current;
}

export function params(): Record<string, string> {
  return currentParams;
}

export function query(): Record<string, string> {
  const result: Record<string, string> = {};
  new URLSearchParams(window.location.search).forEach(
    (v, k) => (result[k] = v),
  );
  return result;
}

function matchRoutes(
  routeDefs: RouteDef[],
  urlSegments: string[],
  baseParams: Record<string, string>
): MatchedRoute[] | null {
  for (const r of routeDefs) {
    if (r.path === "*") {
      return [{ route: r, params: { ...baseParams } }];
    }

    const cleanPath = r.path.startsWith("/") ? r.path.slice(1) : r.path;
    const rSegments = cleanPath === "" ? [] : cleanPath.split("/").filter(Boolean);
    
    let isMatch = true;
    const newParams = { ...baseParams };

    if (urlSegments.length < rSegments.length) {
      isMatch = false;
    } else {
      for (let i = 0; i < rSegments.length; i++) {
        const rs = rSegments[i];
        const us = urlSegments[i];
        if (rs.startsWith(":")) {
          newParams[rs.slice(1)] = us;
        } else if (rs !== us) {
          isMatch = false;
          break;
        }
      }
    }

    if (isMatch) {
      const remainingSegments = urlSegments.slice(rSegments.length);
      
      if (remainingSegments.length === 0) {
        if (r.children && r.children.length > 0) {
          const indexMatch = matchRoutes(r.children, [], newParams);
          if (indexMatch) {
            return [{ route: r, params: newParams }, ...indexMatch];
          }
        }
        return [{ route: r, params: newParams }];
      } else {
        if (r.children && r.children.length > 0) {
          const childMatch = matchRoutes(r.children, remainingSegments, newParams);
          if (childMatch) {
             return [{ route: r, params: newParams }, ...childMatch];
          }
        }
      }
    }
  }
  
  const wildcard = routeDefs.find(r => r.path === "*");
  if (wildcard) {
    return [{ route: wildcard, params: { ...baseParams } }];
  }

  return null;
}

export function renderRoute() {
  if (!container) {
    engineError({
      category: "Navigation",
      what: "renderRoute() called but no container is set.",
      fix: "Call setContainer() before renderRoute().",
    });
  }

  const clean = current.split("?")[0];
  const urlSegments = clean === "/" ? [] : clean.split("/").filter(Boolean);
  
  const matched = matchRoutes(routes, urlSegments, {});

  if (!matched) {
    engineWarn({
      category: "Navigation",
      what: `No route matched '${current}' and no 404 wildcard is registered.`,
      fix: `Register a wildcard route: registerRoute('*', NotFound)`,
    });
    return;
  }

  currentParams = matched.reduce((acc, m) => ({ ...acc, ...m.params }), {});

  unmountComponent(ROOT);

  mountComponent(() => {
    let vNode: any = null;
    for (let i = matched.length - 1; i >= 0; i--) {
       const fn = matched[i].route.component;
       if (vNode) {
         vNode = h(fn, null, vNode);
       } else {
         vNode = h(fn, null);
       }
    }
    return vNode;
  }, container, ROOT);
}

window.addEventListener("popstate", () => {
  current = window.location.pathname;
  renderRoute();
});
