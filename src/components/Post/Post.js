import { Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  post: {
    margin: '0px 25px 40px 25px',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '2rem',
  },
  postInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
  },
  link: {
    textDecoration: 'none',
  },
  postTitle: {
    fontFamily:'courier new' || 'cursive',
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
    fontFamily:'Shadows Into Light',
  }
}));

const Post = ({post}) => {
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <div className={classes.postInfo}>
        <Link to={`/post/${post.id}`} className={classes.link}>
          <span className={classes.postTitle}>{post.title}</span>
        </Link>
      </div>
      <p className={classes.postDesc}>{post.body}</p>
    </div>
  )
}
export default Post;