import React , { useEffect , useReducer } from 'react';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Movie from './components/Movie';

import './App.css';

const key = 'caaf2477';

const url = `http://www.omdbapi.com/?apikey=${key}&s=man`;

//const [isLoading , setIsLoading] = useState(true);
  //const [hasError , setHasError] = useState(null);
  //const [movies , setMovies] = useState([]);
  const initialState = {
    loading : true,
    movies: [],
    errorMessage: null
  }

  const reducer = (state , action) => {
    switch(action.type){
      case 'SEARCH_MOVIES_REQUEST':
        return{
          ...state,
          loading: true,
          errorMessage: null
        };
        case 'SEARCH_MOVIES_SUCCESS':
          return{
            ...state,
            loading:false,
            movies: action.payload
          };
        case 'SEARCH_MOVIES_FAILURE':
            return{
              ...state,
              loading:false,
              errorMessage: action.error
            }
        default:
          return state;
    }
  } 

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect( () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: data.Search
      })
    })

  } , []);

  const search = searchValue => {
    
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${key}`)
      .then(response => response.json())
      .then(data => {
        if(data.Response === 'True'){
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: data.Search
          });
          console.log(data.Search);
        } else {
          dispatch({
            type:'SEARCH_MOVIES_FAILURE',
            error: data.Error
          });
          console.log(data.Error)
        }
      });
  }

  const { movies , loading , errorMessage } = state;

  return(
    <div className="App">
      <Header text="IMDB Replica" />
      <SearchBar search={ search } />
      <p className="App-intro">A IMDB replica...</p>
      <div className="movies">
          {loading && !errorMessage ?
            (<span>Loading...</span>)
          : errorMessage ? 
            ( <div className="errorMessage">{errorMessage}</div> ) 
          :
            (movies.map( (movie , index) => ( <Movie key={`${index}-${movie.title}`} movie={movie}/>)))
          }
      </div>
    </div>
  )
}

export default App;
