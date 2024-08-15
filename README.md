# Create New Express App

The easiest way to create a new Express app is to use the Express Generator. The Express Generator is a tool that generates a new Express app with a predefined folder structure. To create a new Express app using the Express Generator, follow these steps:

1. Install the Express Generator globally by running the following command:

```bash
npm install -g express-generator
```

2. Create a new Express app by running the following command:

```bash
express my-express-app
```

Replace `my-express-app` with the name of your app.

Or, you can use the following command to create a new Express app using npx:

```bash
npx express-generator my-express-app
```

3. Change to the newly created app directory by running the following command:

```bash
cd my-express-app
```

## Why use Create New Express App?

The Express Generator is a great tool for quickly creating a new Express app with a predefined folder structure. It saves you time and effort by generating the boilerplate code for you. This allows you to focus on building your app instead of setting up the project structure. It includes many useful features such as:

- Predefined folder structure: The Express Generator creates a new Express app with a predefined folder structure that includes directories for routes, views, public files, and more.
- Default middleware: The Express Generator includes default middleware such as `body-parser`, `cookie-parser`, and `morgan` to help you get started quickly.
- Logging: The Express Generator includes logging middleware using `morgan` to log HTTP requests to the console.
- Error handling: The Express Generator includes error-handling middleware to handle errors that occur during the request-response cycle.
- Zod: The Express Generator includes Zod for input validation.
- Jest: The Express Generator includes Jest for testing.
- ESLint: The Express Generator includes ESLint for linting your code.
- Prettier: The Express Generator includes Prettier for code formatting.
