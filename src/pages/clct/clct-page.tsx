import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { readUser } from "@/helpers/user-helper";
import { User } from "@/types/user";
import { mapCapBac, mapChucVu } from "@/utils/mapping";
import { useEffect, useState } from "react";

const bch = ["ct", "cp", "ctv", "ctvp", "bt", "dt", "dp", "ctvd", "ctvpd"];

function countSQ(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (bch.includes(user.chucvu) ? 1 : 0);
  }, 0);
}

function countQNCN(users: User[]): number {
  return users.reduce((count, user) => {
    const isSQ = bch.includes(user.chucvu);
    const isUy = user.capbac.includes("/");
    return count + (!isSQ && isUy ? 1 : 0);
  }, 0);
}

function countDangVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === "dangvien" ? 1 : 0);
  }, 0);
}

function countDoanVien(users: User[]): number {
  return users.reduce((count, user) => {
    return count + (user.doandang === "doanvien" ? 1 : 0);
  }, 0);
}

function CLCTPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    readUser().then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Chất lượng chính trị Đại đội 4</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quân số và biên chế</CardTitle>
          <CardDescription>Đại đội 4</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-3">
            <li>Tổng quân số: {users.length} đồng chí</li>
            <li>Sỹ quan: {countSQ(users)} đồng chí</li>
            <li>QNCN: {countQNCN(users)} đồng chí</li>
            <li>Đảng viên: {countDangVien(users)} đồng chí</li>
            <li>Đoàn viên: {countDoanVien(users)} đồng chí</li>
          </ul>
          <hr />
          <h1 className="font-bold">Ban chỉ huy Đại đội</h1>
          <ol className="space-y-3">
            {users
              .filter((item) => bch.includes(item.chucvu))
              .map((item) => (
                <li key={item.id}>
                  {mapCapBac(item.capbac)} {item.hoten} -{" "}
                  {mapChucVu(item.chucvu)}
                </li>
              ))}
          </ol>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CLCTPage;
