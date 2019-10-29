import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      synonym: '',
      synonyms_list: [],
      words: []
    }
  }
  addWord = () => {
    let index = this.state.words.indexOf(this.state.word);
    let words = [...this.state.words];
    if (index > -1) {
      words[index].synonyms = [...this.state.synonyms_list];
      this.setState({ words }, () => console.log(this.state.words));
    } else {
      words.push({
        name: this.state.word,
        synonyms: [...this.state.synonyms_list]
      });
      this.setState({ words }, () => console.log(this.state.words));
    }
  }
  updateSynonyms = key => {
    if (key === 'add') {
      this.setState({ synonyms_list: [...this.state.synonyms_list, this.state.synonym], synonym: '' });
    } else {
      console.log('find and update synonym');
    }
  }
  render() {
    const { word, synonym, synonyms_list } = this.state;
    const synonyms = <ul>
      {synonyms_list.length > 0 && synonyms_list.map(syn => {
        return (
          <li key={syn}>{syn}</li>
        )
      })}
    </ul>
    return (
      <div className="App">
        <header>
          <h1>Synonym Dictionary</h1>
        </header>
        <main>
          <input type='text' placeholder="Enter your word" value={word} onChange={e => this.setState({ word: e.target.value, synonyms_list: [] })} />
          <br />
          {synonyms_list.length > 0 && synonyms}
          <br />
          {word.length > 0 && <input type='text' placeholder="Add synonym" value={synonym} onChange={e => this.setState({ synonym: e.target.value })} />}
          {word.length > 0 && <button disabled={!synonyms_list.indexOf(synonym)} onClick={() => this.updateSynonyms('add')}>Add</button>}
          <br />
          <br />
          {word.length > 0 && <button onClick={this.addWord}>Add word</button>}
        </main>
      </div>
    );
  }
}

export default App;
