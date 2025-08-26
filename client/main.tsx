import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found");
}

// Prevent multiple root creation during development hot reloads
let root: ReturnType<typeof createRoot>;

if (!root) {
  root = createRoot(container);
}

root.render(<App />);
