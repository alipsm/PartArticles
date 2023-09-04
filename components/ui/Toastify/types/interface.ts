interface toastInterface{
    text:string
    type:"Error"|"Success",
    showTimer?:number,
    position?:"TopLeft"|"TopRight"|"BottomLeft"|"BottomRight",
    index?:number
}
export type {toastInterface}