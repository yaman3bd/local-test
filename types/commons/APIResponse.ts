import { AnyObject, PaginationLink } from "@/types";

export enum ErrorCodes {
  ADDON_USAGE_EXCEEDED = "ADDON_USAGE_EXCEEDED",
  EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED"
}

export type APIActionResponse<T> = {
  data: {
    data: T;
    message?: {
      body: string;
      title?: string;
    };
  };
  error?: {
    status: number;
    message: string;
    code?: ErrorCodes;
    errors: AnyObject;
  };
};

export type APIResponse<T> = {
  data: Array<T>;
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: Array<PaginationLink>;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
};

export type APISingleResourceResponse<T> = {
  data: T;
};
