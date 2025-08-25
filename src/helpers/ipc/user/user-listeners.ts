import { getUsers, initDb, readOneUser, saveUser, updateUser } from "@/db/db";
import { ipcMain } from "electron";
import {
  USER_CREATE_CHANNEL,
  USER_READ_CHANNEL,
  USER_READ_ONE_CHANNEL,
  USER_UPDATE_CHANNEL,
} from "./user-channels";

export function addUserEventListeners() {
  initDb();
  ipcMain.handle(USER_READ_CHANNEL, () => {
    try {
      return getUsers();
    } catch (error) {
      return { success: false, error };
    }
  });
  ipcMain.handle(USER_CREATE_CHANNEL, (_event, data) => {
    try {
      const user = saveUser(data);
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  });
  ipcMain.handle(USER_READ_ONE_CHANNEL, (_event, id) => {
    try {
      const user = readOneUser(id);
      if (!user) {
        throw new Error("Không tìm thấy người dùng id " + id);
      }
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  });
  ipcMain.handle(USER_UPDATE_CHANNEL, (_event, id, data) => {
    try {
      const user = updateUser(id, data);
      if (!user) {
        throw new Error("Không tìm thấy người dùng id " + id);
      }
      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  });
}
