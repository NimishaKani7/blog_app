import { AppBar, Toolbar } from '@mui/material';
import './Header.scss';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSelector, useDispatch } from "react-redux";
import { SetSearchStr } from '../../Redux/Actions';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  Toolbar: {
    width: '55%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  h2: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Shadows Into Light',
    textShadow: '-2px -2px 2px gray',
  },
  Search: {
    cursor: 'pointer',
    paddingLeft: '1rem'
  },
  Search_Container: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  Search_Wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },

  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header = ({search = true, home = false}) => {
  const classes = useStyles();
  const { searchStr} = useSelector((state) => state.blog);
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(SetSearchStr(value));
  }
  const handleClick = (e) => {
    navigate('/blog_app');
    home = false;
  }
  return (
    <div className="header">
      <ThemeProvider theme={darkTheme}>
        <AppBar postion="static" className={classes.appBar}>
          <Toolbar className={classes.Toolbar}>
            {!home ? (<Typography variant="h2" className={classes.h2} style={{ fontFamily: "Shadows Into Light" }}>
              Blog
            </Typography>): (
              <Typography className={classes.backButton} onClick={handleClick}>
              <ArrowBackIosNewOutlinedIcon /> 
              Back
              </Typography>
              
            )}
            {search ? (
              <div className={classes.Search_Container}>
              <div className={classes.SearchBar} >
                <Search >
                  <div className={classes.Search_Wrapper} >
                    <SearchOutlinedIcon className={classes.Search}  />
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={((e) => handleChange(e.target.value))}
                    />
                  </div>
                </Search>
              </div>
            </div>
            ) : ''}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Header;