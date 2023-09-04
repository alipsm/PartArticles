import React, { useMemo } from "react";
import styles from "./_style.module.scss";

function Tags({ data }) {
  if (data.length == 0 && !!data) return null;

  const mySliceData = data.slice();

  const momeizedTags = useMemo(
    () => (
      <div id={styles.Tags}>
        <div
          className={styles.first}
          style={{
            backgroundColor: `rgb(${Math.floor(
              Math.random() * 255
            )},${Math.floor(Math.random() * 255)},${Math.floor(
              Math.random() * 255
            )})`,
          }}>
          {mySliceData[0]}
        </div>
        <div className={styles.more}>{mySliceData.length - 1}</div>
      </div>
    ),
    [data]
  );

  return momeizedTags;
}

module.exports = { Tags };
