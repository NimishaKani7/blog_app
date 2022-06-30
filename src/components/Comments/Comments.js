import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchComments } from "../../Redux/Actions";
// import './Comments.scss';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(() => ({

  h1: {
    fontFamily: 'The Nautigal' || 'cursive',
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  Container: {
    textAlign: 'left',
    padding: '2rem',
  },
  Content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  Add: {
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  Send: {
    cursor: 'pointer',
  },
  sendIcon: {
    marginLeft: '-5%',
  },
  Name: {
    fontWeight: '400',
    fontSize: '1.5rem',
    textTransform: 'capitalize',
    fontFamily: 'Shadows Into Light' || 'cursive',
  },
  Body: {
    fontFamily:'Shadows Into Light'
  },
  Input: {
    fontFamily: 'The Nautigal'
  }
}));

const Comments = ({ postId }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [isDisplayButtons, setDisplayButtons] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSucessful, setSucessful] = useState(false);
  const fetchComments = async () => {
    let concatedArray = [];
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

    if (JSON.parse(localStorage.getItem(postId)) !== null) {
      const commentsLocalStorage = JSON.parse(localStorage.getItem(postId));
      concatedArray = data.concat(commentsLocalStorage);
    } else {
      concatedArray = [...data];
    }

    setComments(concatedArray);
  }
  useEffect(() => {
    fetchComments();
  }, [commentText]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCommentText(value);
  }

  useEffect(() => {
    if (commentText) setDisplayButtons(true);
    else setDisplayButtons(false);
  }, [commentText]);

  const onSubmit = () => {
    const commentData = {
      id: comments.length + 1,
      postId: parseInt(postId),
      email: 'dummy@gmail.com',
      body: commentText,
    }
    let commentsLocalStorage = [];
    if (JSON.parse(localStorage.getItem(postId)) !== null) {
      commentsLocalStorage = JSON.parse(localStorage.getItem(postId));
    }
    commentsLocalStorage.push(commentData);
    localStorage.setItem(postId, JSON.stringify(commentsLocalStorage));
    setSucessful(true);
    setCommentText('');
  }

  return (
    <div className="Comments">
      <h1 className={classes.h1}>Comments</h1>
      <div className={classes.Container}>
        <div className={classes.Content}>
          <div className={classes.Add}>
            <AccountCircle />
            <TextField fullWidth
              id="input-with-icon-textfield"
              className={classes.Input}
              placeholder="Add your Comment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              variant="standard"
              onChange={handleChange}
            >
            </TextField>
            {isDisplayButtons ? (<div className={classes.Send}><SendIcon className={classes.sendIcon} onClick={onSubmit} /> </div>
            ) : ''}

          </div>
        </div>
        {comments && comments.map((c) => (
          <div className="Comments__Container__Comment" key={c.id}>
            <h4 className={classes.Name}>{c.name ? c.name : ''}</h4>
            <p className={classes.Body}>{c.body}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments;