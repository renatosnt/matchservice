import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Match Service",
      version: "1.0.0",
    },
    tags: [
      {
        name: "profile",
        description: "Service provider profile operations.",
      },
      {
        name: "users",
        description: "User operations.",
      },
      {
        name: "schedule",
        description: "Schedule operations.",
      },
      {
        name: "service",
        description: "Service operations.",
      },
      {
        name: "session",
        description: "Operations related to the user identity.",
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["**/*.ts"],
};

export const docs = swaggerJsdoc(options);
