export function getCookieUser() {
  let cookies: any = document.cookie || "";
  if (!cookies) return "";
  cookies = cookies.split(";") as unknown as object;

  let cookieObj: any = {};
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].includes("x_plg_cookie-user_x_token_user_x_t_fg_p_r")) {
      cookieObj.token = cookies[i];
    }
  }
  let userString = cookieObj.token;
  userString = userString.split("=")[1] || JSON.stringify({ none: "user" });
  return JSON.parse(userString);
}
