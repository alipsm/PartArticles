import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../../model/user");
const { connectToDatabase } = require("../../database/db");
const { loginSchema } = require("../../validators/userValidationSchemas");

const app = express();

connectToDatabase();

app.post("/api/handlers/user/login", loginSchema, async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ message: validationErrors.array()[0].msg });
    const { email, password } = req.body;
    try {
      const getUserData = await User.findOne({ email });
      if (!getUserData)
        return res.status(400).json({
          message: "کاربر یافت نشد",
        });

      if (getUserData.password != password) {
        return res.status(400).json({
          message: "ایمیل و یا پسورد اشتباه است",
        });
      }
      return res.status(201).json(getUserData);
    } catch (error) {
      return res.status(500).json({
        message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
      });
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error Login user:" + error });
  }
});

export default app;
