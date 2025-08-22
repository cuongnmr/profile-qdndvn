import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import path from "path";
import { app } from "electron";
import { User } from "@/types/user";
import { nanoid } from "nanoid";
import fs from "fs";

interface DBData {
  users: User[];
}
let db: LowSync<DBData>;
export function initDb() {
  const appPath = app.getAppPath();
  const dbDir = path.join(appPath, "db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }
  const dbPath = path.join(dbDir, "db.json");
  console.log(`Database path: ${dbPath}`);

  const adapter = new JSONFileSync<DBData>(dbPath);
  db = new LowSync<DBData>(adapter, { users: [] });

  // Đọc dữ liệu từ file và khởi tạo cấu trúc mặc định nếu cần.
  db.read();
  db.data ||= { users: [] };
  db.write();

  console.log("Database is initial successfully.");
}

export function getDB() {
  if (!db) initDb();
  return db;
}

export function saveUser(user: User): User {
  const db = getDB();
  const data = { ...user, id: nanoid() };
  db.data.users.push(data);
  db.write();
  return data;
}

// Hàm để lấy tất cả user từ database (cho các chức năng đọc).
export function getUsers(): User[] {
  const db = getDB();
  db.read(); // Đảm bảo đọc dữ liệu mới nhất.
  return db.data.users;
}

export function updateUserFamily(userId: string, dto: any): User | null {
  const db = getDB();
  const user = db.data.users.find((u) => u.id === userId);
  if (user) {
    // Cập nhật dữ liệu
    console.log(dto, userId);
    Object.assign(user, dto);

    // Ghi lại vào file
    db.write();

    return user;
  } else {
    return null;
  }
}
