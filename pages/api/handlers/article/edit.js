import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");
const crypto = require("crypto");

const Article = require("../../model/article");
const { connectToDatabase } = require("../../database/db");
const {
  createArticleSchema,
} = require("../../validators/articleValidationSchemas");
const { decodeJWT } = require("../../jwt/generate");

const app = express();

connectToDatabase();

app.put(
  "/api/handlers/article/edit",
  createArticleSchema,
  async (req, res) => {
    try {
      // check validation
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
        return res
          .status(400)
          .json({ message: validationErrors.array()[0].msg });

      // get user data with jwt
      const userToken = decodeJWT(req.headers["token"]);
      if (!!!userToken)
        return res.status(400).json({ message: "token isn't valid" });
      try {
        var articleID = req.headers["article-id"];
        if (!!!articleID)
          return res.status(400).json({ message: "ArticleId is Empity" });
          articleID = articleID.trim().replace(/"/g,'')
          const isExistArticle =  await Article.findOne({"uuid":articleID})
        if (!!!isExistArticle)
          return res.status(404).json({ message: "Article not found" });


          const {title,description,body,tags}=req.body
          isExistArticle.title=title
          isExistArticle.description=description
          isExistArticle.body=body
          isExistArticle.tags=tags

          await isExistArticle.save()

        return res.status(204).send();
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
  }
);

export default app;
