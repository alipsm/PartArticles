import { ObjectId } from "mongodb";
import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");

const Article = require("../../model/article");
const { connectToDatabase } = require("../../database/db");
const {
  deleteArticleSchema,
  editArticleSchema,
} = require("../../validators/articleValidationSchemas");
const { decodeJWT } = require("../../jwt/generate");

const app = express();

connectToDatabase();

app.delete(
  "/api/handlers/article/delete",
  deleteArticleSchema,
  async (req, res) => {
    try {
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
        const articleID = req.headers["article-id"];
        if (!!!articleID)
          return res.status(400).json({ message: "ArticleId is Empity" });

        await Article.deleteOne({'uuid':articleID})
          .then(async() => {
            const articles= await Article.find();
            return res.status(200).json(articles)
          })
          .catch((e) => {
            console.log('e', e)
            return res.status(500).json({
              message: "Problem in deleting the article",
            });
          });
          return res.status(204).send()
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
        });
      }
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.code).json({ message: error.message });
      }
      return res
        .status(500)
        .json({ message: "Error Deleting article:" + error });
    }
  }
);

export default app;
