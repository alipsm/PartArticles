import Router from "next/router";
import React, { useEffect, useState } from "react";
import Articles from "./layout/articles/Articles";
import CreateArticles from "./layout/createArticles/CreateArticles";
import EditArticles from "./layout/editArticle/EditArticles";

export default function GetMainDashboard({ section = "" }) {
    // const [sectionComponent, setSsectionComponent] = useState()
//   useEffect(() => {
//     getSection();
//   }, []);

//   function getSection() {
    switch (section.toLowerCase()) {
      case "articles":
        return <Articles />;
      case "createarticles":
        return <CreateArticles />;
      case "edit":
        return <EditArticles />;

      default:
        // debugger
        // if (typeof window) {
            
        //     Router.push("/dashboard/articles");
        // }
        // console.log('window')
        // setTimeout(() => {
        // }, 1000);
        break;
    }
//   }
}
