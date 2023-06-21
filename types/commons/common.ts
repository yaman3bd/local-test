import { Member } from "@/types";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AnyObject = { [key: string]: any };

export type Authorize = {
  via: "email" | "phone";
  email?: string;
  phone_code?: string;
  phone?: string;
  prefer_otp?: boolean;
  login_only?: boolean;
};

export type AuthorizeResponse = {
  via: "email" | "phone";
  next_action: "otp" | "password";
};

export type Auth = {
  token: string | undefined;
  member: Member;
};
