import React from 'react';
import './App.css';

const quotes = [{
    author: "Dr.Seuss",
    text: "Don't cry because it's over, smile because it happened."
  },
  {
    author: "Oscar Wilde",
    text: "Be yourself; everyone else is already taken."
  },
  {
    author: "Albert Einstein",
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
  },
  {
    author: "Robert Frost",
    text: "In three words I can sum up everything I've learned about life: it goes on."
  },
  {
    author: "Maya Angelou",
    text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel."
  }
]

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: -1 
    }
  }

  // User Story #6: On first load, my quote machine displays a random quote in the element with id="text".
  componentWillMount() {  
    this.getNewRandomQuote();
  }

  getNewRandomQuote = () => {
    let index = this.state.quoteIndex;
    while (index === this.state.quoteIndex) {
      index = Math.round(Math.random() * (quotes.length-1));
    }    
    this.setState({quoteIndex: index});
  }



  render() {
    return (
      <div className="App">
          {/* User Story #1: I can see a wrapper element with a corresponding id="quote-box".       */}
          <section id="quote-box">
          {/* User Story #5: Within #quote-box, I can see a clickable element with a corresponding id="tweet-quote". */}
          {/* User Story #10: I can tweet the current quote by clicking on the #tweet-quote a element. This a element should include the "twitter.com/intent/tweet" path in it's href attribute to tweet the current quote.
 */}
            <div className="quote-container">
              {/* User Story #2: Within #quote-box, I can see an element with a corresponding id="text". */}
              {/* User Story #6: On first load, my quote machine displays a random quote in the element with id="text". */}
              <p id="text">"{quotes[this.state.quoteIndex].text}"</p>
              {/* User Story #3: Within #quote-box, I can see an element with a corresponding id="author". */}
              {/* User Story #7: On first load, my quote machine displays the random quote's author in the element with id="author". */}
              {/* User Story #9: My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element. */}
              <p id="author">-{quotes[this.state.quoteIndex].author}</p>
              {/* User Story #4: Within #quote-box, I can see a clickable element with a corresponding id="new-quote". */}
              {/* User Story #8: When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element. */}
            </div>
            <div className="buttons-container">
              <a className="btn btn-primary quote-color" id="tweet-quote" href="twitter.com/intent/tweet"><i className="fa fa-twitter fa-2x"></i></a>
              <button className="btn btn-primary quote-color" id="new-quote" onClick={this.getNewRandomQuote}>New Quote</button>
            </div>
          </section>
      </div>
    );
  }
}

export default App;
