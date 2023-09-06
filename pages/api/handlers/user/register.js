import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../../model/user");
const { connectToDatabase } = require("../../database/db");
const { generateJWT } = require("../../jwt/generate");
const recaptchaValidator = require("../../middlewares/recaptchaValidator");
const { registerSchema } = require("../../validators/userValidationSchemas");

const app = express();

connectToDatabase();

app.post("/api/handlers/user/register", registerSchema, async (req, res) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ message: validationErrors.array()[0].msg });

    const recaptchaToken = req.headers["authorization"];
    const userIpIddress = req.socket.remoteAddress;

    const isRecaptchaValid = await recaptchaValidator.validateRecaptchaToken(
      recaptchaToken,
      userIpIddress
    );

    if (isRecaptchaValid == false)
      throw new AppError("Invalid reCaptcha token", 400);

    const { username, email, password } = req.body;
    try {
      const token = generateJWT({ username, email });
      const createUser = new User({ username, email, password, token });
      const isExistEmail = await User.findOne({ email });
      if (isExistEmail)
        return res.status(400).json({
          message: "This Email has already been registered",
        });
      const isExistUsername = await User.findOne({ username });
      if (isExistUsername)
        return res.status(400).json({
          message: "This Username has already been registered",
        });
      await createUser.save();
      return res.status(201).json(createUser);
    } catch (error) {
      return res.status(500).json({
        message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
      });
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error creating user:" + error });
  }
});

export default app;
