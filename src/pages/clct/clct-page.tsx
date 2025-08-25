import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { readUser } from "@/helpers/user-helper";
import { User } from "@/types/user";
import { mapBienChe, mapCapBac, mapChucVu } from "@/utils/mapping";
import { cn } from "@/utils/tailwind";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  counBt,
  countDangVien,
  countDoanVien,
  countQNCN,
  countSQ,
  countSQCH,
  countTrinhDo,
  findBt,
  getBCH,
  getUniqueBienche,
  sortArrayString,
} from "./clct";

export default function CLCTPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    readUser().then((res) => {
      setUsers(res);
    });
  }, []);
  const b = useMemo(() => sortArrayString(getUniqueBienche(users)), [users]);

  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold">Chất lượng chính trị Đại đội 4</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quân số và biên chế</CardTitle>
          <CardDescription>Đại đội 4</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent className="text-sm">
          <QuanSo className="py-3" users={users} />
          <hr />
          <section className="py-3">
            <h1 className="mb-3 font-bold">Ban chỉ huy Đại đội</h1>
            <ol className="space-y-3">
              {getBCH(users).map((item) => (
                <li key={item.id}>{capBacTenChucVu(item)}</li>
              ))}
            </ol>
          </section>
          <hr />
          <section className="space-y-3 py-3">
            <h1 className="font-bold">Biên chế hiện tại Đại đội 4</h1>
            <p>Ban chỉ huy và {b.length} Trung đội gồm:</p>
            <ol className="space-y-3">
              {b.map((item) => (
                <li key={item}>
                  <div className="mb-3 font-medium">{mapBienChe(item)}</div>
                  <QuanSo
                    className="pl-3"
                    users={users.filter((i) => i.bienche === item)}
                  >
                    <li>
                      Trung đội trưởng: {counBt(users, item)} đồng chí;{" "}
                      {capBacTenChucVu(findBt(users, item))}
                    </li>
                  </QuanSo>
                </li>
              ))}
            </ol>
          </section>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Chất lượng cán bộ, QNCN, HSQ - CS</CardTitle>
          <CardDescription>Chất lượng cán bộ, QNCN, HSQ - CS</CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <ol className="space-y-3">
            <li>
              <div>Sỹ quan: {countSQ(users)} đồng chí</div>
              <ul className="pl-3">
                <li>SQCH: {countSQCH(users)} đồng chí</li>
                <li>Trình độ cao đẳng: {countTrinhDo(users, "cd")} đồng chí</li>
                <li>
                  Cán bộ chính trị:{" "}
                  {users.reduce((acc, curr) => {
                    return acc + (curr.chucvu.includes("ctv") ? 1 : 0);
                  }, 0)}{" "}
                  đồng chí
                </li>
              </ul>
            </li>
            <li>Nhân viên chuyên môn kỹ thuật: {countQNCN(users)}</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}

function capBacTenChucVu(user?: User) {
  if (!user) return "";
  return (
    mapCapBac(user.capbac) + " " + user.hoten + " - " + mapChucVu(user.chucvu)
  );
}

interface Props {
  users: User[];
  className?: string;
}
function QuanSo({ users, className, children }: PropsWithChildren<Props>) {
  return (
    <ul className={cn("space-y-3", className)}>
      <li>Tổng quân số: {users.length} đồng chí</li>
      <li>Sỹ quan: {countSQ(users)} đồng chí</li>
      <li>QNCN: {countQNCN(users)} đồng chí</li>
      <li>Đảng viên: {countDangVien(users)} đồng chí</li>
      <li>Đoàn viên: {countDoanVien(users)} đồng chí</li>
      {children}
    </ul>
  );
}
