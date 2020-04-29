import React,{useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import { useParams,Link,useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Title from '@material-ui/icons/Movie';
import CameraOutlinedIcon from '@material-ui/icons/CameraOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import SaveIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


const AddMovie = (props) => {
    const classes = useStyles();
    const history= useHistory();

    const [addMovie,setAddMovie] = useState({
        id: 0,
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    })


const handleChange = e => {
    e.persist();
    // if(e.target.name === "stars"){
     
      
    //   setAddMovie({...addMovie, stars: [ e.target.value ] })
    // }else{
     
      setAddMovie({...addMovie, [e.target.name]: e.target.value })
    // }
    
   }

   const addInput = (item="") => {
     addMovie.stars.push(item)
     setAddMovie({...addMovie,stars:[...addMovie.stars]})
     console.log("input CHewck", addMovie)

   }


   const handleSubmit = e => {
     e.preventDefault();
     if(addMovie.title !== ''){


     setAddMovie({...addMovie, id:`${props.movies.length}` })
     axios.post(`http://localhost:5000/api/movies/`, addMovie)
     .then(res => {props.getMovieList() 
        history.push("/")

         
     })
        
    
     
     .catch(err => console.log(err))
     }else{
      alert("put title")
    }


   }


   console.log("son hal",addMovie.id )


    return (
        <div className="Form_cont" >
        
        <FormControl className={classes.margin} >
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" defaultValue="Normal">
          <Grid item >
            <Title  />
          </Grid>
          <Grid item>
            <TextField  label="Movie Name" name="title" value={addMovie.title} onChange={handleChange}  />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <CameraOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField  label="Movie Director"  name="director" value={addMovie.director} onChange={handleChange}/>
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FormatListNumberedOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField  label="Meta Score 0-100"  name="metascore" value={ `${ addMovie.metascore===0 ? "" :  addMovie.metascore }`  } onChange={handleChange}/>
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <StarsOutlinedIcon />
          </Grid>
          <Grid item style={{display:"flex",flexDirection:"column"}}>
            
            {addMovie.stars.map((i,index) => (
              <TextField 
              key={index}
              label="Actors" name="stars" value={addMovie.stars[index]}  type="text"
              onChange={e => {
                addMovie.stars[index] = e.target.value
                setAddMovie({...addMovie,stars:[...addMovie.stars]})
              }  }
              
              
              />


            ))}


            
           
            
          </Grid>
          
          <button onClick={()=> addInput()}>+</button>
        </Grid>
        
      </div>
     
      <div className="UpdateSavebtnCont" >
      <Button style={{marginLeft : "1.5rem"}}
       onClick={handleSubmit}
        variant="contained"
        
        type="submit"
        startIcon={<SaveIcon />}
      >
         Add
      </Button>
      </div>
      </FormControl>
 
    </div>
    );
};

export default AddMovie;