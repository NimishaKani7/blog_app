import { AppBar, Toolbar } from '@mui/material';
import './Header.scss';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';



const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    alignItems: 'center',
  },
  h2: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Shadows Into Light',
    textShadow: '-2px -2px 2px gray',
  }
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});
const Header = () => {
  const classes = useStyles();
  return (
    <div className="header">
      <ThemeProvider theme={darkTheme}>
        <AppBar postion="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h2" className={classes.h2} style={{fontFamily: "Shadows Into Light"}}>
              Blog
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

    </div>
  )
}

export default Header;