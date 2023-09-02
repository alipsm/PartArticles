import React from "react";
import Table from "../../../ui/Table/Table";

const { Header } = require("../header/Header.tsx");

const apiData = require("../../../ui/Table/utils/ApiData.json");
export default function Articles() {
  function onEditFun(e) {
    console.log("edit function :>> ", e);
  }
  function onDeleteFun(e) {
    console.log("delete function :>> ", e);
  }
  return (
    <div>
      <Header title="Articles" />
      <br />
      <Table
        data={apiData}
        titles={["Title", "Author", "Tags", "Excerpt", "Created At"]}
        showAction={{ onDelete: onDeleteFun, onEdit: onEditFun }}
        setTagStyleForColumn={3}
        showIndex
      />
    </div>
  );
}
