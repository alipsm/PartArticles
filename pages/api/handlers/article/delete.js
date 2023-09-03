import AppError from "../../utils/error/AppError";

const express = require("express");
const { validationResult } = require("express-validator");

const Article = require("../../model/article");
const { connectToDatabase } = require("../../database/db");
const { deleteArticleSchema, editArticleSchema } = require("../../validators/articleValidationSchemas");

const app = express();

connectToDatabase();

app.delete("/api/handlers/article/delete", deleteArticleSchema, async (req, res) => {
  try {
    // check validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ message: validationErrors.array()[0].msg });

    // get user data with jwt
    const userToken = decodeJWT(req.headers["token"]);
    if (!!userToken)
      return res.status(400).json({ message: "token isn't valid" });

    try {
      const createArticle = new Article(req.body);
    // editArticleSchema.
    // Article.
    await Article.findByIdAndRemove(req.articleId).then(()=>{
        return res.status(201).json(createArticle);

    }).catch(e=>{
        return res.status(500).json({
            message: "Problem in deleting the article",
          });
    })
    await createArticle.save();
} catch (error) {
        return res.status(500).json({
          message: "خطای داخلی سرور لطفا بعدا تلاش کنید",
        });
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.code).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error Deleting article:" + error });
  }
});

export default app;
