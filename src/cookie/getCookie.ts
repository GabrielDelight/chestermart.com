export function getCookie() {
  let token = localStorage.getItem("token") as unknown as string;
  return token;
}
export function getAdminCookie() {
  let token = localStorage.getItem("admin-token") as unknown as string;
  return token;
}
