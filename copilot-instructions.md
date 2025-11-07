# GitHub Copilot Instructions for Create New Express App

## Project Overview

This is a CLI tool that generates TypeScript Express applications with best practices, similar to `create-react-app` but for Express.js backends. The tool scaffolds a complete Express application with predefined folder structure, middleware, testing, linting, and environment validation.

## Project Structure

```
create-new-express-app/
├── src/                          # CLI source code
│   ├── index.ts                  # CLI entry point
│   ├── create-express-app.ts     # Main app creation logic
│   ├── install.ts                # Package installation logic
│   ├── git.ts                    # Git initialization
│   └── ...                       # Other utilities
├── templates/
│   ├── app-ts/                   # TypeScript Express template
│   │   ├── src/
│   │   │   ├── app.ts            # Express app configuration
│   │   │   ├── server.ts         # Server entry point
│   │   │   ├── config/           # Configuration (env validation)
│   │   │   ├── controllers/      # Route controllers
│   │   │   ├── routers/          # Express routers
│   │   │   ├── middlewares/      # Custom middleware
│   │   │   ├── schemas/          # Zod validation schemas
│   │   │   ├── utils/            # Utility functions
│   │   │   └── exceptions/       # Custom error classes
│   │   ├── tests/                # Jest test files
│   │   ├── .env.example          # Environment variables template
│   │   └── package.json          # Generated app dependencies
│   └── helpers/                  # Template installation helpers
└── dist/                         # Compiled CLI tool
```

## Technology Stack

### CLI Tool
- **TypeScript**: Strongly typed JavaScript
- **Commander**: Command-line interface framework
- **Prompts**: Interactive CLI prompts
- **fs-extra**: File system operations
- **fast-glob**: File pattern matching
- **picocolors**: Terminal colors

### Generated Express Apps
- **Express 5**: Web framework
- **TypeScript**: Type safety
- **Zod**: Schema validation for requests and environment variables
- **Winston + Morgan**: Logging
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Jest + Supertest**: Testing framework
- **ESLint + Prettier**: Code quality and formatting
- **Husky**: Git hooks for pre-commit checks
- **Swagger**: API documentation
- **dotenv**: Environment variable management

## Key Features

### 1. Environment Validation (NEW)
- Located in `templates/app-ts/src/config/env.config.ts`
- Uses Zod schemas to validate environment variables at startup
- Fail-fast behavior: app exits if config is invalid
- Type-safe configuration access throughout the app
- Clear error messages referencing `.env.example`

### 2. Predefined Folder Structure
- Follows MVC-like architecture
- Separation of concerns (controllers, routers, middleware, schemas)
- Consistent naming conventions

### 3. Request Validation
- Zod schemas for body, params, and query validation
- Validation middleware in `templates/app-ts/src/middlewares/validation.middleware.ts`

### 4. Error Handling
- Custom error classes in `templates/app-ts/src/exceptions/`
- Centralized error handling middleware
- API and database exception types

### 5. API Documentation
- Auto-generated Swagger docs from JSDoc comments
- Available at `/api/docs` endpoint

## Code Patterns and Conventions

### Path Aliases
Use TypeScript path aliases for cleaner imports:
```typescript
import { echoSchema } from "@/schemas";
import logger from "@/utils/logger";
import { envConfig } from "@/config";
```

### Environment Configuration
Always access environment variables through the validated config:
```typescript
// ✅ DO: Use validated config
import { envConfig } from "@/config";
const port = envConfig.PORT; // Type: number

// ❌ DON'T: Direct process.env access
const port = process.env.PORT; // Type: string | undefined
```

### Adding New Environment Variables
1. Update the schema in `templates/app-ts/src/config/env.config.ts`
2. Add to `.env.example` with documentation
3. Use TypeScript inference for type safety

Example:
```typescript
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().optional().default("8000")
    .refine((val) => /^\d+$/.test(val))
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val < 65536),
  
  // Add new variables here
  DATABASE_URL: z.string().url().describe("Database connection string"),
  API_KEY: z.string().min(1).optional().describe("External API key"),
});
```

### Controller Pattern
Controllers should be thin and delegate to service layer:
```typescript
export const getEcho = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Business logic here
  res.status(StatusCodes.OK).json({ id, message: "Echo response" });
});
```

### Router Pattern
Routers define routes and apply validation middleware:
```typescript
router.get(
  "/echo/:id",
  validateRequest({ params: echoIdSchema }),
  echoController.getEcho
);
```

### Error Handling
Use custom error classes for domain-specific errors:
```typescript
throw new ApiError("Resource not found", StatusCodes.NOT_FOUND);
```

## Development Guidelines

### When Adding New Features to Templates

1. **Maintain Backward Compatibility**: Changes should not break existing generated apps
2. **Update Documentation**: Modify `templates/app-ts/setup.README.md` with new features
3. **Test Generated Apps**: Create a test app and verify it builds and runs
4. **Follow Existing Patterns**: Match the coding style and architecture
5. **Add Comments**: Use JSDoc for public APIs and Swagger annotations for routes

### CLI Tool Development

1. **Template Copying**: Use `templates/helpers/copy.ts` for file operations
2. **Interactive Prompts**: Use `prompts` library for user input
3. **Error Messages**: Use `picocolors` for colored terminal output
4. **Git Operations**: Use `templates/helpers/git.ts` for git initialization

### Testing

- CLI tool: Manual testing by generating apps
- Generated apps: Use Jest for unit/integration tests
- Test files go in `templates/app-ts/tests/`
- Use Supertest for API endpoint testing

### Code Style

- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Prefer `async/await` over callbacks
- Use `const` and `let`, never `var`
- Use descriptive variable names
- Add JSDoc comments for exported functions

## Common Tasks

### Adding a New Middleware
1. Create file in `templates/app-ts/src/middlewares/`
2. Export from `templates/app-ts/src/middlewares/index.ts`
3. Register in `templates/app-ts/src/app.ts`

### Adding a New Route
1. Create schema in `templates/app-ts/src/schemas/`
2. Create controller in `templates/app-ts/src/controllers/`
3. Create router in `templates/app-ts/src/routers/`
4. Register router in `templates/app-ts/src/routers/index.ts`
5. Add Swagger documentation comments

### Modifying the CLI
1. Update source files in `src/`
2. Run `npm run build` to compile
3. Test with `node dist/index.js test-app`

## Important Notes

- **Don't commit `package-lock.json`**: It's generated and should be in `.gitignore`
- **Don't commit `node_modules/`**: Always ignored
- **Don't commit `dist/` from generated apps**: Build artifacts only
- **Do commit `dist/` from CLI tool**: Required for npx to work
- **Test generated apps**: Always verify generated apps build and run
- **Environment validation is critical**: All env vars must be validated in the schema

## Dependencies to Avoid

- Avoid adding new dependencies to the CLI tool unless necessary
- Generated apps already include comprehensive dependencies
- Security: Run `npm audit` before adding dependencies
- Size: Keep CLI tool lightweight for fast npx execution

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Zod Documentation](https://zod.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Documentation](https://jestjs.io/)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Swagger/OpenAPI](https://swagger.io/)

## Questions or Issues?

Refer to:
- `README.md` - User documentation
- `CONTRIBUTING.md` - Contribution guidelines
- `templates/app-ts/setup.README.md` - Step-by-step setup guide
- GitHub Issues - Report bugs or request features
