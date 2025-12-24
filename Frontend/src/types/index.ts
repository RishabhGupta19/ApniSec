/**
 * ============================================
 * ApniSec TypeScript Type Definitions
 * ============================================
 * 
 * This file contains all the TypeScript types used in the application.
 * Types help catch errors before running the code and provide autocomplete.
 * 
 * WHAT IS A TYPE?
 * A type defines the shape of data. For example, a User type says
 * "a user object must have id, name, email, etc."
 * 
 * WHAT IS AN INTERFACE?
 * An interface is a way to define a type for objects. It lists
 * all the properties an object should have.
 */

// ============================================
// USER TYPES
// ============================================

/**
 * User - Represents a logged-in user
 * 
 * Example:
 * {
 *   id: "abc123",
 *   name: "John Doe",
 *   email: "john@example.com",
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-15T10:30:00Z"
 * }
 */
export interface User {
  id: string;           // Unique identifier for the user
  name: string;         // User's display name
  email: string;        // User's email address
  createdAt: string;    // When the account was created (ISO date string)
  updatedAt: string;    // When the account was last updated (ISO date string)
}

/**
 * AuthTokens - JWT tokens for authentication
 * 
 * accessToken: Short-lived token (15-30 min) used for API requests
 * refreshToken: Long-lived token (7-30 days) used to get new access tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;  // The ? means this is optional
}

/**
 * AuthResponse - What we get back after login/register
 */
export interface AuthResponse {
  user: User;           // The logged-in user's data
  tokens: AuthTokens;   // JWT tokens for future requests
}

// ============================================
// AUTH REQUEST TYPES
// These define what data we send to the server
// ============================================

/**
 * LoginRequest - Data needed to log in
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * RegisterRequest - Data needed to create an account
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;  // Must match password
}

/**
 * ForgotPasswordRequest - Data for password reset request
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * ResetPasswordRequest - Data to set a new password
 */
export interface ResetPasswordRequest {
  token: string;            // Token from the reset email
  password: string;
  confirmPassword: string;
}

/**
 * UpdateProfileRequest - Data to update user profile
 * The ? means these fields are optional - you can update just name or just email
 */
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

/**
 * ChangePasswordRequest - Data to change password
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ============================================
// ISSUE TYPES
// Issues are security problems that need to be tracked
// ============================================

/**
 * IssueType - Categories of security issues
 * This is a "union type" - the value can only be one of these strings
 */
export type IssueType = "cloud_security" | "reteam_assessment" | "vapt";

/**
 * IssuePriority - How urgent the issue is
 */
export type IssuePriority = "low" | "medium" | "high" | "critical";

/**
 * IssueStatus - Current state of the issue
 */
export type IssueStatus = "open" | "in_progress" | "resolved" | "closed";

/**
 * Issue - A security issue/ticket
 * 
 * Example:
 * {
 *   id: "issue123",
 *   userId: "user456",
 *   type: "vapt",
 *   title: "SQL Injection Found",
 *   description: "Login form is vulnerable...",
 *   priority: "critical",
 *   status: "open",
 *   createdAt: "2024-01-15T10:30:00Z",
 *   updatedAt: "2024-01-15T10:30:00Z"
 * }
 */
export interface Issue {
  id: string;               // Unique ID for this issue
  userId: string;           // ID of the user who created it
  type: IssueType;          // Category of the issue
  title: string;            // Short title/summary
  description: string;      // Detailed description
  priority: IssuePriority;  // How urgent it is
  status: IssueStatus;      // Current status
  createdAt: string;        // When it was created
  updatedAt: string;        // When it was last updated
}

/**
 * CreateIssueRequest - Data needed to create a new issue
 */
export interface CreateIssueRequest {
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status?: IssueStatus;     // Optional, defaults to "open"
}

/**
 * UpdateIssueRequest - Data to update an existing issue
 * All fields are optional - you only send what you want to change
 */
export interface UpdateIssueRequest {
  type?: IssueType;
  title?: string;
  description?: string;
  priority?: IssuePriority;
  status?: IssueStatus;
}

/**
 * IssueFilters - Options for filtering the issues list
 */
export interface IssueFilters {
  type?: IssueType;
  status?: IssueStatus;
  priority?: IssuePriority;
  search?: string;          // Search text for title/description
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * ApiResponse - Standard format for all API responses
 * 
 * The <T = unknown> is a "generic" - it means "T can be any type"
 * This lets us reuse this interface for different data types
 * 
 * Examples:
 * - ApiResponse<User> = response with user data
 * - ApiResponse<Issue[]> = response with array of issues
 */
export interface ApiResponse<T = unknown> {
  success: boolean;     // true if request succeeded, false if failed
  data?: T;             // The actual data (only if success is true)
  message?: string;     // Optional success message
  error?: string;       // Error message (only if success is false)
}

/**
 * PaginatedResponse - For responses with pagination (page 1, 2, 3, etc.)
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;       // Current page number
    limit: number;      // Items per page
    total: number;      // Total number of items
    totalPages: number; // Total number of pages
  };
}

// ============================================
// DISPLAY LABELS
// These convert code values to human-readable text
// ============================================

/**
 * Record<KeyType, ValueType> is a TypeScript utility type
 * It creates an object where all keys are of KeyType
 * and all values are of ValueType
 */
export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
  cloud_security: "Cloud Security",
  reteam_assessment: "Reteam Assessment",
  vapt: "VAPT",
};

export const ISSUE_PRIORITY_LABELS: Record<IssuePriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const ISSUE_STATUS_LABELS: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

// ============================================
// STYLING CLASSES
// Tailwind CSS classes for different priority/status colors
// ============================================

export const PRIORITY_COLORS: Record<IssuePriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-secondary/20 text-secondary",
  high: "bg-warning/20 text-warning",
  critical: "bg-destructive/20 text-destructive",
};

export const STATUS_COLORS: Record<IssueStatus, string> = {
  open: "bg-secondary/20 text-secondary",
  in_progress: "bg-warning/20 text-warning",
  resolved: "bg-success/20 text-success",
  closed: "bg-muted text-muted-foreground",
};
