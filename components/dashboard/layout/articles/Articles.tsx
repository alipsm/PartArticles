import Router from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import useArticleCRUD from "../../../../hooks/useArticleCRUD";
// import useArticleCRUD from "../../../../hooks/useArticleCRUD";
import Table from "../../../ui/Table/Table";
import { useToast } from "../../../ui/Toastify/ToolTipsContext";

import addingPicture from "./img/adding.png";

const { Header } = require("../header/Header.tsx");

const apiData = require("../../../ui/Table/utils/ApiData.json");
export default function Articles() {
  const { deleteArticle } = useArticleCRUD();
  const [tableData, setTableData] = useState([]);

  const { readMyArticle } = useArticleCRUD();
  const { showToast } = useToast();

  function onEditFun(e) {
    sessionStorage.setItem("articleID", JSON.stringify(e.uuid));
    window !=undefined&& Router.push("edit");
  }

  async function onDeleteFun(e) {
    try {
      const data = await deleteArticle(e.uuid);
      setTableData(data);
      showToast({ text: "Article deleted successfully", type: "Success" });
    } catch (error) {
      showToast({ text: error.message || error, type: "Error" });
    }
  }

  useEffect(() => {
    getMyArticles();
  }, []);

  async function getMyArticles() {
    try {
      const data = await readMyArticle();
      setTableData(data);
    } catch (error) {
      showToast({ text: error.message, type: "Error" });
    }
  }

  const memoizedTable = useMemo(
    () => (
      <Table
        data={tableData}
        titles={["Title", "Author", "Tags", "Excerpt", "Created At"]}
        paths={["title", "username", "tags", "body", "createAt"]}
        showAction={{
          onDelete: onDeleteFun,
          onEdit: onEditFun,
          titlePath: "title",
        }}
        setTagStyleForColumn={3}
        showIndex
      />
    ),
    []
  );

  return (
    <div>
      <Header
        title="Articles"
        onButtonClick={() => Router.push("createArticles")}
        buttonText="Add Article"
        buttonImage={addingPicture}
      />
      {/* <Header title="Articles" /> */}
      <br />
      {/* {memoizedTable} */}
      <Table
        data={tableData}
        titles={["Title", "Author", "Tags", "Excerpt", "Created At"]}
        paths={["title", "username", "tags", "body", "createAt"]}
        showAction={{
          onDelete: onDeleteFun,
          onEdit: onEditFun,
          titlePath: "title",
        }}
        setTagStyleForColumn={3}
        rowCount={5}
        showIndex
      />
    </div>
  );
}
