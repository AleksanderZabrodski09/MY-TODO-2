import React, {ChangeEvent} from 'react';
import {Checkbox} from '@mui/material';
import { pink } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const callBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return (
      <Checkbox
        // type="checkbox"
        {...label}
        defaultChecked
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600]
          },
        }}
        checked={checked}
        size='small'
        onChange={callBackHandler}/>
    )



}