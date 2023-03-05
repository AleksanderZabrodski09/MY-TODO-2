import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {AppDispatch, useAppSelector} from '../../app/store';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';

export const Login = () => {

  const dispatch=AppDispatch()
  const isLoggedIn= useAppSelector((state)=>state.auth.isLoggedIn)

  type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      // console.log('RENDER')
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'

      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
        // errors.password = 'Invalid password'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password, length must be more 2 symbols'
      }

      return errors
    },
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(loginTC(values))
      formik.resetForm()
    },
  });
  // console.log(formik.errors)

  if(isLoggedIn){
    return <Navigate to={'/'} />
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>To log in get registered
            <a href={'https://social-network.samuraijs.com/'}
               target={'_blank'}> here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps('email')}
              // name='email'
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ?
              <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            <TextField type="password"
                       label="Password"
                       margin="normal"
                       {...formik.getFieldProps('password')}
              // name='password'
              // onChange={formik.handleChange}
              // value={formik.values.password}
              // onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password &&
              <div style={{color: 'red'}}>{formik.errors.password}</div>}
            <FormControlLabel label={'Remember me'} control={
              <Checkbox
              checked={formik.values.rememberMe}
              {...formik.getFieldProps('rememberMe')}
              // name='rememberMe'
              // onChange={formik.handleChange}
              // checked={formik.values.rememberMe}
            />}/>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  </Grid>
}