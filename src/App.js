import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      synonym: '',
      synonyms_list: [],
      words: {},
      search: '',
      search_results: []
    }
  }
  addWord = () => {
    let words = { ...this.state.words };
    if (words[this.state.word]) {
      words[this.state.word].synonyms = [...this.state.synonyms_list];
      this.setState({ words }, () => console.log(this.state.words));
    } else {
      words[this.state.word] = {
        name: this.state.word,
        synonyms: [...this.state.synonyms_list]
      };
      this.setState({ words }, () => console.log(this.state.words));
    }
    this.setState({ synonyms_list: [], word: '' });
  }
  updateSynonyms = key => {
    if (key === 'add') {
      this.setState({ synonyms_list: [...this.state.synonyms_list, this.state.synonym], synonym: '' });
    } else {
      console.log('find and update synonym');
    }
  }
  onChangeWord = e => {

    if (this.state.words[e.target.value]) {
      this.setState({ synonyms_list: [...this.state.words[e.target.value].synonyms] })
    }
    this.setState({ word: e.target.value });
  }
  search = e => {
    let value = e.target.value;
    let synonyms = [];
    if (this.state.words[value]) {
      synonyms = [...this.state.words[value].synonyms];
    }
    this.setState({ search: value, search_results: [...synonyms] });
  }
  render() {
    const { word, synonym, synonyms_list, search, search_results } = this.state;
    const synonyms = <ul>
      {synonyms_list.length > 0 && synonyms_list.map(syn => {
        return (
          <li key={syn}>{syn}</li>
        )
      })}
    </ul>;
    const search_synonyms = <ul>
      {search_results.length > 0 && search_results.map((syn, i) => {
        return (
          <li key={`${syn}_${i}`}>{syn}</li>
        )
      })}
    </ul>;
    return (
      <div className="App">
        <header>
          <h1>Synonym Dictionary</h1>
        </header>
        <main>
          <input type='text' placeholder="Enter your word" value={word} onChange={this.onChangeWord} />
          <br />
          {synonyms_list.length > 0 && synonyms}
          <br />
          {word.length > 0 && <input type='text' placeholder="Add synonym" value={synonym} onChange={e => this.setState({ synonym: e.target.value })} />}
          {word.length > 0 && <button disabled={!synonyms_list.indexOf(synonym)} onClick={() => this.updateSynonyms('add')}>Add</button>}
          <br />
          <br />
          {word.length > 0 && synonyms_list.length > 0 && <button onClick={this.addWord}>Save word</button>}
        </main>
        <section className='search'>
          <hr />
          <h2>Search words</h2>
          <input type='text' placeholder="search" value={search} onChange={this.search} />
          <br />
          {search_synonyms}
        </section>
      </div>
    );
  }
}

export default App;
