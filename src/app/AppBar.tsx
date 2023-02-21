import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useAppSelector} from './store';


export default function ButtonAppBar() {
  const status=useAppSelector(store=>store.app.status)
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu/>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      {status==='loading' && <LinearProgress color="secondary"/>}
    </AppBar>
  );
}

