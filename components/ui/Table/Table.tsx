import React, { useMemo, useState } from "react";
import { tableInterface } from "./types/tableInterface";
import styles from "./_style.module.scss";

import DeleteArticleModal from "./components/modal/Modal";

const {
  getColumnsNumber,
  getClassStyleForTableRow,
} = require("./utils/CalculateColumns.tsx");
const { applyStyleToValue } = require("./utils/applyStyleToValue.tsx");
const { checkPathsLenght } = require("./types/tableInterface.ts");
const { getIndexRow } = require("./utils/getIndexRow");
const { Actions } = require("./components/actions/Actions");
const {SearchBox} = require("./components/searchBox/SearchBox");
const {
  getObjectValueWithStringPath,
} = require("./utils/pathHandler/getObjectWithStringPath.tsx");
const { Pagination } = require("./components/pagination/controller.tsx");


Table.defaultProps={
  rowCount:5
}

export default function Table(props: tableInterface) {
  if (!checkPathsLenght(props)) {
    console.warn(
      "عنوان ها با مسیر ها باید طول یکسانی داشته باشند \n لطفا به طول مقادیر دقت کنید"
    );
    return;
  }

  // useEffect(() => {
  //   if (props.data.length!=0&&tableData.data.length==0) {
  //     setTableData({...tableData,data:props.data})
  //   }
  // }, [props.data])
  
  // handle default props value
  


  const [tableData, setTableData] = useState({
    data: [],
    currentPage: 1,
  });
  const [deleteItemData, setDeleteItemData] = useState(null);
  const [searchIndex, setSearchIndex] = useState(null);

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
        showPagination={props.showPagination}
      />
    ),
    [props.data?.length, searchIndex]
  );
  const memoizedDeleteArticleModal = useMemo(
    () => (
      <DeleteArticleModal
        articleTitle={getObjectValueWithStringPath(
          deleteItemData,
          props.showAction?.titlePath
        )}
        onClose={setDeleteItemData}
        showModal={!!deleteItemData}
        onDelete={handleDeleteTableItem}
      />
    ),
    [!!deleteItemData == true]
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
          tableData.data?.map((item, rowIndex) => (
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
              {props.paths.map((stringOrJSX, index) => (
                <div
                  key={index}
                  className={`${styles.table_cell} ${
                    styles[getClassStyleForTableRow(index, props)]
                  }`}>
                    <p>{applyStyleToValue(item,stringOrJSX, index, props)}</p>  
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

      {/* more option for example : pagination, actions, quickSearch*/}
      {(props.quickSearch && Number.isInteger(searchIndex)) ||
        memoizedPagination}
      {memoizedDeleteArticleModal}
      {props.quickSearch && searchIndex != null ? (
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
