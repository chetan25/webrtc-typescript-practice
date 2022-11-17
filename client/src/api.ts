import axios from "axios";
import { logout } from "shared/utils/auth";
import { UserDetails, User } from "store/store-type";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (
  data: UserDetails
): Promise<{
  data?: { user: User };
  error?: boolean;
  exception?: Error & { response: { data: string } };
}> => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (
  data: any
): Promise<{
  data?: { user: any };
  error?: boolean;
  exception?: Error & { response: { data: string } };
}> => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes
export const sendFriendInvitation = async (data: {}): Promise<{
  data?: { user: any };
  error?: boolean;
  exception?: Error & { response: { data: string } };
}> => {
  console.log(data);
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data: {}): Promise<{
  data?: { user: any };
  error?: boolean;
  exception?: Error & { response: { data: string } };
}> => {
  try {
    return await apiClient.post("/friend-invitation/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data: {}): Promise<{
  data?: { user: any };
  error?: boolean;
  exception?: Error & { response: { data: string } };
}> => {
  try {
    return await apiClient.post("/friend-invitation/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (
  exception: Error & { response: { status: number } }
) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
