import instance from "./Instance";

export const loginUser = async ({ userEmail, password }: any) =>
  instance
    .post("/login", {
      email: userEmail,
      password,
    })
    .catch((err) => err.response.data);

export const registerUser = async ({
  username,
  realName,
  email,
  password,
  type = "Customer",
}: {
  username: string;
  realName: string;
  email: string;
  password: string;
  type?: string;
}) => {
  try {
    const response = await instance.post("/user/register", {
      username,
      realName,
      email,
      password,
      type,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
