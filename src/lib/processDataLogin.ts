import cookie from "cookie";

type LoginData = {
  access_token: string;
  email: string;
  expires_in: number;
  isCreateProfile: boolean;
  refresh_expires_in: number;
  refresh_token: string;
};

export function processDataLogin(data: LoginData) {
  window.document.cookie = cookie.serialize("accessToken", data.access_token, {
    maxAge: data.expires_in,
    path: "/",
  });
  window.document.cookie = cookie.serialize("refreshToken", data.refresh_token, {
    maxAge: data.refresh_expires_in,
    path: "/",
  });
}
