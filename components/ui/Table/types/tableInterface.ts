 type PathItems=string|JSX.Element
 interface tableInterface {
    titles: string[];
    data: object[];
    paths:PathItems[]
    showIndex?: boolean;
    showAction?: { onEdit: Function; onDelete: Function; titlePath:string};
    setTagStyleForColumn?: number ;
    setDateFormatForColumn?: number ;
    rowCount: number;
    quickSearch?:boolean;
    showPagination?: boolean;
  }

  

  function checkPathsLenght(tableData) {
    return tableData.titles?.length === tableData.paths?.length
  }

  export type {tableInterface}
  module.exports={checkPathsLenght}