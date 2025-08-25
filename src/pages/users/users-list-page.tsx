import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { readUser, updateBulkUser } from "@/helpers/user-helper";
import { User } from "@/types/user";
import { getValue } from "@/utils/mapping";
import { removeDiacritics } from "@/utils/text";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { fullColumns } from "./columns-def";

const mapping: Record<string, string> = {
  bienche: "Biên chế",
  capbac: "Cấp bậc",
  chucvu: "Chức vụ",
  trinhdo: "Trình độ",
};

function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredText, setFilteredText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [stageData, setStageData] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  async function assignData() {
    const u = await readUser();
    setUsers(u);
  }

  useEffect(() => {
    assignData();
  }, []);

  const filtered = useMemo(() => {
    return users.filter((item) =>
      removeDiacritics(item.hoten).includes(removeDiacritics(filteredText)),
    );
  }, [users, filteredText]);
  const navigate = useNavigate();

  function handleSelect(id: string) {
    setSelectedUsers((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      return [...prev, id];
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setStageData({
      ...stageData,
      [name]: value,
    });
  }

  async function handleSubmit() {
    const data: any[] = selectedUsers.map((item) => {
      return {
        id: item,
        ...stageData,
      };
    });
    await updateBulkUser(data);
    await assignData();
    setSelectedUsers([]);
    setStageData({});
    setOpen(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={filteredText}
          onChange={(e) => setFilteredText(e.target.value)}
          placeholder="Tìm kiếm"
        />
        {selectedUsers.length > 0 && (
          <div className="shrink-0">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Sửa</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sửa hàng loạt</DialogTitle>
                  <DialogDescription>
                    Đã chọn {selectedUsers.length} mục
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  {Object.entries(mapping).map(([key, value]) => (
                    <div key={key} className="grid w-full items-center gap-3">
                      <Label>{value}</Label>
                      <Input type="text" name={key} onChange={handleChange} />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Đóng</Button>
                  </DialogClose>
                  <Button type="button" onClick={handleSubmit}>
                    Lưu
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>STT</TableHead>
            {fullColumns.map((item) => (
              <TableHead key={item[0]}>{item[1]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((item, idx) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  onClick={() => handleSelect(item.id)}
                  checked={selectedUsers.includes(item.id)}
                />
              </TableCell>
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
                    {getValue(col[0], value)}
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
