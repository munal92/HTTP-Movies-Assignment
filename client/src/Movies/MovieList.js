import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          
            <MovieCard key={movie.id} movie={movie} />
           
        ))
      }
      <div className="addMovie_btn">
      <Link  to="/add-movie/">
      <Fab style={{width: "90px",height: "90px"}} color="secondary" aria-label="add" >
      <AddIcon  style={{width: "35px",height: "35px"}}   />
          
        </Fab>
          </Link>
      
      </div>
    </div>
  );
}

export default MovieList;
