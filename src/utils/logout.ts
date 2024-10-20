export default function logout(code?: number) {
  if (code && code !== 401) {
    return;
  }
  localStorage.clear();
  window.location.reload();
}
