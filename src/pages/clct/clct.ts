import { User } from "@/types/user";
import { removeDiacritics } from "@/utils/text";

export function getUniqueBienche(users: User[]): string[] {
  const set = new Set(
    users.map((u) => u.bienche).filter((b): b is string => b !== undefined), // loại bỏ undefined
  );
  return Array.from(set);
}

export const bch = [
  "ct",
  "cp",
  "ctv",
  "ctvp",
  "bt",
  "dt",
  "dp",
  "ctvd",
  "ctvpd",
];

export function countSQ(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (bch.includes(user.chucvu) ? 1 : 0);
  }, 0);
}

export function countQNCN(users: User[]): number {
  return users.reduce((count, user) => {
    const isSQ = bch.includes(user.chucvu);
    const isUy = user.capbac.includes("/");
    return count + (!isSQ && isUy ? 1 : 0);
  }, 0);
}

export function countDangVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === "dangvien" ? 1 : 0);
  }, 0);
}

export function countDoanVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === "doanvien" ? 1 : 0);
  }, 0);
}

export function counBt(users: User[], b: string): number {
  return users.reduce((count, user) => {
    return count + (user.bienche === b && user.chucvu === "bt" ? 1 : 0);
  }, 0);
}

export function findBt(users: User[], b: string) {
  return users.find((item) => item.bienche === b && item.chucvu === "bt");
}

export function getBCH(users: User[]) {
  return users.filter((item) => bch.includes(item.chucvu));
}

export function sortArrayString(arr: string[]): string[] {
  return arr.sort((a, b) => {
    const aLower = a.toLowerCase();
    const bLower = b.toLowerCase();
    if (aLower < bLower) {
      return -1;
    }
    if (aLower > bLower) {
      return 1;
    }
    return 0;
  });
}

export function countSQCH(users: User[]) {
  const ch = ["ct", "cp", "bt"];
  return users.reduce((count, user) => {
    return count + (ch.includes(user.chucvu) ? 1 : 0);
  }, 0);
}

export function countTrinhDo(users: User[], type: "cd" | "dh" | "tc") {
  let cpm = "Cao đẳng";
  switch (type) {
    case "dh":
      cpm = "Đại học";
      break;
    case "tc":
      cpm = "Trung cấp";
      break;
  }
  cpm = removeDiacritics(cpm);
  return users.reduce((count, user) => {
    return count + (removeDiacritics(user.trinhdo ?? "").includes(cpm) ? 1 : 0);
  }, 0);
}
