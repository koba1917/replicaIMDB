import React , {useState} from 'react';

const SearchBar = (props) => {

    const [inputValue , setInputValue] = useState('');

    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    const searchInputValue = (e) => {
        e.preventDefault();
        props.search(inputValue);
        setInputValue('');
    }

    return(
            <form className="search">
                <input type="text" value={inputValue} onChange={handleInputValue} />
                <input type="submit" value="Search" onClick={searchInputValue}/>
            </form>
    )
}

export default SearchBar;