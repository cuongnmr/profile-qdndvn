import { ipcMain } from "electron";
import { USER_CREATE_CHANNEL } from "./user-channels";
import { initDb, saveUser } from "@/db/db";

export function addUserEventListeners() {
  initDb();
  ipcMain.handle(USER_CREATE_CHANNEL, (_event, data) => {
    try {
      const user = saveUser(data);
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  });
}
