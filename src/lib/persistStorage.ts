import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_: string) {
      return Promise.resolve(null);
    },
    setItem(_: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
