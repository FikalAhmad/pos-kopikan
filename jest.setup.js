import "@testing-library/jest-dom";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("./src/redux/store.ts", () => ({
  store: { getState: jest.fn(), dispatch: jest.fn(), subscribe: jest.fn() },
}));
