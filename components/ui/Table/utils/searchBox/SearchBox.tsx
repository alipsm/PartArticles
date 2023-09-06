import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./_styles.module.scss";
import searchPicture from "./img/search.png";
import closePicture from "./img/close.png";
import { tableInterface } from "../../types/tableInterface";
const { getObjectValueWithStringPath } = require("../pathHandler/getObjectWithStringPath");

export default function SearchBox({
  apiData = null as tableInterface,
  indexSelected = 0,
  clearIndexSelected,
  getFilteredData,
}) {
  if (isNaN(indexSelected)) return null;

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    return () => {
      getFilteredData(apiData.data);
    };
  }, []);

  function filterApiData() {
    var innerFilteredData = [];
    apiData.data.forEach((element) => {
      let myValue: string = getObjectValueWithStringPath(
        element,
        apiData.paths[indexSelected]
      );
      if (Array.isArray(myValue)) {
        let checkArray = myValue.findIndex((item:string) => item.includes(inputValue));
        if (checkArray>=0) {
          innerFilteredData.push(element);
        }
      } else if (myValue.includes(inputValue)) {
        innerFilteredData.push(element);
      }
    });
    getFilteredData(innerFilteredData);
  }

  return (
    <div id={styles.SearchBox}>
      <Image
        src={searchPicture}
        alt="search"
        width={30}
        onClick={() => filterApiData()}
      />
      <input
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder={apiData.titles[indexSelected]}
        name=""
        id=""
      />
      <Image
        src={closePicture}
        alt="close"
        width={15}
        onClick={() => clearIndexSelected(null)}
      />
    </div>
  );
}
module.exports={SearchBox}