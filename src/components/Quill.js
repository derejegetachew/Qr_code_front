import React from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css';
const Quill = (props) => {
    const theme = props.snow;
    const modules = props.modules;
    const formats =props.formats;
    
    const { quillRef } = useQuill(modules, formats,theme);
    return (
          <div id={props.id} ref={quillRef} />
      )
}

export default Quill;