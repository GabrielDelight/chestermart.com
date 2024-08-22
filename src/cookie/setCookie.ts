export function setCookie(cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 100);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    "x_plg_cookie-token_x_token_secret_x_t" +
    "=" +
    cvalue +
    ";" +
    expires +
    ";path=/";
}
