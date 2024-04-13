const sendResponse = async (res, success, data, message) => {
  let result = { success, data, message };
  return res.status(200).json(result);
};

class ApiResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export { sendResponse, ApiResponse };
