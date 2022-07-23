import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Card,
  FormControl,
  TextField,
  FormControlLabel,
  Switch,
  Autocomplete,
  Button,
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import BackDropLoader from '../../components/Loader/BackDropLoader';

import { styled } from '@mui/material/styles';
import PostEditForm from './PostEditForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/blog/blogSlice';

const UpdatePost = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getPostBySlug, post } = useSelector((state) => state.blog);

  let { slug } = useParams();

  useEffect(() => {
    if (location.state?.isPostCreated) {
      toast.info('useeffect', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [location]);

  useEffect(() => {
    dispatch(actions.getPostBySlugRequest({ slug }));
  }, []);

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
      <BackDropLoader open={getPostBySlug?.loading && false} />
      <ToastContainer />

      <Container maxWidth="lg">
        <Box sx={{ marginBottom: '40px' }}>
          <Box>
            <Box>
              <Typography variant="h4" component="div" gutterBottom>
                Edit post {slug}
              </Typography>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>
        <PostEditForm post={post} />
      </Container>
    </Box>
  );
};

export default UpdatePost;
