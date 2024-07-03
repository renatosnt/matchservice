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

interface SearchParams {
  title?: string;
  description?: string;
  category?: string;
  profileId?: string;
}

interface ServiceData {
  title: string;
  description: string;
  category: string;
  locationState: string;
  locationCity: string;
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
export const createService = async (serviceData: ServiceData) => {
  try {
    const response = await instance.post("/service/create", serviceData);
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
  serviceData: Partial<ServiceData>,
) => {
  try {
    const response = await instance.patch(`/service/${serviceId}`, serviceData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update service",
    );
  }
};
