import React, { useEffect } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import BackDropLoader from '../../components/Loader/BackDropLoader';
import { styled } from '@mui/material/styles';
import PostEditForm from './PostEditForm';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/blog/blogSlice';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createPost, slug } = useSelector((state) => state.blog);

  useEffect(() => {
    if (createPost?.success && slug) {
      navigate('/admin/blog/edit/' + slug, { state: { isPostCreated: true } });
    }
  }, [slug]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      MUI
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/material-ui/getting-started/installation/">
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];

  return (
    <Box>
      <BackDropLoader open={createPost?.loading && false} />

      <Container maxWidth="lg">
        <Box sx={{ marginBottom: '40px' }}>
          <Box>
            <Box>
              <Typography variant="h4" component="div" gutterBottom>
                Create a new post
              </Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>
        <PostEditForm />
      </Container>
    </Box>
  );
};

export default CreatePost;
