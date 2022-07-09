import React from 'react';

import { useQuill } from 'react-quilljs';
// or const { useQuill } = require('react-quilljs');

import './quill.snow.css'; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

const Quill = () => {
  const theme = 'snow';
  // const theme = 'bubble';

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],

      ['link', 'image', 'video'],
    ],
  };

  const placeholder = 'Write Something Awesome.....';

  const { quillRef } = useQuill({ theme, modules, placeholder });

  return <div ref={quillRef} />;
};

export default Quill;
