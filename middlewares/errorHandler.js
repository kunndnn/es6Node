// export const errorHandler = (handler) => async (req, res, next) => {
//   try {
//     await handler(req, res, next);
//   } catch (error) {
//     console.error("Error caught in middleware:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
};
