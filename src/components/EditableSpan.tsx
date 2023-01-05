import React, {ChangeEvent, useState, KeyboardEvent, memo} from 'react';
import {TextField} from '@mui/material';

export const EditableSpan = memo(({value,callback }: { value: string, callback:(newTitle:string)=>void }) => {

  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activeEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }
  const viewMode = () => {
    setEditMode(false)
    callback(title.trim())
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'){
      viewMode()
    }
  }

  return editMode
    ? <TextField
      variant='standard'
      color='secondary'
      value={title}
      onChange={onChangeHandler}
      onBlur={viewMode}
      onKeyPress={onKeyPressHandler}
      autoFocus
    />
    : <span onDoubleClick={activeEditMode}>{title}</span>
})