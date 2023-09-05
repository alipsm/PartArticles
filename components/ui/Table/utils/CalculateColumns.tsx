import { tableInterface } from "../types/tableInterface";

function getColumnsNumber(params:tableInterface):number {
    const titleCount=params.titles.length
    const action = !!params.showAction?1:0
    const index = !!params.showIndex?1:0

    const totalCount=titleCount+action+index;
    return totalCount;
}

const getClassStyleForTableRow = (index: number,params:tableInterface): string => {
    const getColumnCount = getColumnsNumber(params);
  if (index == 0 && !params.showIndex) {
    return "firstRow";
  } else if (index == getColumnCount - (params.showIndex ? 2 : 1)) {
    return "lastRow";
  }
  return "";
};

module.exports={getColumnsNumber,getClassStyleForTableRow}