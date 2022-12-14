import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

export const EditableSpan = ({value, callBack}: { value: string, callBack: (value: string) => void }) => {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  const activeEditMode = () => {
    setEditMode(true)
    setNewTitle(value)
  }
  const activeViewMode = () => {
    setEditMode(false)
    callBack(newTitle)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  return editMode
    ? <TextField
      variant='standard'
      value={newTitle}
      onChange={onChangeHandler}
      onBlur={activeViewMode}
      autoFocus
    />
    : <span onDoubleClick={activeEditMode}>{value}</span>
}