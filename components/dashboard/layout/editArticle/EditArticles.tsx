import Router from "next/router";
import React, { useState } from "react";
import useArticleCRUD from "../../../../hooks/useArticleCRUD";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useToast } from "../../../ui/Toastify/ToolTipsContext";
import CreateTagBox from "../shared/createTag/CreateTagBox";
import styles from "./_style.module.scss";

const { Header } = require("../header/Header.tsx");
const { EditForm } = require("./EditForm.tsx");

export default function EditArticles() {

  const { showToast } = useToast();
  const { getValidation } = useFormValidation();
  const { editArticle } = useArticleCRUD();
  
  const [myTags, setMyTags] = useState([]);
  const [inputError, setInputError] = useState({ name: "", text: "" });

  const handleSubmitEditArticle = async (e: object) => {
    const { status, message, field } = getValidation(e);
    if (status) {
      try {
        const getArticleId = sessionStorage.getItem("articleID");
        const articleData = { ...e, tags: myTags };
        await editArticle(articleData,getArticleId);
        showToast({ text: "Article Edited successfully", type: "Success" });
        Router.replace("articles");
      } catch (error) {
        showToast({ text: error.message, type: "Error" });
      }
    } else {
      setInputError({ name: field, text: message });
      showToast({ text: message, type: "Error" });
    }
  };

  return (
    <div id={styles.CreateArticles}>
      <Header title="Edit Article" />
      <main>
        <EditForm
          onSubmitForm={handleSubmitEditArticle}
          setInputError={inputError}
        />
        <section>
          <CreateTagBox onChange={setMyTags} />
        </section>
      </main>
    </div>
  );
}
