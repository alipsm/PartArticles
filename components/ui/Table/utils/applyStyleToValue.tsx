import React from 'react'
import { tableInterface } from '../types/tableInterface'

const {Tags} = require("./tags/Tags.tsx")

function applyStyleToValue(item:""|[],index:0,props:tableInterface) {
    if (index+1==props.setTagStyleForColumn) {
        console.group("apply style")
        console.log('object :>> ', props);
        console.log('index', index)
        console.log('item :>> ', item);
        console.groupEnd()
        return <Tags data={item}/>



    }
  return (item )
}

module.exports={applyStyleToValue}