import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { readUserById } from "@/helpers/user-helper";
import { formatDate } from "@/utils/date-fns";
import { mapCapBac, mapChucVu, mapDoanDang, mapDonVi } from "@/utils/mapping";
import { useParams, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Download, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { userProps } from "./form-schema";

async function fetchUser(userId: string) {
  try {
    const res = await readUserById(userId);
    console.log(res);
    if (!res.success) {
      throw new Error(res.error);
    }
    return res.user;
  } catch (error) {
    console.error(error);
  }
}

function getValue(key: string, input?: string) {
  if (!input) {
    return "Chưa có thông tin";
  }
  switch (key) {
    case "ngaysinh":
    case "vaodoan":
    case "vaodang":
      return formatDate(Number(input));
    case "capbac":
      return mapCapBac(input);
    case "chucvu":
      return mapChucVu(input);
    case "donvi":
      return mapDonVi(input);
    case "doandang":
      return mapDoanDang(input);
    case "vanhoa":
      return input.concat("/12");

    default:
      return input;
  }
}

const UserDetailsPage = () => {
  const { userId } = useParams({ from: "/user-detail/$userId" });
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const { history } = useRouter();
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then((d) => setUser(d));
    }

    return () => {
      setUser(null);
    };
  }, [userId]);

  const handleEdit = () => {};

  const handleDelete = () => {
    // Mock delete functionality
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      console.log("Delete user:", user?.id);
    }
  };

  const handleExport = () => {
    // Mock export functionality
    console.log("Export user data");
  };

  return (
    <>
      <Card className="mb-3">
        <CardHeader>
          <CardTitle>Chi tiết người dùng</CardTitle>
          <CardDescription>ID: {user?.id}</CardDescription>
          <CardAction>
            <Button variant="ghost" onClick={() => history.go(-1)}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Quay lại</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-2">
          <>
            <Button onClick={handleEdit} className="gap-2">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Chỉnh sửa</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleExport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Xuất</span>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Xóa</span>
            </Button>
          </>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {user &&
            Object.entries(userProps).map(([key, value]) => (
              <div key={key} className="grid w-full items-center gap-3">
                <Label>{value}</Label>
                <Input type="text" readOnly value={getValue(key, user[key])} />
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default UserDetailsPage;
