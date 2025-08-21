import exposeContexts from "./helpers/ipc/context-exposer";

console.log("🔧 Preload script starting...");
try {
  exposeContexts();
  console.log("✅ Contexts exposed successfully");
} catch (error) {
  console.error("❌ Error exposing contexts:", error);
}
