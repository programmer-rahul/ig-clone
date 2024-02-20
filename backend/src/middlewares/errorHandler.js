import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.log("Error :- ", err);
  try {
    if (err instanceof ApiError) {
      res.status(err.status).json({
        message: err.message,
        data: err.data,
        status: false,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error",
        data: null,
        status: false,
      });
    }
  } catch (error) {
    console.log("server error :- ", error);
    res.status(500).json({
      message: "Unhandled Server Error",
      data: null,
      status: false,
    });
  }
};

export default errorHandler;
