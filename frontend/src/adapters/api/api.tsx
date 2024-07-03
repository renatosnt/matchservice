import bcrypt from "bcryptjs";
import instance from "./Instance";

export const loginUser = async ({ userEmail, password }) =>
  instance
    .post("/", {
      email: userEmail,
      password,
    })
    .catch((err) => err.response.data);

export const registerUser = async ({
  userName,
  userEmail,
  password,
  userType = "Customer", // Valor padrão para o tipo de usuário
}) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return instance
    .post("/register", {
      username: userName,
      realName: userName,
      email: userEmail,
      password: passwordHash,
      type: userType,
    })
    .catch((err) => err.response.data);
};
