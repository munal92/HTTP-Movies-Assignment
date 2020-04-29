import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";
import axios from 'axios';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  

  const deleteItem = (id) => {
    axios.
    delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {console.log("APP DELETE REQUEST",res )} ,getMovieList() )
    .catch(err => console.log(err))
  }



console.log("App.js",movieList)
  return (
    <>
   
      <SavedList list={savedList} />
      
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList}  deleteItem={deleteItem} getMovieList={getMovieList} />
      </Route>
      <Route path="/update-movie/:id">
        <UpdateMovie  setMovieList={setMovieList} movies={movieList} getMovieList={getMovieList} />
      </Route>
      <Route path="/add-movie/">
        <AddMovie  setMovieList={setMovieList} movies={movieList} getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
