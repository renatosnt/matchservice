import instance from "./Instance";
import { Service } from "../../application/ServiceModalProps";

export const loginUser = async ({ token, userEmail, password, type }: any) =>
  instance
    .post("/login", {
      email: userEmail,
      password,
      token,
      type,
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

interface SearchParams {
  title?: string;
  description?: string;
  category?: string;
  profileId?: string;
}

// Function to get all services
export const getAllServices = async () => {
  try {
    const response = await instance.get("/service/");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch services",
    );
  }
};

// Function to search for services
export const searchServices = async (params: SearchParams) => {
  try {
    const response = await instance.get("/service/search", {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Search failed");
  }
};

// Function to get all unique categories
export const getCategories = async () => {
  try {
    const response = await instance.get("/service/categories");
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categories",
    );
  }
};

// Function to get a service by ID and increment the view count
export const getServiceById = async (serviceId: string) => {
  try {
    const response = await instance.get(`/service/${serviceId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch service");
  }
};

// Function to get the schedule of a service by its ID
export const getServiceSchedule = async (serviceId: string) => {
  try {
    const response = await instance.get(`/service/${serviceId}/schedule`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch schedule",
    );
  }
};

// Function to delete a service by ID
export const deleteService = async (serviceId: string) => {
  try {
    const response = await instance.delete(`/service/${serviceId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete service",
    );
  }
};

// Function to create a new service
export const createService = async (Service: Service) => {
  try {
    const response = await instance.post("/service/create", Service);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create service",
    );
  }
};

// Function to update a service by ID
export const updateService = async (
  serviceId: string,
  Service: Partial<Service>,
) => {
  try {
    const response = await instance.patch(`/service/${serviceId}`, Service);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update service",
    );
  }
};

// Function to get profile by ID
export const getProfileById = async (profileId: string) => {
  try {
    const response = await instance.get(`/profile/${profileId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

// Function to get average rating of a profile by ID
export const getProfileRating = async (profileId: string) => {
  try {
    const response = await instance.get(`/profile/${profileId}/rating`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch rating");
  }
};

// Function to get the entire schedule of a profile by ID
export const getProfileSchedule = async (profileId: string) => {
  try {
    const response = await instance.get(`/profile/${profileId}/schedule`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch schedule",
    );
  }
};

// Function to update a profile by ID
export const updateProfileById = async (
  profileId: string,
  profileData: { telephoneNumber?: string; specialty?: string },
) => {
  try {
    const response = await instance.patch(`/profile/${profileId}`, profileData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile",
    );
  }
};

// Function to create a new profile
export const createProfile = async (profileData: {
  telephoneNumber: string;
  specialty: string;
}) => {
  try {
    const response = await instance.post(`/profile/create`, profileData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create profile",
    );
  }
};
