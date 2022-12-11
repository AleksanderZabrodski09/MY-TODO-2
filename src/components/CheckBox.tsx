import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';

export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const callBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return <Checkbox
    // type="checkbox"
    checked={checked}
    size='small'
    color='secondary'
    onChange={callBackHandler}
  />
}