import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "True Feedback API",
            version: "1.0.0",
            description: "API for True Feedback",
        },
        servers: [
            {
                url: "http://localhost:4000",
                description: "Local Development Server",
            },
        ],
        components: {
            schemas: {
                Meta: {
                    type: "object",
                    properties: {
                        currentPage: { type: "integer", example: 1 },
                        totalPages: { type: "integer", example: 1 },
                        totalItems: { type: "integer", example: 0 },
                        itemsPerPage: { type: "integer", example: 10 },
                        hasNextPage: { type: "boolean", example: false },
                        hasPreviousPage: { type: "boolean", example: false },
                    },
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        statusCode: { type: "integer" },
                        message: { type: "string" },
                        error: {},
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        user_id: { type: "integer" },
                        username: { type: "string" },
                        email: { type: "string" },
                        is_accepting_messages: { type: "boolean", nullable: true },
                        is_verified: { type: "boolean", nullable: true },
                        created_dtm: { type: "string", format: "date-time", nullable: true },
                        updated_dtm: { type: "string", format: "date-time", nullable: true },
                    },
                },
                Message: {
                    type: "object",
                    properties: {
                        message_id: { type: "integer" },
                        content: { type: "string" },
                        to_user_id: { type: "integer" },
                        created_dtm: { type: "string", format: "date-time", nullable: true },
                    },
                },
                Poll: {
                    type: "object",
                    properties: {
                        poll_id: { type: "integer" },
                        poll_name: { type: "string", nullable: true },
                        poll_start_dtm: { type: "string", format: "date-time" },
                        poll_end_dtm: { type: "string", format: "date-time" },
                        poll_title: { type: "string", nullable: true },
                        poll_description: { type: "string", nullable: true },
                        vote_count: { type: "integer", nullable: true },
                        is_result_public: { type: "boolean", nullable: true },
                        created_dtm: { type: "string", format: "date-time", nullable: true },
                        updated_dtm: { type: "string", format: "date-time", nullable: true },
                        candidates: { type: "object", additionalProperties: { type: "integer" } },
                        created_by: { type: "integer" },
                    },
                },
                PollResultCandidate: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        votes: { type: "integer" },
                    },
                },
            },
        },
        tags: [
            { name: "auth", description: "Authentication" },
            { name: "user", description: "User registration and profile" },
            { name: "message", description: "Anonymous messages" },
            { name: "poll", description: "Polls and voting" },
        ],
    },
    apis: ["./src/routes/*.ts"],
});

export default swaggerSpec;