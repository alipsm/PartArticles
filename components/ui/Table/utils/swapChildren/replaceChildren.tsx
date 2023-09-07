import React from "react";
function replaceChildren(
    element: JSX.Element,
    setInnerChild: JSX.Element,
    indexChild: number
  ) {
    var updateChildren;

    if(!!!element.props["children"]){
      updateChildren=React.cloneElement(element,{},setInnerChild)
      return updateChildren
    }

    // element is object (exist of one element)
    if(!Array.isArray(element.props["children"])){
      updateChildren=React.cloneElement(element.props["children"],{},setInnerChild)
      return updateChildren
    }

    // element is array (the exist of several elements)
    updateChildren = React.Children.map(
      element.props["children"],
      (child, index) => {
        if (index === indexChild) {
          const replacementTag = <span>{setInnerChild}</span>;
          return replacementTag;
        }
        // return child;
      }
    );
    return <>{updateChildren}</>;
  }

  module.exports={replaceChildren}