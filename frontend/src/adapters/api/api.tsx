import instance from "./Instance";

export const loginUser = async ({ userEmail, password }) =>
  instance
    .post("/login", {
      email: userEmail,
      password,
    })
    .catch((err) => err.response.data);
