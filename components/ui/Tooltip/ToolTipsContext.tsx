import React, { createContext, useContext, useState } from "react";

import type { toastInterface } from "./types/interface";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<toastInterface[]>([]);

  function onRemove(index: number) {
    const updateToasts = toasts.filter((e) => e.index != index);
    setToasts(updateToasts);
  }

  function showToast(params: {text:string,type:"Error"|"Success"}) {
    setToasts([...toasts,
      {
        text: params.text,
        type: params.type,
        index:Math.floor(Math.random()*100)
      },
    ]);
  }
  
  let removeTimer;
  if (toasts.length!=0) {
    removeTimer= setInterval(() => {
      setToasts(toasts.slice(1))
      !!toasts.length&&clearInterval(removeTimer)
    }, 3000);
  }
  return (
    <ToastContext.Provider value={{ toasts, setToasts, onRemove ,showToast}}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): {
  toasts: toastInterface[];
  setToasts: React.Dispatch<React.SetStateAction<toastInterface[]>>;
  onRemove: (index: number) => void;
  showToast:(params:toastInterface)=>void
} {
  return useContext(ToastContext);
}
