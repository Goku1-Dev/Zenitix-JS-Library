import { createStore } from "../../src/index";

export const globalStore = createStore({
  count: 0,
  user: null as { name: string; role: string } | null,
  notifications: 0
});
