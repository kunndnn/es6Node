import { ErrorResponse } from "#helpers/response";
export const promiseHandler = (requestHandler) => (req, res, next) => {
  // Promise.resolve(requestHandler(req, res, next)).catch(next);
  // Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));

  Promise.resolve(requestHandler(req, res, next)).catch((err) => {
    return res.status(500).json(new ErrorResponse(500, err.message, {}));
  });
};

// const promiseHandler = () => {}
// const promiseHandler = (func) => () => {}
// const promiseHandler = (func) => async () => {}
// const promiseHandler = (func) =>{ async () => {}}

// const promiseHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
