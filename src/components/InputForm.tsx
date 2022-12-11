import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    <input
      value={title}
      onChange={onChangeHandler}
      onKeyPress={onKeyPressHandler}
      className={error ? 'error' : ''}
    />
    <button onClick={addInputForm}>+</button>
    {error && <div className={'errorMessage'}>{error}</div>}
  </div>
}