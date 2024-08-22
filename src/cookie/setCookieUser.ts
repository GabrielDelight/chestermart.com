export function setCookieUser(cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 100);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    "x_plg_cookie-user_x_token_user_x_t_fg_p_r" +
    "=" +
    cvalue +
    ";" +
    expires +
    ";path=/";
}
