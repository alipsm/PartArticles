import React, { useEffect, useState } from 'react'
import ButtonUI from '../../../../elements/button/ButtonUI'
import style from './_style.module.scss'
import addingPicture from './img/adding.png'
import closePicture from './img/close.png'
import InputUI from '../../../../elements/input/InputUI'
import Image from 'next/image'

export default function CreateTagBox({onChange}) {
    const [inputValue, setInputValue] = useState("")

    const [tags, setTags] = useState([])

    function addTag() {
        if(!!inputValue){

          setInputValue("")
          setTags([...tags,inputValue])
        }
    }
    function removeTag(text) {
        const filterTags=tags.filter(e=>e!=text)
        setTags(filterTags)
    }

    useEffect(() => {
      onChange(tags)
    }, [tags.length])
    

  return (
    <div id={style.CreateTagBox}>
      <h4>Tags</h4>
      <br/>
      <div className={style.box}>
        <header>
            <InputUI name='tag' getInputValue={setInputValue} value={inputValue}/>
            <ButtonUI onButtonClicked={addTag} image={{src:addingPicture,alt:"add"}} classes={style.addTagsBtn}/>
        </header>
        <main>
            {tags.map(item=>(
                <div className={style.tag}>
                    <span>{item}</span>
                    <div>
                        <Image src={closePicture} alt="close" width={10} onClick={()=>removeTag(item)}/>
                    </div>
                </div>
            ))}
        </main>

      </div>
    </div>
  )
}
