import { contextBridge, ipcRenderer } from "electron";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "../../../types/user";

// Expose user API to renderer process
export function exposeUserContext() {
  contextBridge.exposeInMainWorld("userAPI", {
    // Khởi tạo database
    initialize: (): Promise<{ success: boolean; error?: string }> =>
      ipcRenderer.invoke("user:initialize"),

    // Lấy tất cả users
    getAll: (): Promise<UserResponse> => ipcRenderer.invoke("user:getAll"),

    // Lấy user theo ID
    getById: (id: string): Promise<UserResponse> =>
      ipcRenderer.invoke("user:getById", id),

    // Tạo user mới
    create: (userData: CreateUserRequest): Promise<UserResponse> =>
      ipcRenderer.invoke("user:create", userData),

    // Cập nhật user
    update: (userData: UpdateUserRequest): Promise<UserResponse> =>
      ipcRenderer.invoke("user:update", userData),

    // Xóa user
    delete: (id: string): Promise<UserResponse> =>
      ipcRenderer.invoke("user:delete", id),

    // Tìm kiếm users
    search: (query: string): Promise<UserResponse> =>
      ipcRenderer.invoke("user:search", query),
  });
}

// Type definitions for TypeScript
declare global {
  interface Window {
    userAPI: {
      initialize: () => Promise<{ success: boolean; error?: string }>;
      getAll: () => Promise<UserResponse>;
      getById: (id: string) => Promise<UserResponse>;
      create: (userData: CreateUserRequest) => Promise<UserResponse>;
      update: (userData: UpdateUserRequest) => Promise<UserResponse>;
      delete: (id: string) => Promise<UserResponse>;
      search: (query: string) => Promise<UserResponse>;
    };
  }
}
