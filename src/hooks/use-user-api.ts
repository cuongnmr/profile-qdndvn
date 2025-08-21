import { useState, useCallback } from "react";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "../types/user";

export const useUserAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await window.userAPI.initialize();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to initialize";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllUsers = useCallback(async (): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const response: UserResponse = await window.userAPI.getAll();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data as User[];
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get users";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (id: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const response: UserResponse = await window.userAPI.getById(id);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data as User;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(
    async (userData: CreateUserRequest): Promise<User> => {
      setLoading(true);
      setError(null);
      try {
        const response: UserResponse = await window.userAPI.create(userData);
        console.log("🚀 ~ useUserAPI ~ response:", response)
        if (!response.success) {
          throw new Error(response.error);
        }
        return response.data as User;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create user";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateUser = useCallback(
    async (userData: UpdateUserRequest): Promise<User> => {
      setLoading(true);
      setError(null);
      try {
        const response: UserResponse = await window.userAPI.update(userData);
        if (!response.success) {
          throw new Error(response.error);
        }
        return response.data as User;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update user";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteUser = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response: UserResponse = await window.userAPI.delete(id);
      if (!response.success) {
        throw new Error(response.error);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchUsers = useCallback(async (query: string): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const response: UserResponse = await window.userAPI.search(query);
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data as User[];
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to search users";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    initialize,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
  };
};
