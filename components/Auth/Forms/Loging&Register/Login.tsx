import Link from "next/link";
import React from "react";
import ButtonUI from "../../../elements/button/ButtonUI";
import InputUI from "../../../elements/input/InputUI";
import styles from "./_styles.module.scss";

export default function LoginForm({
  onSubmitForm,
  setInputError = { name: "", text: "" },
  isLoading=false
}) {
  const { Header } = require("./Header.tsx");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const objFormData = Object.fromEntries(formData.entries());
    if (!!onSubmitForm) onSubmitForm(objFormData);
  };

  return (
    <div id={styles.LoginForm}>
      <Header title="Login" description="Enter using your email and password" />
      <form onSubmit={handleSubmit}>
        <InputUI
          title="Email"
          placeholder="Email"
          classes={styles.textInput}
          name="email"
          error={setInputError}
          type={"email"}
          require
        />
        <InputUI
          title="Password"
          placeholder="Password"
          classes={styles.textInput}
          name="password"
          error={setInputError}
          type={"password"}
          require
        />
        <ButtonUI text="Login" disable={isLoading} fullWidth/>
        <br />
        <Link href={"register"}>
          <ButtonUI text="Register" type="Secondary" fullWidth/>
        </Link>
      </form>
    </div>
  );
}
