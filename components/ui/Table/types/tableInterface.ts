 interface tableInterface {
    titles: string[];
    data: object[];
    showIndex?: boolean;
    showAction?: { onEdit: Function; onDelete: Function };
    setTagStyleForColumn?: number | number[];
    rowCount?: number;
    pagination?: boolean;
  }

  export type {tableInterface}