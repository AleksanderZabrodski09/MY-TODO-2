import React, {FC} from 'react';
import {Button} from '@mui/material';

type ButtonFilterUC = {
  title: string
  onClick: () => void
  variant: 'text' | 'outlined' | 'contained'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  size: 'small' | 'medium' | 'large'
}
export const ButtonUC: FC<ButtonFilterUC> = (props) => {
  return <Button onClick={props.onClick}
    // className='buttonFilter'
                 variant={props.variant}
                 color={props.color}
                 size={props.size}
  >{props.title}
  </Button>

}