import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import path from "path";
import os from "os";
import fs from "fs";
import { User, CreateUserRequest, UpdateUserRequest } from "../../types/user";

interface DatabaseSchema {
  users: User[];
}

class UserDatabase {
  private db: Low<DatabaseSchema>;
  private dbPath: string;

  constructor() {
    // Lưu vào Documents/MyApp
    const documentsPath = path.join(os.homedir(), "Documents", "MyApp");
    this.dbPath = path.join(documentsPath, "users.json");

    // Tạo thư mục nếu chưa có
    if (!fs.existsSync(documentsPath)) {
      fs.mkdirSync(documentsPath, { recursive: true });
    }

    // Khởi tạo lowdb
    const adapter = new JSONFile<DatabaseSchema>(this.dbPath);
    this.db = new Low(adapter, { users: [] });
  }

  async initialize() {
    try {
      await this.db.read();
      if (!this.db.data) {
        this.db.data = { users: [] };
        await this.db.write();
      }
    } catch (error) {
      console.error("Error initializing database:", error);
      // Tạo database mới nếu có lỗi
      this.db.data = { users: [] };
      await this.db.write();
    }
  }

  async getAllUsers(): Promise<User[]> {
    await this.db.read();
    return this.db.data?.users || [];
  }

  async getUserById(id: string): Promise<User | null> {
    await this.db.read();
    const user = this.db.data?.users.find((u) => u.id === id);
    return user || null;
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    await this.db.read();

    const now = new Date().toISOString();
    const newUser: User = {
      id: nanoid(),
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    if (!this.db.data) {
      this.db.data = { users: [] };
    }

    this.db.data.users.push(newUser);
    await this.db.write();

    return newUser;
  }

  async updateUser(
    id: string,
    userData: Partial<UpdateUserRequest>,
  ): Promise<User | null> {
    await this.db.read();

    if (!this.db.data) {
      return null;
    }

    const userIndex = this.db.data.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...this.db.data.users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    this.db.data.users[userIndex] = updatedUser;
    await this.db.write();

    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.db.read();

    if (!this.db.data) {
      return false;
    }

    const userIndex = this.db.data.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.db.data.users.splice(userIndex, 1);
    await this.db.write();

    return true;
  }

  async searchUsers(query: string): Promise<User[]> {
    await this.db.read();

    if (!this.db.data) {
      return [];
    }

    const lowercaseQuery = query.toLowerCase();
    return this.db.data.users.filter(
      (user) =>
        user.hoten.toLowerCase().includes(lowercaseQuery) ||
        user.donvi.toLowerCase().includes(lowercaseQuery) ||
        user.chucvu.toLowerCase().includes(lowercaseQuery),
    );
  }
}

// Export singleton instance
export const userDatabase = new UserDatabase();
