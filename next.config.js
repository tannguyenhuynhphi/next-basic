module.exports = {
  serverRuntimeConfig: {
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "https://next-app-jwt.vercel.app/api", // production api,
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api/files/" // development api
        : "https://next-app-jwt.vercel.app/api", // production api,
  },
  env: {
    mongodb_username: "admin",
    mongodb_password: "1QP6CsfEP32fypK6",
    mongodb_clustername: "cluster0",
    mongodb_database: "next-app",
  },
};
