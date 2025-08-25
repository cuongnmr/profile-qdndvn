import { User } from "@/types/user";

export async function createUser(user: Omit<User, "id">) {
  return await window.userAPI.create(user);
}

// lấy tất cả user
export async function readUser() {
  return await window.userAPI.read();
}

// lấy thông tin user theo id
export async function readUserById(id: string) {
  return await window.userAPI.readOne(id);
}

// cập nhật thông tin user
export async function updateUser(id: string, user: Partial<User>) {
  return await window.userAPI.update(id, user);
}
