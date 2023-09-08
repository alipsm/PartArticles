import React from 'react'
import ButtonUI from '../../../elements/button/ButtonUI'
import InputUI from '../../../elements/input/InputUI'
import styles from './_style.module.scss'

function EditForm({
    onSubmitForm,
    setInputError = { name: "", text: "" },
    isLoading=false
}) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const objFormData = Object.fromEntries(formData.entries());
        if (!!onSubmitForm) onSubmitForm(objFormData);
      };

  return (
    <form onSubmit={handleSubmit}>
    <InputUI
      title="Title"
      name="title"
      placeholder="Article Title"
      error={setInputError}
      require
    />
    <br />
    <br />
    <br />
    <InputUI
      title="Description"
      name="description"
      placeholder="Article Description"
      error={setInputError}
      require
    />
    <br />
    <br />
    <br />
    <InputUI
      title="Body" 
      name="body"
      placeholder="Article Description"
      inputType="TextArea"
      error={setInputError}
      require
    />
  <ButtonUI text="Edit Article" classes={styles.createArticleBtn} disable={isLoading}/>
  </form>
  )
}

module.exports={EditForm}