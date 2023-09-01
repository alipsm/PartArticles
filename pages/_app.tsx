import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/global.css";
import "../styles/style.css";
import '../styles/index.scss'
import {ToastifyContainer} from "../components/ui/Tooltip/ToastifyContainer";
import  { ToastProvider, useToast } from "../components/ui/Tooltip/ToolTipsContext";

export default function App({ Component, pageProps }: AppProps) {
  const [first, setfirst] = useState(0)
  
  return (
    <>
    <ToastProvider>
      <Component {...pageProps} />
      <ToastifyContainer  />
    </ToastProvider>
    </>
  );
}
