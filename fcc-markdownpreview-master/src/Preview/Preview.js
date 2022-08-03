import React from 'react';
import marked from 'marked';
import "./Preview.css"

const Preview = ({text}) => {

  // Optional Bonus (you do not need to make this test pass): When I click a link rendered by my markdown previewer, 
  //the link is opened up in a new tab (HINT: read the Marked.js docs for this one!).
  let renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    return `<a href=${href} target="_blank">${text}</a>`
  }

 

  // User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type 
  const getMarkup = () => {
    // Optional Bonus (you do not need to make this test pass): My markdown previewer interprets carriage returns and renders them as br (line break) elements.
    // done by replacing \r and \n with "  \n"
    let newLines = text.replace(/\n|\r|\r\n/gim, "  \n");
    return{__html: marked(newLines, {renderer: renderer})}
  }

  return (
    <div className="preview-container">
      <label htmlFor="preview" className="preview-label">Markdown Preview</label>
      {/* User Story #2: I can see an element with a corresponding id="preview". */}
  
       <div id="preview" className="preview-markdown" dangerouslySetInnerHTML={getMarkup()}></div>
 
    </div>
  )
}

export default Preview;