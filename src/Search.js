import React from 'react';

function Search(props) {
    const { search, onSearch, search_synonyms } = props;
    return (
        <section className='search'>
            <hr />
            <h2>Search words</h2>
            <input type='text' placeholder="Search" value={search} onChange={onSearch} />
            <br />
            {search_synonyms}
        </section>
    )
}
export default Search;