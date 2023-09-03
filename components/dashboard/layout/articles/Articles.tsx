import Router from "next/router";
import React, { useEffect, useState } from "react";
import useArticleCRUD from "../../../../hooks/useArticleCRUD";
// import useArticleCRUD from "../../../../hooks/useArticleCRUD";
import Table from "../../../ui/Table/Table";
import { useToast } from "../../../ui/Tooltip/ToolTipsContext";

import addingPicture from './img/adding.png'

const { Header } = require("../header/Header.tsx");

const apiData = require("../../../ui/Table/utils/ApiData.json");
export default function Articles() {

  const [tableData, setTableData] = useState([])

  const {readMyArticle} = useArticleCRUD()
  const {showToast} = useToast()
  function onEditFun(e) {
    console.log("edit function :>> ", e);
  }
  function onDeleteFun(e) {
    console.log("delete function :>> ", e);
  }

  useEffect(() => {
  getMyArticles()
  }, [])
  
  
  async function getMyArticles() {
    try {
      const data = await readMyArticle()
      setTableData(data)
    } catch (error) {
      showToast({text:error.message,type:"Error"})
    }
    
  }
  
  return (
    <div>
      <Header title="Articles" onButtonClick={()=>Router.push("createArticles")} buttonText="Add Article" buttonImage={addingPicture}/>
      {/* <Header title="Articles" /> */}
      <br />
      <Table
        data={tableData}
        titles={["Title", "Author", "Tags", "Excerpt", "Created At"]}
        paths={["title","username","tags","body","articleId"]}
        showAction={{ onDelete: onDeleteFun, onEdit: onEditFun }}
        setTagStyleForColumn={3}
        showIndex
      />
    </div>
  );
}
