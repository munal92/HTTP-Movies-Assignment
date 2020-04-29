import React from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});
const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const classes = useStyles();
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
<div className="movie-card">
    <Card className={classes.root}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
       Movie Name
      </Typography>
      <Typography variant="h5" component="h2">
        
        {title} <Link style={{textDecoration:"none",color:"lightgray"}}  to={`/movies/${props.movie.id}`}><EditIcon /></Link> 
      </Typography> <br />
      {/* <Typography className={classes.pos} color="textSecondary">
        adjective
      </Typography> */}
      <Typography variant="body2" component="p">
      Director: <em>{director}</em>
        {/* <br />
        {'"a benevolent smile"'} */}
      </Typography>
      <Typography variant="h6" component="h2">
    Metascore: <strong>{metascore}</strong>
        
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
    <Typography paragraph>Actors</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          

          {stars.map(star => ( 


<Typography variant="h6" color="textSecondary" component="h2">
{star}
</Typography>
          ))}



        </CardContent>
      </Collapse>
  </Card>


  </div>



    // <div className="movie-card">
    //   <h2>{title}</h2>
    //   <div className="movie-director">
    //     Director: <em>{director}</em>
    //   </div>
    //   <div className="movie-metascore">
    //     Metascore: <strong>{metascore}</strong>
    //   </div>
    //   <h3>Actors</h3>

    //   {stars.map(star => (
    //     <div key={star} className="movie-star">
    //       {star}
    //     </div>
    //   ))}
    // </div>
  );
};

export default MovieCard;
