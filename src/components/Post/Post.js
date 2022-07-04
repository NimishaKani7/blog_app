import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const useStyles = makeStyles(() => ({
  post: {
    margin: '0px 25px 40px 25px',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '2rem',
    background: '#fff',
  },
  postInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
  postTitle: {
    fontFamily:'Shadows Into Light',
    fontSize: '24px',
    fontWeight: '700',
    marginTop: '15px',
    cursor: 'pointer',
    color: '#333',
    textDecoration: 'unset',
    textTransform: 'capitalize',
  },
  postDesc: {
    color: '#444',
    lineHeight: '24px',
    marginTop: '15px',
    textOverflow: 'ellipsis',
    // fontFamily: 'Shadows Into Light',
  },
  Icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1.5rem',
    color: '#444'
  },
  Share: {
    cursor: 'pointer',
  },
  BookMark: {
    cursor: 'pointer',
  },
  More: {
    cursor: 'pointer',
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <div className={classes.postInfo}>
        <Link to={`/post/${post.id}`} className={classes.link}>
          <span className={classes.postTitle}>{post.title}</span>
          <p className={classes.postDesc}>{post.body}</p>
        </Link>
      </div>
      <div className={classes.Icons}>
        <ShareOutlinedIcon className={classes.Share} />
        <BookmarkBorderIcon className={classes.BookMark} />
        <MoreHorizOutlinedIcon className={classes.More} />
      </div>
    </div>
  )
}
export default Post;