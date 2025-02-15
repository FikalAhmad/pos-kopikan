// // hooks.ts
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "./store";

// // Typed hooks untuk TypeScript
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // Hook untuk mengelola state authentication
// export const useAuth = () => {
//   const dispatch = useAppDispatch();
//   const { user, isLoading, error } = useAppSelector((state) => state.auth);

//   const login = async (credentials: { email: string; password: string }) => {
//     try {
//       await dispatch(loginUser(credentials)).unwrap();
//     } catch (error) {
//       console.error("Failed to login:", error);
//     }
//   };

//   const logout = () => {
//     dispatch(logoutUser());
//   };

//   return {
//     user,
//     isLoading,
//     error,
//     login,
//     logout,
//   };
// };

// // Hook untuk mengelola shopping cart
// export const useCart = () => {
//   const dispatch = useAppDispatch();
//   const { items, total } = useAppSelector((state) => state.cart);

//   const addToCart = (product: Product) => {
//     dispatch(addItem(product));
//   };

//   const removeFromCart = (productId: string) => {
//     dispatch(removeItem(productId));
//   };

//   const updateQuantity = (productId: string, quantity: number) => {
//     dispatch(updateItemQuantity({ productId, quantity }));
//   };

//   return {
//     items,
//     total,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//   };
// };

// // Hook untuk mengelola products
// export const useProducts = () => {
//   const dispatch = useAppDispatch();
//   const { products, isLoading, error } = useAppSelector(
//     (state) => state.products
//   );

//   const fetchProducts = async (category?: string) => {
//     try {
//       await dispatch(getProducts(category)).unwrap();
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//   };

//   const searchProducts = async (query: string) => {
//     try {
//       await dispatch(searchProductsAsync(query)).unwrap();
//     } catch (error) {
//       console.error("Failed to search products:", error);
//     }
//   };

//   return {
//     products,
//     isLoading,
//     error,
//     fetchProducts,
//     searchProducts,
//   };
// };

// // Hook untuk mengelola pagination
// export const usePagination = (slice: string) => {
//   const dispatch = useAppDispatch();
//   const { currentPage, totalPages, itemsPerPage } = useAppSelector(
//     (state) => state[slice].pagination
//   );

//   const setPage = (page: number) => {
//     dispatch(setCurrentPage({ slice, page }));
//   };

//   const setItemsPerPage = (items: number) => {
//     dispatch(setPageSize({ slice, size: items }));
//   };

//   return {
//     currentPage,
//     totalPages,
//     itemsPerPage,
//     setPage,
//     setItemsPerPage,
//   };
// };
