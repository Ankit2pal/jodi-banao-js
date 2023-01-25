import React from 'react';
import { useDropzone } from 'react-dropzone';
import { any } from 'prop-types';
function Dropzone({ onDrop, accept, open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept,
    onDrop
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">Drop your image here,or</p>
          )}
          <button type="button" onClick={open} className="btn">
            browse
          </button>
          <aside>
            <ul>{files}</ul>
          </aside>
        </div>
        <div className="file-list"></div>
      </div>
    </div>
  );
}
Dropzone.propTypes = {
  onDrop: any,
  accept: any,
  open: any
};
export default Dropzone;
