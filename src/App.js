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
    let synonyms_list = [...this.state.synonyms_list];

    if (!words[this.state.word]) {
      words[this.state.word] = {
        name: this.state.word,
      };
    }
    words[this.state.word].synonyms = [...synonyms_list];


    for (let i = 0; i < synonyms_list.length; i++) {
      if (!words[synonyms_list[i]]) {
        words[synonyms_list[i]] = {
          name: synonyms_list[i],
          synonyms: [this.state.word]
        }
      } else {
        words[synonyms_list[i]].synonyms.push(this.state.word);
      }
    }
    this.setState({ words, synonyms_list: [], word: '' });
  }
  updateSynonyms = () => {
    this.setState({ synonyms_list: [...this.state.synonyms_list, this.state.synonym], synonym: '' });

  }
  onChangeWord = e => {

    if (this.state.words[e.target.value]) {
      this.setState({ synonyms_list: [...this.state.words[e.target.value].synonyms] })
    } else {
      this.setState({ synonyms_list: [] });
    }
    this.setState({ word: e.target.value });
  }
  search = (e) => {
    let value = e.target.value;
    let synonyms = [];
    this.setState({ search: value, search_results: [] });
    if (this.state.words[value]) {
      let search_results = this.searchRecursion(value, synonyms);
      search_results.splice(0, 1);
      this.setState({ search_results });
    }
  }
  searchRecursion = (value, results) => {
    if (results.indexOf(value) > -1) {
      return results;
    }
    results.push(value);
    for (let i = 0; i < this.state.words[value].synonyms.length; i++) {
      this.searchRecursion(this.state.words[value].synonyms[i], results);
    }
    return results;
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
          {word.length > 0 && <button disabled={!synonyms_list.indexOf(synonym) || synonym === word} onClick={this.updateSynonyms}>Add</button>}
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
