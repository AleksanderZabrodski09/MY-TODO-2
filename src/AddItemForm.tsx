import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

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
    <button onClick={addItemHandler}>+</button>
    {error && <div className='errorMessage'>{error}</div>}
  </div>

}