
/**
 * 
 * ApniSec API Service (REAL BACKEND VERSION)
 *
 */

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
  ChangePasswordRequest,
  User,
  Issue,
  CreateIssueRequest,
  UpdateIssueRequest,
  IssueFilters,
  ApiResponse,
} from "@/types";

/* ============================================
   CONFIG
============================================ */

const BASE_URL = "https://apnisec-amhw.onrender.com";

/* ============================================
   HELPERS
============================================ */

function getAuthToken(): string | null {
  return localStorage.getItem("accessToken");
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/** Public headers (NO AUTH) */
function buildPublicHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
  };
}

/** Safe fetch wrapper (handles empty responses) */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...buildHeaders(),
        ...(options.headers as Record<string, string>),
      },
    });

    let data: any = null;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || data?.message || "Request failed",
      };
    }

    return {
      success: true,
      data: data?.data ?? data,
      message: data?.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

/* ============================================
   AUTH API
============================================ */

export const authApi = {
  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    const result = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (result.success) {
      localStorage.setItem(
        "accessToken",
        result.data.tokens.accessToken
      );
    }

    return result;
  },

  login: async (
    data: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    const result = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (result.success) {
      localStorage.setItem(
        "accessToken",
        result.data.tokens.accessToken
      );
    }

    return result;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    localStorage.removeItem("accessToken");
    return { success: true };
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiFetch<User>("/auth/me");
  },

  /** 🔑 Forgot Password (NO AUTH HEADER) */
  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ApiResponse<void>> => {
    return apiFetch<void>("/auth/forgot-password", {
      method: "POST",
      headers: buildPublicHeaders(),
      body: JSON.stringify(data),
    });
  },

  /** 🔑 Reset Password (NO AUTH HEADER) */
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ApiResponse<void>> => {
    return apiFetch<void>("/auth/reset-password", {
      method: "POST",
      headers: buildPublicHeaders(),
      body: JSON.stringify({
        token: data.token,
        password: data.password,
      }),
    });
  },
};

/* ============================================
   USER / PROFILE API
============================================ */

export const userApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiFetch<User>("/users/profile");
  },

  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<ApiResponse<User>> => {
    return apiFetch<User>("/users/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  changePassword: async (
    data: ChangePasswordRequest
  ): Promise<ApiResponse<void>> => {
    return apiFetch<void>("/users/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
};

/* ============================================
   ISSUES API
============================================ */

const normalizeIssue = (issue: any): Issue => ({
  id: issue._id,
  userId: issue.userId,
  type: issue.type,
  title: issue.title,
  description: issue.description,
  priority: issue.priority,
  status: issue.status,
  createdAt: issue.createdAt,
  updatedAt: issue.updatedAt,
});

export const issuesApi = {
  getAll: async (filters?: IssueFilters): Promise<ApiResponse<Issue[]>> => {
    const params = new URLSearchParams();

    if (filters?.type) params.append("type", filters.type);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.search) params.append("search", filters.search);

    const query = params.toString() ? `?${params.toString()}` : "";

    const res = await apiFetch<any[]>(`/issues${query}`);

    if (!res.success || !res.data) {
      return res as ApiResponse<Issue[]>;
    }

    return {
      success: true,
      data: res.data.map(normalizeIssue),
    };
  },

  getById: async (id: string): Promise<ApiResponse<Issue>> => {
    const res = await apiFetch<any>(`/issues/${id}`);

    if (!res.success || !res.data) {
      return res as ApiResponse<Issue>;
    }

    return {
      success: true,
      data: normalizeIssue(res.data),
    };
  },

  create: async (
    data: CreateIssueRequest
  ): Promise<ApiResponse<Issue>> => {
    const res = await apiFetch<any>("/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.success || !res.data) {
      return res as ApiResponse<Issue>;
    }

    return {
      success: true,
      data: normalizeIssue(res.data),
    };
  },

  update: async (
    id: string,
    data: UpdateIssueRequest
  ): Promise<ApiResponse<Issue>> => {
    if (!id) {
      throw new Error("Issue ID is missing");
    }

    const res = await apiFetch<any>(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (!res.success || !res.data) {
      return res as ApiResponse<Issue>;
    }

    return {
      success: true,
      data: normalizeIssue(res.data),
    };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    if (!id) {
      throw new Error("Issue ID is missing");
    }

    return apiFetch<void>(`/issues/${id}`, {
      method: "DELETE",
    });
  },
};
