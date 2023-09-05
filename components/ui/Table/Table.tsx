import React, { useEffect, useMemo, useState } from "react";
import { tableInterface } from "./types/tableInterface";
import Actions from "./utils/actions/Actions";
// import Pagination from "./utils/pagination/controller";
import styles from "./_style.module.scss";

// import apiData from "./utils/ApiData.json";
import { findNestedValue } from "./utils/smartPath";
import DeleteArticleModal from "./utils/modal/Modal";
import SearchBox from "./utils/searchBox/SearchBox";

const {
  getColumnsNumber,
  getClassStyleForTableRow,
} = require("./utils/CalculateColumns.tsx");
const { applyStyleToValue } = require("./utils/applyStyleToValue.tsx");
const { checkPathsLenght } = require("./types/tableInterface.ts");
const { getIndexRow } = require("./utils/getIndexRow");
const {
  getObjectValueWithStringPath,
} = require("./utils/pathHandler/getObjectWithStringPath.tsx");
const { Pagination } = require("./utils/pagination/controller.tsx");

export default function Table(props: tableInterface) {
  function handleStartFindPaths(data) {
    // var getFullPath = findNestedValue(data[0], data[0], ["batter"]) || "";
    // console.log("getFullPath", getFullPath);
    // const yieldFindNestedValue = findNestedValue(data[0]);
    // const getFullPath= yieldFindNestedValue.next().value
    //  yieldFindNestedValue.next().value
    // console.log("getFullPath :>> ", yieldFindNestedValue);
    // data.forEach((myObject) => {
    //   var getFullPath=
    //   // console.log("start", myObject.lenght);
    //   // try {
    //   //   console.log(getFullPath)
    //   // } catch (error) {
    //   // }
    //   // console.log(getFullPath);
    //   // getFullPath = getFullPath.slice(1);
    //   // fullPaths.push(getFullPath);
    //   // indexFind = 0;
    //   // pathFind = " ";
    //   // currentPath = "";
    // });
    // console.log("fullPaths :>> ", fullPaths);
  }

  useEffect(() => {
    handleStartFindPaths(props.data);
  }, []);
  if (!checkPathsLenght(props)) {
    console.warn(
      "عنوان ها با مسیر ها باید طول یکسانی داشته باشند \n لطفا به طول مقادیر دقت کنید"
    );
    return;
  }

  const [tableData, setTableData] = useState({
    data: [],
    currentPage: 1,
  });
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [showPagination, setShowPagination] = useState(true);
  const [searchIndex, setSearchIndex] = useState();

  // useEffect(() => {
  //   console.log('tableData in useEffect :>> ', tableData);
  // }, [tableData.length])

  // console.log("tableData :>> ", tableData);
  // useEffect(() => {
  //   setTableData(props.data);
  // }, [props.data.length]);

  function handleDeleteTableItem() {
    props.showAction.onDelete(deleteItemData);
    setDeleteItemData(null);
  }

  const memoizedPagination = useMemo(
    () => (
      <Pagination
        apiData={props.data}
        setTableData={setTableData}
        rowCount={props.rowCount}
        showPagination={props.showPagination && showPagination}
      />
    ),
    [props.data.length, showPagination, searchIndex]
  );
  const memoizedDeleteArticleModal = useMemo(
    () => (
      <DeleteArticleModal
        articleTitle={getObjectValueWithStringPath(
          deleteItemData,
          props.showAction.titlePath
        )}
        onClose={setDeleteItemData}
        showModal={!!deleteItemData}
        onDelete={handleDeleteTableItem}
      />
    ),
    [!!!deleteItemData == true]
  );


  return (
    <div id={styles.Table}>
      <div
        className={styles.TableDataStructure}
        style={{
          gridTemplateColumns: `repeat(${getColumnsNumber(
            props
          )},minmax(50px,auto))`,
        }}>
        {/* headers start */}
        {props.showIndex && (
          <div className={`${styles.table_header} ${styles.firstRow}`}>
            <p>#</p>
          </div>
        )}
        {props.titles.map((item, index) => (
          <div
            key={item}
            className={`${styles.table_header} ${
              styles[getClassStyleForTableRow(index, props)]
            }`}
            onClick={() => setSearchIndex(index)}>
            <p>{item}</p>
          </div>
        ))}
        {!!props.showAction && (
          <div className={`${styles.table_header} ${styles.lastRow}`}>
            <p>Actions</p>
          </div>
        )}

        {/*row cells */}
        {!!tableData &&
          tableData.data.map((item, rowIndex) => (
            <>
              {/* Index (optional) */}
              {props.showIndex && (
                <div
                  key={rowIndex}
                  className={`${styles.table_cell} ${styles.firstRow}`}>
                  <p>
                    {getIndexRow(
                      rowIndex,
                      tableData.currentPage,
                      props.rowCount
                    )}
                  </p>
                </div>
              )}

              {/* cell data */}
              {props.paths.map((objectKey, index) => (
                <div
                  key={index}
                  className={`${styles.table_cell} ${
                    styles[getClassStyleForTableRow(index, props)]
                  }`}>
                  <p>{applyStyleToValue(item[objectKey], index, props)}</p>
                </div>
              ))}

              {/* Action (optional) */}
              {props.showAction && (
                <div
                  key={"action" + rowIndex}
                  className={`${styles.table_cell} ${styles.lastRow}`}>
                  <p>
                    <Actions
                      onEdite={props.showAction.onEdit}
                      onDelete={setDeleteItemData}
                      item={item}
                    />
                  </p>
                </div>
              )}
            </>
          ))}
      </div>
      {searchIndex == null && memoizedPagination}
      {memoizedDeleteArticleModal}
      {searchIndex != null ? (
        <SearchBox
          apiData={props}
          getFilteredData={(filteredData) =>
            setTableData({ ...tableData, data: filteredData })
          }
          indexSelected={searchIndex}
          clearIndexSelected={setSearchIndex}
        />
      ) : null}
    </div>
  );
}
