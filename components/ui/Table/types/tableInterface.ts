 interface tableInterface {
    titles: string[];
    data: object[];
    paths:string[]
    showIndex?: boolean;
    showAction?: { onEdit: Function; onDelete: Function; titlePath:string};
    setTagStyleForColumn?: number ;
    setDateFormatForColumn?: number ;
    rowCount?: number;
    pagination?: boolean;
  }

  function checkPathsLenght(tableData) {
    
    return tableData.titles?.length === tableData.paths?.length
  }

  export type {tableInterface}
  module.exports={checkPathsLenght}