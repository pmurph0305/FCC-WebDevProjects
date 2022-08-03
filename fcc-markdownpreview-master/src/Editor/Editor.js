import React from 'react';
import './Editor.css'


const Editor = ({markdownText, onChange}) => {
  return (
    <div className="editor-container">
      <label className="editor-label" htmlFor="editor">Markdown Editor</label>
      {/* User Story #1: I can see a textarea element with a corresponding id="editor". */}
      <textarea 
        id="editor" 
        className="editor-textarea" 
        onChange={onChange} 
        value={markdownText}
      >
      </textarea>
    </div>
  )
}

export default Editor;