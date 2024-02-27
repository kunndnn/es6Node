const sendResponse = async (res, success, data, message) => {
  let result = { success, data, message };
  return res.status(200).json(result);
};
export { sendResponse };
