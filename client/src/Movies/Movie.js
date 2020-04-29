import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';


function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
     
     
      <div className="save-button" >
      <Button
      onClick={saveMovie}
        variant="contained"
        
       
        startIcon={<SaveIcon />}
      >
         Save
      </Button>
      </div>
      <div className="edit-buttonCont" >
      <Button
      // onClick={}
        variant="contained"
        
        startIcon={<EditIcon style={{color:"white"}} />}
      >
         <Link style={{color:"white",textDecoration:"none"}} to={`/update-movie/${params.id}`}>Edit</Link>
      </Button>
      </div>
      <div className="delete-buttonCont" >
      <Button
      // onClick={}
        variant="contained"
        color="secondary"
        onClick={() => (props.deleteItem(params.id), props.getMovieList())}
        startIcon={<DeleteIcon  />}
      >
         <Link style={{color:"white",textDecoration:"none"}} to={`/`}>Delete</Link>
      </Button>
      </div>
      
    </div>
  );
}

export default Movie;
