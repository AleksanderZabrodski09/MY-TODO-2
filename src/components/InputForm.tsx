import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

export const InputForm = ({addInput}: { addInput: (title: string) => void }) => {

  const [title, setTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const addInputForm = () => {
    if (title.trim() !== '') {
      addInput(title.trim())
      setTitle('')
    } else {
      setError('Title required')
    }
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addInputForm()
    }
    setError('')
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return <div>
    <TextField
      variant="filled"
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      // className={error ? 'error' : ''}
      error={!!error}
      helperText={error}

    />
    <Button
      onClick={addInputForm}
      color='secondary'
    ><AddToPhotosIcon/>
    </Button>
    {/*{error && <div className={'errorMessage'}>{error}</div>}*/}
  </div>
}