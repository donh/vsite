export default function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => resolve(null));
  });
}
