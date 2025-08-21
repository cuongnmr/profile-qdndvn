import { ipcMain } from "electron";
import { userDatabase } from "../../database/user-database";
import { UserResponse } from "../../../types/user";

export function addUserEventListeners() {
  console.log("🔧 Registering user IPC handlers...");

  try {
    // Khởi tạo database khi app khởi động
    ipcMain.handle("user:initialize", async () => {
      console.log("📝 user:initialize handler called");
      try {
        await userDatabase.initialize();
        console.log("✅ Database initialized successfully");
        return { success: true };
      } catch (error) {
        console.error("❌ Error initializing user database:", error);
        return { success: false, error: "Failed to initialize database" };
      }
    });
    console.log("✅ user:initialize handler registered");

    // Lấy tất cả users
    ipcMain.handle("user:getAll", async (): Promise<UserResponse> => {
      try {
        const users = await userDatabase.getAllUsers();
        return { success: true, data: users };
      } catch (error) {
        console.error("Error getting all users:", error);
        return { success: false, error: "Failed to get users" };
      }
    });

    // Lấy user theo ID
    ipcMain.handle(
      "user:getById",
      async (_, id: string): Promise<UserResponse> => {
        try {
          const user = await userDatabase.getUserById(id);
          if (!user) {
            return { success: false, error: "User not found" };
          }
          return { success: true, data: user };
        } catch (error) {
          console.error("Error getting user by ID:", error);
          return { success: false, error: "Failed to get user" };
        }
      },
    );

    // Tạo user mới
    ipcMain.handle(
      "user:create",
      async (_, userData): Promise<UserResponse> => {
        console.log("📝 user:create handler called with data:", userData);
        try {
          // Validate required fields
          if (!userData.hoten) {
            return { success: false, error: "Họ tên là bắt buộc" };
          }

          const newUser = await userDatabase.createUser(userData);
          console.log("✅ User created successfully:", newUser);
          return { success: true, data: newUser };
        } catch (error) {
          console.error("❌ Error creating user:", error);
          return { success: false, error: "Failed to create user" };
        }
      },
    );

    // Cập nhật user
    ipcMain.handle(
      "user:update",
      async (_, { id, ...userData }): Promise<UserResponse> => {
        try {
          const updatedUser = await userDatabase.updateUser(id, userData);
          if (!updatedUser) {
            return { success: false, error: "User not found" };
          }

          return { success: true, data: updatedUser };
        } catch (error) {
          console.error("Error updating user:", error);
          return { success: false, error: "Failed to update user" };
        }
      },
    );

    // Xóa user
    ipcMain.handle(
      "user:delete",
      async (_, id: string): Promise<UserResponse> => {
        try {
          const deleted = await userDatabase.deleteUser(id);
          if (!deleted) {
            return { success: false, error: "User not found" };
          }
          return { success: true };
        } catch (error) {
          console.error("Error deleting user:", error);
          return { success: false, error: "Failed to delete user" };
        }
      },
    );

    // Tìm kiếm users
    ipcMain.handle(
      "user:search",
      async (_, query: string): Promise<UserResponse> => {
        try {
          if (!query || query.trim().length === 0) {
            const allUsers = await userDatabase.getAllUsers();
            return { success: true, data: allUsers };
          }

          const users = await userDatabase.searchUsers(query.trim());
          return { success: true, data: users };
        } catch (error) {
          console.error("Error searching users:", error);
          return { success: false, error: "Failed to search users" };
        }
      },
    );
  } catch (error) {
    console.error("Error registering user IPC handlers:", error);
  }
}
