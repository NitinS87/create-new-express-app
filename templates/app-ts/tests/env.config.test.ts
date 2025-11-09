describe("Environment Configuration Validation", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let mockExit: jest.SpyInstance;

  beforeEach(() => {
    // Save original environment
    originalEnv = { ...process.env };

    // Mock process.exit to prevent actual exit
    mockExit = jest.spyOn(process, "exit").mockImplementation((() => {
      throw new Error("process.exit called");
    }) as never);

    // Clear module cache to get fresh imports
    jest.resetModules();
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
    mockExit.mockRestore();
  });

  describe("validateEnv function", () => {
    it("should successfully validate with valid environment variables", () => {
      // Set valid environment variables
      process.env.NODE_ENV = "development";
      process.env.PORT = "3000";

      // Import and call validateEnv
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result).toBeDefined();
      expect(result.NODE_ENV).toBe("development");
      expect(result.PORT).toBe(3000);
    });

    it("should use default values when optional variables are missing", () => {
      // Don't set any environment variables
      delete process.env.NODE_ENV;
      delete process.env.PORT;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result.NODE_ENV).toBe("development");
      expect(result.PORT).toBe(8000);
    });

    it("should accept production environment", () => {
      process.env.NODE_ENV = "production";
      process.env.PORT = "8080";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result.NODE_ENV).toBe("production");
      expect(result.PORT).toBe(8080);
    });

    it("should accept test environment", () => {
      process.env.NODE_ENV = "test";
      process.env.PORT = "9000";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result.NODE_ENV).toBe("test");
      expect(result.PORT).toBe(9000);
    });

    it("should exit process with invalid NODE_ENV", () => {
      process.env.NODE_ENV = "invalid";
      process.env.PORT = "3000";

      // The module import triggers validateEnv() execution
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/config/env.config");
      }).toThrow("process.exit called");
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should exit process with invalid PORT (non-numeric)", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "not-a-number";

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/config/env.config");
      }).toThrow("process.exit called");
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should exit process with PORT out of valid range (too low)", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "0";

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/config/env.config");
      }).toThrow("process.exit called");
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should exit process with PORT out of valid range (too high)", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "70000";

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/config/env.config");
      }).toThrow("process.exit called");
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should handle ZodError and exit on invalid configuration", () => {
      process.env.NODE_ENV = "invalid-env";
      process.env.PORT = "3000";

      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/config/env.config");
      }).toThrow("process.exit called");
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("should accept valid PORT at boundary (1)", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "1";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result.PORT).toBe(1);
    });

    it("should accept valid PORT at boundary (65535)", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "65535";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(result.PORT).toBe(65535);
    });

    it("should convert PORT string to number", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "4000";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");

      const result = validateEnv();

      expect(typeof result.PORT).toBe("number");
      expect(result.PORT).toBe(4000);
    });
  });

  describe("EnvConfig type", () => {
    it("should have correct type structure", () => {
      process.env.NODE_ENV = "development";
      process.env.PORT = "3000";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { validateEnv } = require("@/config/env.config");
      const config = validateEnv();

      // Type checks (these will be caught by TypeScript at compile time)
      expect(typeof config.NODE_ENV).toBe("string");
      expect(typeof config.PORT).toBe("number");
      expect(["development", "production", "test"]).toContain(config.NODE_ENV);
    });
  });

  describe("envConfig export", () => {
    it("should export validated config as constant", () => {
      process.env.NODE_ENV = "test";
      process.env.PORT = "5000";

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { envConfig } = require("@/config/env.config");

      expect(envConfig).toBeDefined();
      expect(envConfig.NODE_ENV).toBe("test");
      expect(envConfig.PORT).toBe(5000);
    });
  });
});
