import {
  USER_CREATE_CHANNEL,
  USER_READ_CHANNEL,
  USER_READ_ONE_CHANNEL,
  USER_UPDATE_CHANNEL,
} from "./user-channels";

export function exposeUserContext() {
  const { contextBridge, ipcRenderer } = window.require("electron");
  contextBridge.exposeInMainWorld("userAPI", {
    create: (user: any) => ipcRenderer.invoke(USER_CREATE_CHANNEL, user),
    read: () => ipcRenderer.invoke(USER_READ_CHANNEL),
    readOne: (userId: string) =>
      ipcRenderer.invoke(USER_READ_ONE_CHANNEL, userId),
    update: (id: string, data: any) =>
      ipcRenderer.invoke(USER_UPDATE_CHANNEL, id, data),
  });
}
