import React, { useEffect, useState } from 'react'
import autoStyle from '../style/show-data.module.css'

const ShowData = () => {

    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [possibleValues, setPossibleValues] = useState([]);
    // const possibleValues = [
    //   "Apple",
    //   "Banana",
    //   "Ishlu",
    //   "Orange",
    //   "Peach",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    //   "Grapes",
    // ];

    useEffect(()=>{
      fetch('http://localhost:3000/items')
      .then(response => response.json())
      .then(data => {
         setPossibleValues(data);
         console.log(data[0].name);
      });
    },[])
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
      console.log(value);
      if (value.length > 0) {
        const filteredSuggestions= possibleValues.filter(
          (suggestion) => suggestion.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
      setVisibleCount(5);
    };
  
    const handleSuggestionClick = (value) => {
      setInputValue(value);
      setSuggestions([]);
    };

    const loadMore = () => {
      setVisibleCount((prevCount) => prevCount + 5);
    };


  return (
    <div>
     <div>
      <div className={autoStyle.autocompletewrapper}>
        <input
          type="text"
          value={inputValue}
          className={autoStyle.input}
          onChange={handleInputChange}
          placeholder="Enter Your Details..."
        />

        {suggestions.length > 0 && (
          <ul className={autoStyle.suggestionslist}>
            {suggestions.slice(0, visibleCount).map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
          {visibleCount < suggestions.length && (
            <button onClick={loadMore}>Load More</button>
          )}
      </div>
    </div>
    </div>
  )
}

export default ShowData
