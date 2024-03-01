import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  try {
    if (err instanceof ApiError) {
      res.status(err.status).json({
        message: err.message,
        data: err.data,
        success: false,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        data: null,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Unhandled Server Error",
      data: null,
      success: false,
    });
  }
};

export default errorHandler;
