import { tableInterface } from "../types/tableInterface";

function getColumnsNumber(params:tableInterface):number {
    const titleCount=params.titles.length
    const action = !!params.showAction?1:0
    const index = !!params.showIndex?1:0

    const totalCount=titleCount+action+index;
    return totalCount;
}

module.exports={getColumnsNumber}