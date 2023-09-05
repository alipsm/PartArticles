const express = require("express");

const Article = require("../../model/article");
const { connectToDatabase } = require("../../database/db");
const { decodeJWT } = require("../../jwt/generate");

const app = express();

connectToDatabase();

app.get(
  "/api/handlers/article/all",
  async (req, res) => {
    try {

      // get user data with jwt
      const userToken = decodeJWT(req.headers["token"]);
      if (!!!userToken)
        return res.status(400).json({ message: "token isn't valid" });
      try {
          const readArticles = await Article.find({username:userToken.username});
        if (!readArticles||readArticles.length===0) {
            return res.status(404).json({
                message: "مقاله ای یافت نشد",
              });
        }
        return res.status(200).json(readArticles);
      } catch (error) {
        return res.status(500).json({
          message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error creating user:" + error });
    }
  }
);

export default app;
