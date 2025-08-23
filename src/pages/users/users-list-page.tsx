import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { readUser } from "@/helpers/user-helper";
import { User } from "@/types/user";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { fullColumns } from "./columns-def";
import { Input } from "@/components/ui/input";
import { removeDiacritics } from "@/utils/text";
import { useNavigate } from "@tanstack/react-router";

function cellValue(key: string, value: string) {
  const doandang: Record<string, string> = {
    doanvien: "Đoàn viên",
    dangvien: "Đảng viên",
  };
  switch (key) {
    case "ngaysinh":
      return format(Number(value), "dd/MM/yyyy");
    case "vaodoan":
      return value ? format(Number(value), "dd/MM/yyyy") : value;
    case "doandang":
      return value ? doandang[value] : value;
    default:
      return value;
  }
}

function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredText, setFilteredText] = useState("");
  useEffect(() => {
    readUser().then((u) => setUsers(u));
  }, []);
  const filtered = useMemo(() => {
    return users.filter((item) =>
      removeDiacritics(item.hoten).includes(removeDiacritics(filteredText)),
    );
  }, [users, filteredText]);
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <Input
        value={filteredText}
        onChange={(e) => setFilteredText(e.target.value)}
        placeholder="Tìm kiếm"
      />
      <Table>
        <TableCaption>Danh sách quân nhân</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            {fullColumns.map((item) => (
              <TableHead key={item[0]}>{item[1]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>{idx + 1}</TableCell>
              {fullColumns.map((col) => {
                // @ts-expect-error type
                const value = item[col[0]];
                return (
                  <TableCell
                    key={item.id + col[0]}
                    onDoubleClick={() =>
                      navigate({ to: "/user-detail/" + item.id })
                    }
                  >
                    {cellValue(col[0], value)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersListPage;

// import { readUser } from "@/helpers/user-helper";
// import { User } from "@/types/user";
// import { useEffect, useMemo, useState } from "react";
// import { getColumns } from "./columns";
// import { DataTable } from "./data-table";

// export default function DemoPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const columns = useMemo(() => getColumns(), []);

//   useEffect(() => {
//     readUser().then((u) => setUsers(u));
//   }, []);

//   return (
//     <>
//       <DataTable columns={columns} data={users} />
//     </>
//   );
// }
