const { body, header } = require("express-validator");

const createArticleSchema = [
  body("title")
    .notEmpty()
    .withMessage("Title is Empity!")
    .isLength({ min: 3, max: 500 })
    .withMessage("Title length is out of range"),
  body("description")
    .notEmpty()
    .withMessage("Description is Empity!"),
    body("body")
    .notEmpty()
    .withMessage("Body is Empity!"),body("tags")
    .notEmpty()
    .withMessage("Tags is Empity!"),
  header("token").notEmpty().withMessage("Token is Empity!"),
];

const editArticleSchema = [
  body("title")
  .notEmpty()
  .withMessage("Title is Empity!")
  .isLength({ min: 3, max: 500 })
  .withMessage("Title length is out of range"),
body("description")
  .notEmpty()
  .withMessage("Description is Empity!"),
  body("body")
  .notEmpty()
  .withMessage("Body is Empity!"),body("tags")
  .notEmpty()
  .withMessage("Tags is Empity!"),
header("token").notEmpty().withMessage("Token is Empity!"),
];

const deleteArticleSchema = [
    body("articleID")
    .notEmpty()
    .withMessage("ArticleId is Empity!")
    .isLength({ min: 6, max: 50 })
    .withMessage("ArticleId length is out of range"),
  header("token").notEmpty().withMessage("Token is Empity!"),
]

module.exports = {
  createArticleSchema,
  editArticleSchema,
  deleteArticleSchema
};