import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Path ke aplikasi Next.js kamu (agar Jest bisa load next.config.js & .env)
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Jalankan file setup sebelum test (opsional)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

// Ekspor konfigurasi agar next/jest bisa load Next.js config secara async
export default createJestConfig(config);
