import React, { useEffect } from 'react';

import ReactQuill from 'react-quill';

import './quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const Editor = (props) => {
  const { formik } = props;

  const handleChange = (value) => {
    formik.setFieldValue('content', value);
  };
  return <ReactQuill theme="snow" onChange={handleChange} />;
};

export default Editor;
