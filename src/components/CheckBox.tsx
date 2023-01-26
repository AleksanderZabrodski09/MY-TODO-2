import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';
import {TaskStatuses} from '../api/todolist-api';

export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const callBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue=e.currentTarget.checked
    callBack(newIsDoneValue)
  }
  return <Checkbox
    // type="checkbox"
    checked={checked }
    size='small'
    color='secondary'
    onChange={callBackHandler}
  />
}