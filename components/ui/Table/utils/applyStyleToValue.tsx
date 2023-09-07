import React, { ReactElement } from "react";
import { tableInterface } from "../types/tableInterface";

const { Tags } = require("../components/tags/Tags.tsx");
const { convertDateFormat } = require("./convertDate/convertDateFormat");
const {
  getObjectValueWithStringPath,
} = require("./pathHandler/getObjectWithStringPath");
const {getUpdateJsxWithPathData} = require("./swapChildren/getUpdateJsxWithPathData")

function applyStyleToValue(
  item: "" | [] | ReactElement,
  stringOrJSX: string | JSX.Element,
  index: 0,
  props: tableInterface
) {

  if (typeof stringOrJSX != "string") {
    const myTag=getUpdateJsxWithPathData(stringOrJSX,item)
    return myTag
  }

  const getObjectValue = getObjectValueWithStringPath(item, stringOrJSX);
  if (index + 1 == props.setTagStyleForColumn) {
    return <Tags data={getObjectValue} />;
  } else if (index + 1 == props.setDateFormatForColumn) {
    return convertDateFormat(getObjectValue);
  }
  return getObjectValue;
}



module.exports = { applyStyleToValue };
