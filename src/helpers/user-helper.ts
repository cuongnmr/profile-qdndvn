import { User } from "@/types/user";

export async function createUser(user: User) {
  return await window.userAPI.create(user);
}

export async function readUser() {
  return await window.userAPI.read();
}
