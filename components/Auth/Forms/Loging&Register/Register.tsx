import React, { useEffect, useRef } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

import ButtonUI from "../../../elements/button/ButtonUI";
import InputUI from "../../../elements/input/InputUI";
import styles from "./_styles.module.scss";

export default function RegisterForm({
  onSubmitForm,
  setInputError = { name: "", text: "" },
  isLoading=false
}) {
  const capRef = useRef(null);
  const { Header } = require("./Header.tsx");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const objFormData = Object.fromEntries(formData.entries());
    if (!!onSubmitForm) onSubmitForm(objFormData);
  };

  return (
    <div id={styles.RegisterForm}>
      <Header title="Sign Up" />
      <form onSubmit={handleSubmit}>
        <InputUI
          title="Username"
          placeholder="Username"
          classes={styles.textInput}
          name={"username"}
          error={setInputError}
          require
        />
        <InputUI
          title="Email"
          placeholder="Email"
          classes={styles.textInput}
          name={"email"}
          error={setInputError}
          require
        />
        <InputUI
          title="Password"
          placeholder="Password"
          classes={styles.textInpu1t}
          name={"password"}
          error={setInputError}
          require
        />
        <br />
        <ReCAPTCHA
          className={styles.recaptcha}
          sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
          name="captcha"
          ref={capRef}
        />
        <br />
        <ButtonUI text="Sign Up" disable={isLoading} fullWidth/>
        <br />
        <Link href={"login"}>
          <ButtonUI text="Login" type="Secondary" fullWidth/>
        </Link>
      </form>
    </div>
  );
}
