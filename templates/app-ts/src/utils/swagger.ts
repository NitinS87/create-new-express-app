import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API with Express and Swagger",
      version: "0.0.1",
      description:
        "This is a simple REST API application made with Express and documented with Swagger",
    },
    swagger: `http://localhost:${process.env.PORT || 8000}/api/docs/json`,
    externalDocs: {
      url: `http://localhost:${process.env.PORT || 8000}/api/docs/json`,
      description: "OpenAPI - JSON",
    },
    tags: [
      {
        name: "Health Check",
        description: "Endpoints to check the health of the Feedback-MS",
      },
      {
        name: "Echo",
        description: "Endpoints to echo back the request",
      },
      {
        name: "Default",
        description: "Default endpoint",
      },
    ],
  },
  apis: ["**/*.ts", "build/**/*.js"],
};
const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
