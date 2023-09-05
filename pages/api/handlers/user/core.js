import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../../model/user");
const { connectToDatabase } = require("../../database/db");
const { loginSchema } = require("../../validators/userValidationSchemas");

const app = express();

connectToDatabase();

app.post("/api/handlers/user/core", loginSchema, async (req, res) => {
  try {
   

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ message: validationErrors.array()[0].msg });

      const userToken = decodeJWT(req.headers["token"]);
      if (!!!userToken)
        return res.status(400).json({ message: "token isn't valid" });

    // const { email, password } = req.body;
    try {
      const getUserData = await User.findOne(userToken);
      if (!getUserData)
        return res.status(400).json({
          message: "کاربر یافت نشد",
        });
      return res.status(200).json(getUserData);
    } catch (error) {
      return res.status(500).json({
        message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
      });
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error Get user:" + error });
  }
});

export default app;
