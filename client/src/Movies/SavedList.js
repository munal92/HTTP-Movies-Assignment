import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';


function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      {/* <div className="home-button"> */}
      <Button
        variant="contained"
        color="primary"
        
        startIcon={<HomeIcon />}
      >
        <Link style={{color:"white",textDecoration:"none"}} to="/">Home</Link>
      </Button>
        
      {/* </div> */}
    </div>
  );
}

export default SavedList;
