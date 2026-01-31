const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management System API",
      version: "1.0.0",
      description:
        "RESTful API for managing inventory items and user authentication",
      contact: {
        name: "Development Team",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: process.env.SERVER_URL,
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT authorization header using the Bearer scheme",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "60d5ec49c1234567890abcdef",
            },
            username: {
              type: "string",
              example: "john_doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-28T10:30:00Z",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "60d5ec49c1234567890abcdef",
            },
            name: {
              type: "string",
              example: "Laptop",
            },
            quantity: {
              type: "number",
              example: 50,
            },
            price: {
              type: "number",
              example: 999.99,
            },
            description: {
              type: "string",
              example: "High-performance laptop",
            },
            category: {
              type: "string",
              example: "Electronics",
            },
            sku: {
              type: "string",
              example: "SKU-12345",
            },
            createdBy: {
              type: "string",
              example: "60d5ec49c1234567890abcdef",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-28T10:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2024-01-28T10:30:00Z",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Login successful",
            },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            error: {
              type: "string",
              example: "Detailed error information",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
