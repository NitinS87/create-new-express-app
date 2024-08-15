# Setup a Nodejs Express Application with TypeScript

## Introduction

This is a simple guide to setup a Nodejs Express application with TypeScript. This guide will help you to setup a Nodejs Express application with TypeScript, ESLint, Prettier, and Husky.

## Prerequisites

- Nodejs
- NPM
- Git

## Step 1: Create a project directory

Create a new directory for your project.

```bash
mkdir nodejs-express-typescript
cd nodejs-express-typescript
```

## Step 2: Initialize a new Nodejs project

Run the following command to initialize a new Nodejs project.

```bash
npm init -y
```

## Step 3: Install Dependencies

Install the required dependencies for the project.

```bash
npm i express dotenv cors helmet http-status-codes rimraf zod
npm i -D typescript @types/express @types/dotenv @types/helmet @types/cors
```

Dependencies:

- `express`: Fast, unopinionated, minimalist web framework for Node.js.
- `dotenv`: Loads environment variables from a `.env` file.
- `cors`: CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- `helmet`: Helmet helps you secure your Express apps by setting various HTTP headers.
- `http-status-codes`: Constants enumerating the HTTP status codes.
- `rimraf`: A deep deletion module for node (like `rm -rf`).
- `zod`: TypeScript-first schema declaration and validation library.
- `typescript`: TypeScript is a language for application-scale JavaScript.

We also installed the types for the dependencies.

## Step 4: Initialize TypeScript

Run the following command to initialize TypeScript in the project.

```bash
npx tsc --init
```

## Step 5: Configure TypeScript

Update the `tsconfig.json` file with the following configuration.

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "ES2021" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs" /* Specify what module code is generated. */,
    "rootDir": "src" /* Specify the root folder within your source files. */,
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    "resolveJsonModule": true /* Enable importing .json files. */,
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    "outDir": "build" /* Specify an output folder for all emitted files. */,
    // "removeComments": true,                           /* Disable emitting comments. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

## Step 6: Create a source directory

Create a new directory `src` in the project directory.

```bash
mkdir src
```

## Step 7: Setup ESLint and Prettier

Run the following command to install ESLint and Prettier in the project.

```bash
npm install -D eslint eslint-config-prettier prettier
```

Run the following command to initialize ESLint in the project.

```bash
npm init @eslint/config@latest
```

Run the following command to install the prettier plugin for ESLint.

```bash
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts: \nbuild\ncoverage\n\n# Ignore all dotfiles\n.*\n\n# Ignore lock files\npackage-lock.json\nyarn.lock\n\n# Ignore node_modules and public folders\nnode_modules\npublic\n')"
```

Add this .prettierrc file to the project root directory:

```json
{
  "bracketSpacing": true,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

Add eslint-config-prettier to make ESLint and Prettier play nice with each other.

Updated eslint.config.mjs file:

```typescript
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
```

## Step 8: Setup Husky and Lint-Staged

Run the following command to install Husky and Lint-Staged in the project.

```bash
npm install --save-dev husky lint-staged
npx husky init
node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
node --eval "fs.writeFileSync('.huskyrc','{\n  \"hooks\": {\n    \"pre-commit\": \"npx lint-staged\"\n  }\n}')"
node --eval "fs.writeFileSync('.lintstagedrc','{}\n')"
node --eval "fs.writeFileSync('.husky/install.mjs', '')"
```

Add the following configuration for lint-staged

```json
{
  "*/**/*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix", "eslint"],
  "*/**/*.{json,css,md}": ["prettier --write"]
}
```

Add the following configuration for husky install

```javascript
import { process } from "node";

// Skip Husky install in production and CI
if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
  process.exit(0);
}
const husky = (await import("husky")).default;
console.log(husky());
```

## Step 9: Setup Morgan and Winston for Logging

Run the following command to install Morgan and Winston in the project.

```bash
npm install morgan winston
```

Install the types for the dependencies.

```bash
npm install -D @types/morgan
```

Create a new directory src/middlewares in the project directory.

```bash
mkdir src/middlewares
```

Create a new file src/middlewares/morgan.middleware.ts in the project directory.

```bash
touch src/middlewares/morgan.middleware.ts
```

Add the following code to the morgan.middleware.ts file.

```typescript
import logger from "@/utils/logger";
import morgan, { type StreamOptions } from "morgan";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware;
```

Create a new directory src/utils in the project directory.

```bash
mkdir src/utils
```

Create a new file src/utils/logger.ts in the project directory.

```bash
touch src/utils/logger.ts
```

Add the following code to the logger.ts file.

```typescript
import winston from "winston";
// import * as path from "path";
// import * as fs from "fs";

// const logDir = path.join(__dirname, "../utils/logs");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "bold cyan",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const transports = [
  new winston.transports.Console(),
  // new winston.transports.File({
  //   filename: "./src/v1/utils/logs/error.log",
  //   level: "error",
  // }),
  // new winston.transports.File({ filename: "./src/v1/utils/logs/all.log" }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
```

## Step 10: Setup Zod for Validation

Run the following command to install Zod in the project.

```bash
npm install zod
```

Create a new file src/middlewares/validation.middleware.ts in the project directory.

```bash
touch src/middlewares/validation.middleware.ts
```

Add the following code to the validation.middleware.ts file.

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from "express";
import { type z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Constructing a more professional and verbose error message
        const errorMessages = error.errors.map((issue: any) => {
          const field = issue.path.join(".");
          const message = issue.message;
          return `${field} is ${message.toLowerCase()}.`;
        });

        res.status(StatusCodes.BAD_REQUEST).json({
          error: error,
          message: `Please correct the following errors: ${errorMessages.join(" ")}`, // Concatenating all messages with a space for readability
          description: error.issues,
          code: StatusCodes.BAD_REQUEST,
        });
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: error,
          message: "Please correct the errors",
          description: error,
          code: StatusCodes.BAD_REQUEST,
        });
      }
    }
  };
}
```

## Step 11: Setup Swagger for API Documentation

Run the following command to install Swagger in the project.

```bash
npm install -D swagger-jsdoc swagger-ui-express @types/swagger-jsdoc @types/swagger-ui-express
```

Create a new file src/utils/swagger.ts in the project directory.

```bash
touch src/utils/swagger.ts
```

Add the following code to the swagger.ts file.

```typescript
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
    swagger: `http://localhost:${process.env.PORT}/api/docs/json`,
    externalDocs: {
      url: `http://localhost:${process.env.PORT}/api/docs/json`,
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
    ],
  },
  apis: ["**/*.ts"],
};
const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
```

## Step 12: Setup Express Application

Create a new file src/index.ts in the project directory.

```bash
touch src/server.ts
```

Add the following code to the server.ts file.

```typescript
import app from "./app";
import Server from "http";
import dotenv from "dotenv";
import logger from "@/utils/logger";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Initialize Application Insights
// appInsightsSetup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "");

const server = Server.createServer(app);

server.listen(PORT, () => {
  logger.info(`App running at http://localhost:${PORT}`);
});
```

Create a new file src/app.ts in the project directory.

```bash
touch src/app.ts
```

Add the following code to the app.ts file.

```typescript
import express, { type Request, type Response, type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import morganMiddleware from "@/middlewares/morgan.middleware";
import { handleErrors, notFound } from "@/middlewares";
import { specs, swaggerUi } from "@/utils/swagger";
import { StatusCodes } from "http-status-codes";
import router from "@/routers";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(cors());
app.use(helmet());

app.use("/api/docs/json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

/* 
  @swagger
  /:
    get:
      summary: Welcome to Feedback-MS
      description: Welcome to Feedback-MS
      responses:
        200:
          description: Welcome to Feedback-MS
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Welcome to Feedback-MS
 */
app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Welcome to Feedback-MS" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use("/api", router);

app.use(handleErrors);
app.use(notFound);

export default app;
```

## Step 13: Create a router

Create a new directory src/routers in the project directory.

```bash
mkdir src/routers
```

Create a new file src/routers/index.ts in the project directory.

```bash
touch src/routers/index.ts
```

Add the following code to the index.ts file.

```typescript
import express from "express";
import { StatusCodes } from "http-status-codes";
import echoRouter from "@/routers/echo.router";

const router = express.Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     description: Returns a JSON response indicating that the Feedback-MS is up and running.
 *     tags:
 *       - Health Check
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the Feedback-MS.
 *                   example: Feedback-MS Up and running
 */

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "UP" });
});

router.use("/echo", echoRouter);
export default router;
```

Create a new file src/routers/echo.router.ts in the project directory.

```bash
touch src/routers/echo.router.ts
```

Add the following code to the echo.router.ts file.

```typescript
import { validateData } from "@/middlewares";
import { echoSchema } from "@/schemas/echo.schema";
import { echo } from "@/controllers";
import express from "express";
const router = express.Router();

/**
 * @swagger
 * /echo:
 *   post:
 *     summary: Echo the message
 *     description: Returns the message sent in the request body.
 *     tags:
 *       - Echo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello, world!"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponseBody'
 */
router.post("/", validateData(echoSchema), echo);

export default router;
```

## Step 14: Create a controller

Create a new directory src/controllers in the project directory.

```bash
mkdir src/controllers
```

Create a new file src/controllers/echo.controller.ts in the project directory.

```bash
touch src/controllers/echo.controller.ts
```

Add the following code to the echo.controller.ts file.

```typescript
import { type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";

const echo = async (req: Request, res: Response) => {
  const { message } = req.body;
  res.status(StatusCodes.OK).json({ message });
};

export { echo };
```

## Step 15: Create a schema

Create a new directory src/schemas in the project directory.

```bash
mkdir src/schemas
```

Create a new file src/schemas/echo.schema.ts in the project directory.

```bash
touch src/schemas/echo.schema.ts
```

Add the following code to the echo.schema.ts file.

```typescript
import { z } from "zod";

/*
 * @swagger
 * components:
 *   schemas:
 *     EchoSchema:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *           example: Hello, World!
 *       required:
 *         - message
 *       description: The message to be echoed back.
 */
export const echoSchema = z.object({
  message: z.string().min(1).max(255),
});

export type EchoSchema = z.infer<typeof echoSchema>;
```

## Step 16: Create a .env file

Create a new file .env in the project directory.

```bash
touch .env
```

Add the following configuration to the .env file.

```env
PORT=5000
NODE_ENV=development
```

## Step 17: Add development scripts

Install the following development dependencies.

```bash
npm install -D nodemon ts-node-dev tsconfig-paths
```

Create a file nodemon.json in the project directory.

```bash
touch nodemon.json
```

Add the following configuration to the nodemon.json file.

```json
{
  "watch": ["src", ".env"],
  "ignore": ["src/**/*.spec.ts"],
  "ext": "ts,js,json",
  "exec": "ts-node-dev --respawn --transpile-only -r tsconfig-paths/register src/server.ts"
}
```

Add the following scripts to the package.json file.

```json
{
  "scripts": {
    "start": "node build/server.js",
    "dev": "nodemon",
    "build": "rimraf build && tsc",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "prettier": "prettier --write .",
    "prettier:check": "prettier --check ."
  }
}
```

## Step 17: Run the application

Run the following command to start the application.

```bash
npm run dev
```

The application will start at http://localhost:5000.

## Step 18: Add Testing to the Application

Install the following development dependencies.

```bash
npm install -D jest supertest ts-jest @types/jest @types/supertest
```

Create a new directory src/tests in the project directory.

```bash
mkdir src/tests
```

Create a new file src/tests/echo.test.ts in the project directory.

```bash
touch src/tests/echo.test.ts
```

Add the following code to the echo.test.ts file.

```typescript
import request from "supertest";
import app from "@/app";
import { StatusCodes } from "http-status-codes";

describe("Echo Controller", () => {
  it("should echo the message", async () => {
    const message = "Hello, World!";
    const response = await request(app).post("/api/echo").send({ message });
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe(message);
  });

  it("should return bad request for empty message", async () => {
    const response = await request(app).post("/api/echo").send({});
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
```

Generate a jest configuration file.

```bash
npx ts-jest config:init
```

Update the jest configuration file.

```typescript
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\nitin\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // The default configuration for fake timers
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state and implementation before every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  // testEnvironment: "jest-environment-node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};

export default config;
```

Run the following command to run the tests.

```bash
npm test
```

## Step 19: Run the application in production

Install tsc-alias to resolve the aliases in the production build.

```bash
npm install -D tsc-alias
```

Update the following scripts in package.json.

```json
{
  "scripts": {
    "start": "node build/server.js",
    "dev": "nodemon",
    "build": "rimraf build && tsc --build && tsc-alias",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "prettier": "prettier --write .",
    "prettier:check": "prettier --check .",
    "prepare": "husky || true",
    "test": "jest"
  }
}
```

Run the following command to build the application.

```bash
npm run build
```

Run the following command to start the application in production.

```bash
npm start
```

## Step 20: Add Docker Support

Run the following command to initialize the Docker in the project directory.

```bash
docker init
```

Follow the steps and select the default options.

## Overall Project Structure

```bash
nodejs-express-typescript
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── .husky
│   ├── install.mjs
│   └── pre-commit
├── .huskyrc
├── .lintstagedrc
├── .prettierignore
├── .prettierrc
├── build
│   ├── app.js
│   ├── controllers
│   ├── exceptions
│   ├── middlewares
│   ├── routers
│   ├── schemas
│   ├── server.js
│   ├── tests
│   └── utils
├── compose.yaml
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report
│   └── lcov.info
├── Dockerfile
├── eslint.config.mjs
├── jest.config.ts
├── nodemon.json
├── package.json
├── README.Docker.md
├── setup.README.md
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── controllers
│   ├── exceptions
│   ├── middlewares
│   ├── routers
│   ├── schemas
│   ├── tests
│   └── utils
├── tsconfig.json
└── README.md
```

## Conclusion
