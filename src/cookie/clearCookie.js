export function clearCookie() {
  const d = new Date();
  d.setTime(d.getTime() + -20 * 24 * 60 * 60 * 100);
  let expires = "expires=" + d.toUTCString();
  // Clearing the cookie token
  document.cookie =
    "x_plg_cookie-token_x_token_secret_x_t" +
    "=" +
    "" +
    ";" +
    expires +
    ";path=/";

  // Clearing the cookied user
  document.cookie =
    "x_plg_cookie-user_x_token_user_x_t_fg_p_r" +
    "=" +
    "" +
    ";" +
    expires +
    ";path=/";
    
}
