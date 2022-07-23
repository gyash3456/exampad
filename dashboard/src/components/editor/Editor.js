import React, { useEffect } from 'react';

import ReactQuill from 'react-quill';

import './quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const Editor = (props) => {
  const { formik } = props;

  return (
    <ReactQuill theme="snow" value={formik.values.content || ''} onChange={(e) => formik.setFieldValue('content', e)} />
  );
};

export default Editor;
