import React, { useMemo } from "react";
import { ToastifyUi } from "./ToolTip";
import { useToast } from "./ToolTipsContext";
import tolStyles from "./_style.module.scss";

export function ToastifyContainer() {
  const { toasts } = useToast();

  const memoizedToasts = useMemo(() => {
    return (
      <div id={tolStyles.ToolTipContainer}>
        {toasts.map((item) => {
          console.log("item", item);
          return (
            <div key={item.index}>
              <ToastifyUi
                text={item.text}
                type={item.type}
                index={item.index}
              />{" "}
            </div>
          );
        })}
      </div>
    );
  }, [toasts]);
  return <div>{memoizedToasts}</div>;
}