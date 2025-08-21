import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const TestUserAPI: React.FC = () => {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    hoten: "",
    ngaysinh: "",
    nhapngu: "",
    capbac: "",
    chucvu: "",
    donvi: "",
    vanhoa: "",
    vaodoan: "",
    dantoc: "",
    tongiao: "",
    khokhan: false,
    doandang: "",
    thanhphan: "",
    thuongtru: "",
    truocnhapngu: "",
    nuocngoai: "",
    laodongchinh: false,
    nguoithandinuocngoai: "",
    bomebichatdocdacam: "",
    conguoitrongquandoi: "",
    phatgiamcaitao: "",
  });

  // Test initialize
  const testInitialize = async () => {
    try {
      setMessage("Testing initialize...");
      const result = await window.userAPI.initialize();
      setMessage(`Initialize result: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Initialize error: ${error}`);
    }
  };

  // Test get all users
  const testGetAll = async () => {
    try {
      setMessage("Testing get all users...");
      const result = await window.userAPI.getAll();
      setMessage(`Get all result: ${JSON.stringify(result)}`);
      if (result.success && result.data) {
        setUsers(Array.isArray(result.data) ? result.data : []);
      }
    } catch (error) {
      setMessage(`Get all error: ${error}`);
    }
  };

  // Test create user
  const testCreate = async () => {
    try {
      setMessage("Testing create user...");
      const result = await window.userAPI.create(formData);
      setMessage(`Create result: ${JSON.stringify(result)}`);
      if (result.success) {
        setFormData({ name: "", email: "", phone: "" });
        await testGetAll(); // Refresh list
      }
    } catch (error) {
      setMessage(`Create error: ${error}`);
    }
  };

  // Test search
  const testSearch = async () => {
    try {
      setMessage("Testing search...");
      const result = await window.userAPI.search("test");
      setMessage(`Search result: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Search error: ${error}`);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Test User API</h1>

      <div className="space-y-4">
        <Button onClick={testInitialize}>Test Initialize</Button>
        <Button onClick={testGetAll}>Test Get All Users</Button>
        <Button onClick={testSearch}>Test Search</Button>
      </div>

      <div className="rounded border p-4">
        <h2 className="mb-2 font-semibold">Create User</h2>
        <div className="space-y-2">
          <div>
            <Label htmlFor="hoten">Họ tên</Label>
            <Input
              id="hoten"
              value={formData.hoten}
              onChange={(e) =>
                setFormData({ ...formData, hoten: e.target.value })
              }
              placeholder="Nhập họ tên"
            />
          </div>
          <div>
            <Label htmlFor="donvi">Đơn vị</Label>
            <Input
              id="donvi"
              value={formData.donvi}
              onChange={(e) =>
                setFormData({ ...formData, donvi: e.target.value })
              }
              placeholder="Nhập đơn vị"
            />
          </div>
          <div>
            <Label htmlFor="chucvu">Chức vụ</Label>
            <Input
              id="chucvu"
              value={formData.chucvu}
              onChange={(e) =>
                setFormData({ ...formData, chucvu: e.target.value })
              }
              placeholder="Nhập chức vụ"
            />
          </div>
          <Button onClick={testCreate} disabled={!formData.hoten}>
            Test Create User
          </Button>
        </div>
      </div>

      <div className="rounded border p-4">
        <h2 className="mb-2 font-semibold">Message</h2>
        <pre className="overflow-auto rounded bg-gray-100 p-2 text-sm">
          {message || "No message yet"}
        </pre>
      </div>

      <div className="rounded border p-4">
        <h2 className="mb-2 font-semibold">Users ({users.length})</h2>
        <div className="space-y-2">
          {users.map((user, index) => (
            <div key={index} className="rounded border p-2">
              <p>
                <strong>Họ tên:</strong> {user.hoten}
              </p>
              <p>
                <strong>Đơn vị:</strong> {user.donvi}
              </p>
              <p>
                <strong>Chức vụ:</strong> {user.chucvu}
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
