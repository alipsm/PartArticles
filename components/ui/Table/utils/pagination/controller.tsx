import React, { useEffect } from 'react'
import { useState } from "react";

const {View} = require("./view")

function Pagination({apiData,setTableData,rowCount=3}) {
    useEffect(() => {
        paginationHandler("next")
    }, [])
    
    const [paginationData, setPaginationData] = useState({
        startIndex: 0,
        endIndex: 0,
        currentPage: 0,
      });
    function* paginateData(action:string) {
      const totalItems = apiData.length;
      let innerCurrentPage=paginationData.currentPage
      let innerStartIndex =paginationData.startIndex
      let innerEndIndex = paginationData.endIndex
      while (true) {
      if (action == "next" && innerEndIndex < totalItems) {
        innerCurrentPage+=1
        innerStartIndex = innerEndIndex;
        innerEndIndex = Math.min(innerEndIndex + rowCount, totalItems);
      } else if (action == "prev" && innerStartIndex > 0) {
        innerCurrentPage-=1
        innerStartIndex = Math.max(innerStartIndex - rowCount, 0);
        innerEndIndex = innerStartIndex+rowCount;
      } else {
        return;
      }
      const currentPageData = apiData.slice(innerStartIndex, innerEndIndex);
      setPaginationData({
        currentPage:innerCurrentPage,
        startIndex:innerStartIndex,
        endIndex:innerEndIndex
      })
        yield currentPageData;
      }
    }
      function paginationHandler(action: string) {
        const dataPaginator = paginateData(action);
        const data = dataPaginator.next().value;
        setTableData(data);
      }
  return (<View currentPage={paginationData.currentPage} handleOnClick={paginationHandler}/>)
}
  module.exports={Pagination}