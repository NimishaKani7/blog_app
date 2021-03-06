import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  Popover: {
    margin: '2rem 0 0 2rem',
  },
  AuthorImage: {
    borderRadius:'50%',
    border: '1px solid #444',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)'
  },
  AuthorInfo: {
    fontSize: '0.75rem',
  }
}));


export default function MouseOverPopover({author = {}}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const image = author.picture ? author.picture.large : '';
  return (
    <div className={classes.Popover}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.author}
      >
       <img src={image} className={classes.AuthorImage}/>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>
          <p  className={classes.AuthorInfo}>{author.email} </p>
          <p  className={classes.AuthorInfo}>{author.phone} </p>
        </Typography>
      </Popover>
    </div>
  );
}
