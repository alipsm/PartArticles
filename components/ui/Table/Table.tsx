import React, { useEffect, useState } from "react";
import { tableInterface } from "./types/tableInterface";
import Actions from "./utils/actions/Actions";
import Pagination from "./utils/pagination/Pagination";
import styles from "./_style.module.scss";

const { getColumnsNumber } = require("./utils/CalculateColumns.tsx");
const { applyStyleToValue } = require("./utils/applyStyleToValue.tsx");
const { checkPathsLenght } = require("./types/tableInterface.ts");

export default function Table(props: tableInterface) {

  if (!checkPathsLenght(props)) {
    console.warn(
      "عنوان ها با مسیر ها باید طول یکسانی داشته باشند \n لطفا به طول مقادیر دقت کنید"
      );
      return ;
    }
  
    const [tableData, setTableData] = useState(props.data)
    useEffect(() => {
      setTableData(props.data)
    }, [props.data.length])
    

  const getColumnCount = getColumnsNumber(props);
  const getStyleForRow = (index: number): string => {
    if (index == 0 && !props.showIndex) {
      return "firstRow";
    } else if (index == getColumnCount - (props.showIndex ? 2 : 1)) {
      return "lastRow";
    }
    return "";
  };

  return (
    <>

    <div
      id={styles.Table}
      style={{
        gridTemplateColumns: `repeat(${getColumnCount},minmax(50px,auto))`,
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
          className={`${styles.table_header} ${styles[getStyleForRow(index)]}`}>
          <p>{item}</p>
        </div>
      ))}
      {!!props.showAction && (
        <div className={`${styles.table_header} ${styles.lastRow}`}>
          <p>Actions</p>
        </div>
      )}

      {/*row cells */}
      {tableData.map((item, rowIndex) => (
        <>
          {/* Index (optional) */}
          {props.showIndex && (
            <div className={`${styles.table_cell} ${styles.firstRow}`}>
              <p>{rowIndex + 1}</p>
            </div>
          )}

          {/* cell data */}
          {props.paths.map((objectKey, index) => (
            <div
              key={index}
              className={`${styles.table_cell} ${
                styles[getStyleForRow(index)]
              }`}>
              <p>{applyStyleToValue(item[objectKey], index, props)}</p>
            </div>
          ))}


          {/* {Object.keys(item).map((objectKey, index) => (
            <div
              key={index}
              className={`${styles.table_cell} ${
                styles[getStyleForRow(index)]
              }`}>
              <p>{applyStyleToValue(item[objectKey],index,props)}</p>
            </div>
          ))} */}

          {/* Action (optional) */}
          {props.showAction && (
            <div className={`${styles.table_cell} ${styles.lastRow}`}>
              <p>
                <Actions
                  onEdite={props.showAction.onEdit}
                  onDelete={props.showAction.onDelete}
                  item={item}
                />
              </p>
            </div>
          )}
        </>
      ))}

    </div>
      <Pagination {...props}/>
    </>

  );
}
