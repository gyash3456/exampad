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
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/blog/blogSlice';
import { useFormik, Form, FormikProvider } from 'formik';
import Editor from 'src/components/editor/Editor';

const ContentDiv = styled('div')({
  margin: '24px 0 0',
  '& .MuiTypography-root': {
    margin: '0px 0px 8px',
    fontWeight: 600,
    lineHeight: 1.57143,
    fontSize: '0.875rem',
    fontFamily: '"Public Sans", sans-serif',
    color: 'rgb(99, 115, 129)',
  },
});

const ControlDiv = styled('div')({
  '& .MuiFormControlLabel-root': {
    margin: '0px 0px 8px 0px',
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
});

const SubmitButtonDiv = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '24px',
});

const PostEditForm = (props) => {
  const { post } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: post?.title,
      description: '',
      content: post?.content,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      //dispatch(actions.updatePostRequest(slug));
      //dispatch(actions.createPostRequest(values));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container sx={{ flexFlow: 'row wrap' }} spacing={3}>
        <Grid item xs={12} md={8} sx={{ padding: '24px 0 0 24px' }}>
          <Card elevation={0} sx={{ padding: '24px' }}>
            <div>
              <FormControl fullWidth>
                <TextField name="title" label="Post Title" onChange={formik.handleChange} value={formik.values.title} />
              </FormControl>
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField
                  rows={3}
                  multiline
                  label="Description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </FormControl>
              <ContentDiv>
                <Typography>Content</Typography>
                <div>
                  <Box>
                    <Editor formik={formik} />
                  </Box>
                </div>
              </ContentDiv>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ padding: '24px 0 0 24px' }}>
          <Card elevation={0} sx={{ padding: '24px' }}>
            <div>
              <ControlDiv>
                <FormControlLabel
                  value="Publish"
                  control={<Switch color="primary" />}
                  label="Publish"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="Enable comments"
                  control={<Switch color="primary" />}
                  label="Enable comments"
                  labelPlacement="start"
                />
              </ControlDiv>
              <Autocomplete
                multiple
                sx={{ marginTop: '24px' }}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Tags" placeholder="Tags" />}
              />
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField label="Meta title" />
              </FormControl>
              <FormControl sx={{ marginTop: '24px' }} fullWidth>
                <TextField rows={3} multiline label="Meta description" />
              </FormControl>
              <Autocomplete
                multiple
                sx={{ marginTop: '24px' }}
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} label="Meta keywords" placeholder="Meta keywords" />}
              />
            </div>
          </Card>
          <SubmitButtonDiv>
            <Button variant="outlined" size="large" fullWidth>
              Preview
            </Button>
            <Button type="submit" variant="contained" size="large" sx={{ margin: '0px 0px 0px 12px' }} fullWidth>
              Post
            </Button>
          </SubmitButtonDiv>
        </Grid>
      </Grid>
    </form>
  );
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];
export default PostEditForm;
