# Create New Express App

The easiest way to create a new Express app is to use the Create New Express App. The Create New Express App is a tool that generates a new Express app with a predefined folder structure. To create a new Express app using the Create New Express App, follow these steps:

1. Install the Create New Express App globally by running the following command:

```bash
npm install -g create-new-express-app
```

2. Create a new Express app by running the following command:

```bash
create-new-express-app my-express-app
```

Replace `my-express-app` with the name of your app.

Or, you can use the following command to create a new Express app using npx:

```bash
npx create-new-express-app my-express-app
```

### Package Manager Selection

The CLI will prompt you to select your preferred package manager for installing dependencies. You can choose from:
- **Auto-detect**: Automatically detects your package manager from the environment (default)
- **npm**: Use npm for dependency installation
- **pnpm**: Use pnpm for dependency installation
- **yarn**: Use yarn for dependency installation
- **bun**: Use bun for dependency installation

### ORM and Database Selection

The CLI will prompt you to select an ORM (Object-Relational Mapping) tool and database for your application:

#### ORM Options:
- **None**: Skip ORM setup (you can add it manually later)
- **Prisma**: Modern TypeScript ORM with auto-generated type-safe queries
  - Supports: PostgreSQL, MongoDB, SQL Server
  - Auto-generates: `prisma/schema.prisma`, seed file, and database scripts
- **Drizzle**: Lightweight and performant TypeScript ORM
  - Currently supports: PostgreSQL (in this CLI)
  - Auto-generates: `src/db/schema.ts`, `drizzle.config.ts`, seed file, and database scripts

#### Database Options:
- **PostgreSQL**: Open-source relational database
- **MongoDB**: Document-oriented NoSQL database (Prisma only)
- **SQL Server**: Microsoft SQL Server relational database (Prisma only)

**Note**: The CLI validates ORM-database combinations and will only show compatible options.

#### Generated Database Scripts:
When you select an ORM, the following npm scripts are added to your `package.json`:
- `db:generate`: Generate Prisma client or Drizzle migrations
- `db:push`: Push schema changes to the database
- `db:migrate`: Run database migrations
- `db:seed`: Seed the database with initial data
- `db:studio`: Open database GUI (Prisma Studio or Drizzle Studio)

### Skip Dependency Installation

If you want to skip automatic dependency installation, you can use the `--no-install` flag:

```bash
npx create-new-express-app my-express-app --no-install
```

This is useful if you want to review the generated project before installing dependencies or if you prefer to install them manually.

3. Change to the newly created app directory by running the following command:

```bash
cd my-express-app
```

## Why use Create New Express App?

The Create New Express App is a great tool for quickly creating a new Express app with a predefined folder structure. It saves you time and effort by generating the boilerplate code for you. This allows you to focus on building your app instead of setting up the project structure. It includes many useful features such as:

- Predefined folder structure: The Create New Express App creates a new Express app with a predefined folder structure that includes directories for routes, views, public files, and more.
- Default middleware: The Create New Express App includes default middleware such as `zod`, `morgan`, and `helmet` to help you get started quickly.
- Logging: The Create New Express App includes logging middleware using `morgan` to log HTTP requests to the console.
- Error handling: The Create New Express App includes error-handling middleware to handle errors that occur during the request-response cycle.
- Zod: The Create New Express App includes Zod for input validation.
- Jest: The Create New Express App includes Jest for testing.
- ESLint: The Create New Express App includes ESLint for linting your code.
- Prettier: The Create New Express App includes Prettier for code formatting.
- **ORM Integration**: Choose between Prisma or Drizzle ORM with automatic setup for PostgreSQL, MongoDB, or SQL Server.
- **Database Setup**: Automatically generates schema files, seed scripts, and database configuration.
