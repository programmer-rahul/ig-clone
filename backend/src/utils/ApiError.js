class ApiError extends Error {
  constructor(status = 500, message = "Something Went Wrong") {
    super(message);
    this.status = status;
    this.message = message;
    this.success = false;
    this.data = null;
  }
}

export default ApiError;
