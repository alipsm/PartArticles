import React from "react";
const { replaceChildren } = require("./replaceChildren.tsx");
const {
  getObjectValueWithStringPath,
} = require("../pathHandler/getObjectWithStringPath");

function getUpdateJsxWithPathData(element: JSX.Element, item: "" | []) {
  var getStringPath = element.props["data-path"];
  if (!!!getStringPath && element.props.children) {
    const getChildrenTag = element.props["children"];
    if (!Array.isArray(getChildrenTag) && typeof getChildrenTag == "object") {
      getStringPath = getChildrenTag.props["data-path"];
      if (!!getStringPath) {
        return handleReplaceChildren(element, item, getStringPath);
      }
    }else{
      var updatedChildrenList=[]
      for (let index = 0; index < getChildrenTag.length; index++) {
        getStringPath = getChildrenTag[index].props?.["data-path"];
        if (!!getStringPath) {
          updatedChildrenList.push(handleReplaceChildren(element.props["children"][index], item, getStringPath, index));
        }
      }
      return updatedChildrenList
    }
    return element;
  }


  
  return React.cloneElement(element, {
    children: getObjectValueWithStringPath(item, getStringPath),
  });
}

function handleReplaceChildren(
  element: JSX.Element,
  item: string | [],
  stringPath: string,
  index?: number
) {
  let apiPathData = getObjectValueWithStringPath(item, stringPath);
  let updateChildrenTag = replaceChildren(element, apiPathData, index);
  let updatedTag = React.cloneElement(element, {},updateChildrenTag);
  return updatedTag;
}

module.exports = { getUpdateJsxWithPathData };
