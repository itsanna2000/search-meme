import './App.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

function App() {
  
 const {data} = useQuery(['memes'], () => {
  return axios.get('https://api.imgflip.com/get_memes')
      .then((res) => res.data)
})
const memes = data?.data.memes

 // HANDLES INPUT FIELD

 const [searchedData, setSearchedData] = useState([])
 const [searchWord, setSearchWord] = useState()

 const handleSearch = (event) => {
  const searchWord = event.target.value
  const filterData = memes.filter((value) => {
    return value.name.toLowerCase().includes(searchWord.toLowerCase())
  })
  if (searchWord === "") {
    setSearchedData([])
  } else {
  setSearchedData(filterData)
  setShowAutocomplete(true)
  setSearchWord(searchWord)
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    handleClick()
  }
}

// HANDLES CLICKING ON THE SEARCH BTN

const [clickedData, setClickedData] = useState()

 const handleClick = (event) => {
  const filterData = memes.filter((value) => {
    return value.name.toLowerCase().includes(searchWord.toLowerCase())
  })
  setClickedData(filterData)
  setShowAutocomplete(false)
 }

// HANDLES AUTOCOMPLETE

const [showAutocomplete, setShowAutocomplete] = useState(false)

 const handleAutcomplete = (event) => {
  event.stopPropagation()
  const clickedData = event.currentTarget.textContent
  const resultSearch = memes.filter((value) => {
    return value.name.toLowerCase().includes(clickedData.toLowerCase())
  })
    setClickedData(resultSearch)
    setShowAutocomplete(false)
    
 }

  return (
    <div className="App">

   <h1>Get meme</h1>

   <div className='main-container'>

      <div className='container'>
        <input type='text' placeholder='Search...' onChange={handleSearch} onKeyDown={handleKeyDown}/>
        <button onClick={handleClick}>🔍</button>
      </div>
      
      {showAutocomplete && 
      <div className='autocomplete'>
        {searchedData.map((value, key) => {
        return <ul>
          <li key={value.id} onClick={handleAutcomplete}>{value.name}</li>
        </ul>
       })}
      </div>
     }
     </div> 
  
  {clickedData != null &&
  <div className='card'>
    {clickedData.map((data, key) => {
      return (<div className='item' key={data.id}> <img src={data.url} title={data.name} />
      <h3>result: '{data.name}'</h3> </div>)
    })
    }
  </div>
  
}
    </div>
    
  );
}

export default App;
