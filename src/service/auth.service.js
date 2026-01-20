import { authApi } from "../api/authApi";

/**
 * @param {{ email: string, password: string }}
 */
export async function loginService(payload) {
  const res = await authApi.login(payload);

  return res.data;
}
