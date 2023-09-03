 interface tableInterface {
    titles: string[];
    data: object[];
    paths:string[]
    showIndex?: boolean;
    showAction?: { onEdit: Function; onDelete: Function };
    setTagStyleForColumn?: number | number[];
    rowCount?: number;
    pagination?: boolean;
  }

  function checkPathsLenght(tableData) {
    
    return tableData.titles?.length === tableData.paths?.length
  }

  export type {tableInterface}
  module.exports={checkPathsLenght}