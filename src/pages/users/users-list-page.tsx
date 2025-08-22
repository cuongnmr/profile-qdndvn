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
import { useEffect, useState } from "react";
import { shortColumns } from "./columns-def";

function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    readUser().then((u) => setUsers(u));
  }, []);

  return (
    <div className="relative h-full max-w-full">
      <Table>
        <TableCaption>Danh sách quân nhân</TableCaption>
        <TableHeader>
          <TableRow>
            {shortColumns.map((item) => (
              <TableHead key={item[0]}>{item[1]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              {shortColumns.map((col) => (
                <TableCell key={item.id + col[0]}>{item[col[0]]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersListPage;
