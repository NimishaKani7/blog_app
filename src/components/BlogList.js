import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Header from './Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  Container : {
    textAlign: 'center',
  },
  posts: {
    margin: '8rem 0 5rem 0',
  },
  Footer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5rem',
  }

}));

const BlogList = () => {
  const [pageCount, setPageCount] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [posts, setPosts] =useState([]);
  const pageLimit = 10;
  const classes = useStyles();

  const getPaginatedData = (pageNum = 1, dataArr = []) => {
    const from = (pageNum - 1) * pageLimit;
    const blogData = !isEmpty(posts) ? posts : dataArr;
    const data = blogData.slice(from, from + pageLimit);
    setPaginatedData(data);
  }
  const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const pages = Math.round(data.length / pageLimit);
    setPageCount(pages);
    getPaginatedData(1, data);
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  const handleChange = (e, value) => {
    getPaginatedData(value);
  }
  return (
    <div className={classes.Container}>
      <div><Header /></div>
      <Container maxWidth="md" className="Container__Body">
        <Box sx={{ height: 'auto' }}>
          <div className={classes.posts}>
            {paginatedData.map((p) => (
              <Post post={p} key={p.id} />
            ))}
          </div>
        </Box>
        <div className={classes.Footer}>
          <Stack spacing={2}>
            <Pagination count={pageCount} onChange={handleChange} />
          </Stack>
        </div>

      </Container>
    </div>
  )
}

export default BlogList;