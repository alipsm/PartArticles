import React from "react";
import inputStyles from "./_style.module.scss";

interface InputUiProps {
  title?: string;
  fullWidth?: boolean;
  error?: { name: string; text: string };
  require?: boolean;
  getInputValue?: Function;
  placeholder?: string;
  classes?: string;
  name: string;
  inputType?:"TextBox"|"TextArea"
  value?:string
}
export default function InputUI(props: InputUiProps) {
  return (
    <div
      id={inputStyles.InputUi}
      className={`${props.fullWidth && inputStyles.fullWidth} ${
        props.classes
      }`}>
      <Title text={props.title} error={props.error} inputName={props.name} require={props.require} />
      {props.inputType=="TextArea"?(
        <textarea
        
        name={props.name}
        className=""
        onChange={(e) => handleChange(props.getInputValue, e)}
        placeholder={props.placeholder}
        
        />
      ):(
      <input
       value={!!!props.value?props.value:null}
        type={"text"}
        name={props.name}
        className=""
        onChange={(e) => handleChange(props.getInputValue, e)}
        placeholder={props.placeholder}
      />
      )}
      <ErrorText error={props.error} inputName={props.name} />
    </div>
  );
}

const Title = ({ text, error, inputName, require }) => {
  if (!text) return null;
  return (
    <p className={`${inputStyles.title} ${isError({error,inputName}) ? inputStyles.error : ""}`}>
      {text}
      <span className={inputStyles.require}>{require && "*"}</span>
    </p>
  );
};

const ErrorText = ({ error, inputName }) => {
  if (!isError({ error, inputName })) return null;
  return <p className={inputStyles.errorText}>{error?.text}</p>;
};

const isError = ({ error, inputName }) => {
  if (!!!error || !!!error?.text || error?.name != inputName) {
    return false;
  } else return true;
};

// input action => onChange
const handleChange = (setValu, e) => {
  const text = e.target?.value;
  if (!setValu) return "";
  setValu(text);
};
