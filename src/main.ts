import { app, BrowserWindow } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

const inDevelopment = process.env.NODE_ENV === "development";

function createWindow() {
  console.log("🚀 Creating main window...");
  const preload = path.join(__dirname, "preload.js");

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: false, // Sửa từ true thành false
      nodeIntegrationInSubFrames: false,
      preload: preload,
    },
    frame: true,
    autoHideMenuBar: true,
  });

  console.log("🔧 Registering IPC listeners...");
  try {
    registerListeners(mainWindow);
    console.log("✅ IPC listeners registered successfully");
  } catch (error) {
    console.error("❌ Error registering IPC listeners:", error);
  }

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }
}

async function installExtensions() {
  try {
    const result = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`Extensions installed successfully: ${result.name}`);
  } catch {
    console.error("Failed to install extensions");
  }
}

app
  .whenReady()
  .then(() => {
    console.log("🚀 App is ready, creating window...");
    createWindow();
  })
  .then(() => {
    console.log("🔧 Installing extensions...");
    return installExtensions();
  })
  .catch((error) => {
    console.error("❌ Error during app initialization:", error);
  });

//osX only
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
//osX only ends
