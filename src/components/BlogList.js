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
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  Container : {
    textAlign: 'center',
    background: `#ebeef0`,
    backgroundRepeat: 'repeat',
    backgroundSize: '100%',
    padding: '8rem 0 5rem 0'
  },
  posts: {
    margin: '0 0 0 0',
  },
  Footer: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5rem',
  },
  EmptyData: {
    fontFamily:  'Shadows Into Light',
    fontSize: '2rem',
  }

}));

const BlogList = () => {
  const { searchStr } = useSelector((state) => state.blog)
  const [pageCount, setPageCount] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [posts, setPosts] =useState([]);
  const pageLimit = 10;
  const classes = useStyles();
  const [filteredPost, setFilteredPost] = useState([]);
  const getPaginatedData = (pageNum = 1, dataArr = []) => {
    const from = (pageNum - 1) * pageLimit;
    const blogData = !isEmpty(dataArr) ? dataArr : searchStr ? filteredPost : posts;
    const data = blogData.slice(from, from + pageLimit);
    setPaginatedData(data);
  }
  const getPageCount = (data) => { return Math.round(data.length / pageLimit); }
  const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const pages = getPageCount(data)
    setPageCount(pages);
    getPaginatedData(1, data);
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    const filteredData = posts.filter(item => {
      if(item.title.toLowerCase().includes(searchStr.toLowerCase())) {
        return item;
      }
    });
    const pages = getPageCount(filteredData);
    setFilteredPost(filteredData)
    setPageCount(pages);
    getPaginatedData(1, filteredData);
  },[searchStr])
  const handleChange = (e, value) => {
    getPaginatedData(value);
  }
  return (
    <div className={classes.Container}>
      <div><Header search={true} /></div>
      <Container maxWidth="md" className="Container__Body">
        <Box sx={{ height: 'auto' }}>
          <div className={classes.posts}>
            {paginatedData.map((p) => (
              <Post post={p} key={p.id} />
            ))}
          </div>
        </Box>
        <div className={classes.Footer}>
          {!isEmpty(paginatedData) ? (
            <Stack spacing={2}>
            <Pagination count={pageCount} onChange={handleChange} />
          </Stack>
          ): (
            <div className={classes.EmptyData}> No data Found </div>
          )}
          
        </div>
      </Container>
    </div>
  )
}

export default BlogList;