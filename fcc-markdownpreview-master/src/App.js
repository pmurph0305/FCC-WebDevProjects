import React from 'react';
import './App.css';

import Editor from './Editor/Editor';
import Preview from './Preview/Preview';

  /* User Story #5: When my markdown previewer first loads, 
  the default text in the #editor field should contain valid markdown that represents 
  at least one of each of the following elements: 
  a header (H1 size), 
  a sub header (H2 size),
   a link, 
   inline code, 
   a code block, 
   a list item, 
   a blockquote,
    an image, 
    and bolded text.
  */

const initialExample = `# Welcome to the markdown editor!
  ## Enter markdown in the editor to see the preview below!
  ### You can do all kinds of headings...
  You can also *emphasize* or **bold** things with asterisks.  
  You can put links in: [Like this one to FreeCodeCamp!](https://freecodecamp.org)
  \`inline code can also be written\` between backticks
  \`\`\`
  code blocks
  can also
  be written here
   \`\`\`
  >block quotes can come in handy too.

  1. lists can be made
  1. with numbers

  or
  * unordered lists
  * can be made
  * with asterisks
  You could even put images in if you want like this: ![image of a dog](https://i.pinimg.com/originals/4e/ae/65/4eae65b560cfad428d1874af80835451.jpg)
`;

class App extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      text: initialExample
    }
  }

  // User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.
  onChange = (event) => {
    this.setState({text: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <Editor onChange={this.onChange} markdownText={this.state.text}/>
        <Preview text={this.state.text}/>
      </div>
    );
  }
}

export default App;
