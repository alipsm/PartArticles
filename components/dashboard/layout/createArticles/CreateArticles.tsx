import Router from "next/router";
import React, { useState } from "react";
import useArticleCRUD from "../../../../hooks/useArticleCRUD";
import useFormValidation from "../../../../hooks/useFormValidation";
import { useToast } from "../../../ui/Toastify/ToolTipsContext";
import CreateTagBox from "../shared/createTag/CreateTagBox";
import styles from "./_style.module.scss";

const { Header } = require("../header/Header.tsx");
const {CreateForm } = require("./CreateForm.tsx");


export default function CreateArticles() {
  const [inputError, setInputError] = useState({ name: "", text: "" });
  const [myTags, setMyTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const { getValidation } = useFormValidation();
  const { createArticle } = useArticleCRUD();

  const handleSubmitCreateArticle = async (e: object) => {

    const { status, message, field } = getValidation(e);
    if (status) {
      try {
        setLoading(true)
        const token = localStorage.getItem("token");
        const articleData={...e,tags:myTags};
        await createArticle(articleData,token);
        showToast({ text: "Article added successfully", type: "Success" });
        Router.replace("articles");
      } catch (error) {
        showToast({ text: error.message, type: "Error" });
      } finally{
        setLoading(false)
      }
    } else {
      setInputError({ name: field, text: message });
      showToast({ text: message, type: "Error" });
    }
  };

  return (
    <div id={styles.CreateArticles}>
      <Header title="Create Article" />
      <main  >
        <CreateForm onSubmitForm={handleSubmitCreateArticle} setInputError={inputError} isLoading={loading}/>
        <section>
          <CreateTagBox onChange={setMyTags} />
        </section>
      </main>
    </div>
  );
}
