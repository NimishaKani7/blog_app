import axios from "axios";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MouseOverPopover from '../PopOver/PopOver';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useParams } from "react-router-dom";
import { FetchAuthor, FetchPostDetails, SetLoader } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../Comments/Comments";
import Loader from '../Loader/Loader';
import { makeStyles } from '@mui/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Header from "../Header/Header";


const useStyles = makeStyles(() => ({
  SinglePost__Container: {
    padding: '5% 10%',
  },
  Loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  Header: {
    padding: '2rem',


  },
  h1: {
    fontFamily: 'Shadows Into Light',
    textTransform: 'capitalize',
  },
  p: {
    fontFamily: 'The Nautigal' || 'cursive',
    fontSize: '2rem',
    margin: '0'
  },
  Body: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '3rem',
  },
  text_wrapper: {
    margin: '0 2rem',
    textAlign: 'left',
    fontFamily: 'Shadows Into Light',
  },
  Icons: {
    marginBottom: '2rem',
    display: 'flex',
    paddingRight: '2rem',
    justifyContent: 'flex-end',
    gap: '1rem'
  },
  Like: {
    cursor: 'pointer',
  },
  Comment: {
    cursor: 'pointer',
  },
  Share: {
    cursor: 'pointer',
  },

}));

const SinglePost = () => {
  const classes = useStyles();
  const postDetails = useSelector((state) => state.blog.singlePost);
  const authorDetails = useSelector((state) => state.blog.author);
  const { isFetching } = useSelector(state => state.blog);
  const { postId } = useParams();
  const dispatch = useDispatch();

  const fetchPost = async (postId) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
    const response = await axios.get('https://randomuser.me/api/');
    const user = response.data.results ? response.data.results[0] : {};
    dispatch(FetchPostDetails(data));
    dispatch(FetchAuthor(user));
  }

  useEffect(() => {
    dispatch(SetLoader(true));
    fetchPost(postId);
  }, []);

  return (
    <div className={classes.SinglePost__Container}>
      <Header search={false} home={true} />
      {isFetching ? (
        <div className={classes.Loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 'auto',
              },
            }}
          >
            <Paper elevation={3}>
              <div className={classes.Header}>
                <h1 className={classes.h1}>{postDetails.title}</h1>
                <p className={classes.p}>- {authorDetails.name ? authorDetails.name.first : ''} {authorDetails.name ? authorDetails.name.last : ''}</p>
              </div>
              <div className={classes.Body}>
                <MouseOverPopover author={authorDetails} />
                <div className={classes.text_wrapper}>
                  <LoremIpsum p={2} />
                </div>
              </div>
              <div className={classes.Icons} >
                <FavoriteBorderIcon className={classes.Like} />
                <CommentOutlinedIcon className={classes.Comment} />
                <ShareOutlinedIcon className={classes.Share} />
              </div>
            </Paper>
          </Box>
          <Comments postId={postId} />
        </div>
      )}
    </div>
  )
}

export default SinglePost;