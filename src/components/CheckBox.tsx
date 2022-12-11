import React, {ChangeEvent} from 'react';

export const CheckBox = ({checked, callBack}: { checked: boolean, callBack: (checked: boolean) => void }) => {
  const callBackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return <input
    type="checkbox"
    checked={checked}
    onChange={callBackHandler}
  />
}