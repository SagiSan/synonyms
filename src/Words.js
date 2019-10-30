import React from 'react';

function Words(props) {
    const {
        word,
        onChangeWord,
        onChangeSynonym,
        synonyms_list,
        synonyms,
        synonym,
        updateSynonyms,
        addWord
    } = props;
    return (
        <main>
            <input type='text' placeholder="Enter your word" value={word} onChange={onChangeWord} />
            <br />
            {synonyms_list.length > 0 && synonyms}
            <br />
            {word.length > 0 &&
                <input
                    type='text'
                    placeholder="Add synonym"
                    value={synonym}
                    onChange={onChangeSynonym}
                />}
            {word.length > 0 &&
                <button
                    style={{ marginLeft: '1em' }}
                    disabled={!synonyms_list.indexOf(synonym) || synonym === word || synonym === ""}
                    onClick={updateSynonyms}>Add
                </button>}
            <br />
            <br />
            {word.length > 0 && synonyms_list.length > 0 && <button onClick={addWord}>Save word</button>}
        </main>
    )
}

export default Words;