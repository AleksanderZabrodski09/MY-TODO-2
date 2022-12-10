import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from '@mui/material';
import PlusOneTwoToneIcon from '@mui/icons-material/PlusOneTwoTone';

export const AddItemForm = ({addItem}: { addItem: (newTitle: string) => void }) => {

  const [newTitle, setNewTitle] = useState('')
  const [error, setError] = useState<null | string>('')

  const addItemHandler = () => {
    if (newTitle.trim() !== '') {
      addItem(newTitle.trim())
      setNewTitle('')
    } else {
      setError('title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler()
    }
    setError(null)
  }

  return <div>
    <input
      value={newTitle}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      className={error ? 'error' : ''}
    />
    <Button
      onClick={addItemHandler}
      variant='outlined'
      color='error'
      style={{maxWidth: '30px', maxHeight: '25px', minWidth: '30px', minHeight: '25px'}}
    > <PlusOneTwoToneIcon/></Button>
    {error && <div className='errorMessage'>{error}</div>}
  </div>

}