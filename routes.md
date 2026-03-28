# Public API

## User API

publicRouter.get("/api/token", refreshToken);
publicRouter.post("/api/users", Register);
publicRouter.post("/api/login", Login);

## Role API

publicRouter.post("/api/roles", createRole);

# Private API

## User API

apiRouter.get("/api/users", getUsers);
apiRouter.get("/api/users/:id", getUserById);
apiRouter.patch("/api/users/:id", updateUser);
apiRouter.delete("/api/users/:id", deleteUser);
apiRouter.patch("/api/logout", Logout);

## Role API

apiRouter.get("/api/roles", getRoles);
apiRouter.patch("/api/roles", updateRole);
apiRouter.delete("/api/roles", deleteRole);

## Product API

apiRouter.get("/api/products", getProducts);
apiRouter.post("/api/products", createProduct);
apiRouter.patch("/api/products/:id", updateProduct);
apiRouter.delete("/api/products/:id", deleteProduct);

## Order API

apiRouter.get("/api/orders", getOrders);
apiRouter.get("/api/orders/:id", getOrderById);
apiRouter.post("/api/orders", createOrder);
apiRouter.patch("/api/orders/:id", updateOrder);
apiRouter.delete("/api/orders/:id", deleteOrder);

apiRouter.get("/api/offline", getOfflineOrders);
apiRouter.get("/api/online", getOnlineOrders);

## Payment API

apiRouter.get("/api/payments", getPayments);
apiRouter.get("/api/payments/:id", getPaymentById);
apiRouter.post("/api/payments", createPayment);
apiRouter.patch("/api/payments/:id", updatePayment);
apiRouter.delete("/api/payments/:id", deletePayment);
