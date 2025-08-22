import { User } from "@/types/user";

export async function createUser(user: Omit<User, "id">) {
  return await window.userAPI.create(user);
}

export async function readUser() {
  return await window.userAPI.read();
}

export async function updateUser(user: Partial<User>) {
  return await window.userAPI.update(user);
}

export async function updateUserFamily(id: string, user: Partial<User>) {
  return await window.userAPI.updateFamily(id, user);
}
