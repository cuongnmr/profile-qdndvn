import React, { useState, useEffect } from "react";
import { useUserAPI } from "../hooks/use-user-api";
import { User, CreateUserRequest, UpdateUserRequest } from "../types/user";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Search, Plus, Edit, Trash2, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

export const UserManagement: React.FC = () => {
  const {
    loading,
    error,
    clearError,
    initialize,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
  } = useUserAPI();

  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    const init = async () => {
      try {
        await initialize();
        await loadUsers();
      } catch (err) {
        console.error("Failed to initialize:", err);
      }
    };
    init();
  }, [initialize]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const searchResults = await searchUsers(query);
      setUsers(searchResults);
    } catch (err) {
      console.error("Failed to search users:", err);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(formData);
      toast.success("User created successfully!");
      setShowCreateForm(false);
      setFormData({ name: "", email: "", phone: "", address: "", avatar: "" });
      await loadUsers();
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      const updateData: UpdateUserRequest = {
        id: editingUser.id,
        ...formData,
      };
      await updateUser(updateData);
      toast.success("User updated successfully!");
      setShowEditForm(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", phone: "", address: "", avatar: "" });
      await loadUsers();
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully!");
        await loadUsers();
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      avatar: user.avatar || "",
    });
    setShowEditForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "", avatar: "" });
  };

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage your users with ease</p>
        </div>

        <Button
          onClick={() => {
            setShowCreateForm(true);
            resetForm();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Create User Form */}
      {showCreateForm && (
        <div className="bg-background rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Create New User</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter user name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter user email"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={loading || !formData.name || !formData.email}
              >
                {loading ? "Creating..." : "Create User"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Form */}
      {showEditForm && (
        <div className="bg-background rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Edit User</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter user name"
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email *</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter user email"
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditForm(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleUpdateUser}
                disabled={loading || !formData.name || !formData.email}
              >
                {loading ? "Updating..." : "Update User"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="rounded-lg border p-8 text-center">
            <UserIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <p className="text-muted-foreground">No users found</p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                    <UserIcon className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {user.email}
                    </p>
                    {user.phone && (
                      <p className="text-muted-foreground text-sm">
                        {user.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditForm(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
