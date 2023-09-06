import Router from "next/router";
import React, { useEffect, useState } from "react";
import Articles from "./layout/articles/Articles";
import CreateArticles from "./layout/createArticles/CreateArticles";
import EditArticles from "./layout/editArticle/EditArticles";

export default function GetMainDashboard({ section = "" }) {
    switch (section.toLowerCase()) {
      case "articles":
        return <Articles />;
      case "createarticles":
        return <CreateArticles />;
      case "edit":
        return <EditArticles />;

      default:
        setTimeout(() => {
          Router.push("/dashboard/articles");
        }, 2000);
        break;
    }
}
