import React from 'react'
import { tableInterface } from '../types/tableInterface'

const {Tags} = require("./tags/Tags.tsx")
const {convertDateFormat} = require('./convertDate/convertDateFormat')

function applyStyleToValue(item:""|[],index:0,props:tableInterface) {
    if (index+1==props.setTagStyleForColumn) {
        return <Tags data={item}/>
    }else if(index+1==props.setDateFormatForColumn){
      return convertDateFormat(item)
    }
  return (item )
}

module.exports={applyStyleToValue}