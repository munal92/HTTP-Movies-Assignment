import React,{useState, useEffect} from "react"

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
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
let restoftheArr = []

const UpdateMovie = (props) => {
    const classes = useStyles();
    const history =useHistory();
    const {id} = useParams();
   
    
    const [updateMovie,setUpdateMovie] = useState({
      id: 0,
      title: '',
      director: '',
      metascore: 0,
      stars: [],
  })

  
    
     useEffect(() => {
           const selectedItem = props.movies.find(item=>{
              return `${item.id}` === id ;
            })
            if(selectedItem){
              setUpdateMovie(selectedItem);
              restoftheArr = props.movies.filter(mv => {
                return `${mv.id}` !== id;
              })
            }
           

    },[id])

const handleChange = e => {
    e.persist();
    // if(e.target.name === "stars"){
     
      
      setUpdateMovie({ ...updateMovie,stars: [ e.target.value ] })
    // }else{
     
      setUpdateMovie({...updateMovie,[e.target.name]: e.target.value })
    // }
    
   }
   const addInput = (item="") => {
    updateMovie.stars.push(item)
    setUpdateMovie({...updateMovie,stars:[...updateMovie.stars]})
    console.log("input CHewck", updateMovie)

  }

   const handleSubmit = e => {
     e.preventDefault();
     
    if(updateMovie.title !== ''){
     axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
    // .then(res =>{ props.setMovieList(restoftheArr.concat(updateMovie).sort((a,b) => (a.id>b.id) ? 1 : -1 ) )
      .then(res => {props.getMovieList() 
       
       history.push("/")
     
     }).catch(err => console.log(err))

    }else{
      alert("put title")
    }

   }


   console.log("id",id )
   console.log("updatedMovie",updateMovie )
   console.log("restoftheArr",restoftheArr )
   console.log("movies",props.movies )




    return (
        <div className="Form_cont">
        
        <FormControl className={classes.margin}>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Title />
          </Grid>
          <Grid item>
            <TextField  label="Movie Name" name="title" value={updateMovie.title} onChange={handleChange}  />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <CameraOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField  label="Movie Director"  name="director" value={updateMovie.director} onChange={handleChange}/>
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FormatListNumberedOutlinedIcon />
          </Grid>
          <Grid item>
            <TextField  label="Meta Score 0-100"  name="metascore" value={ `${ updateMovie.metascore===0 ? "" :  updateMovie.metascore }`  } onChange={handleChange}/>
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <StarsOutlinedIcon />
            </Grid>
            <Grid item style={{display:"flex",flexDirection:"column"}}>
            
            {updateMovie.stars.map((i,index) => (
              <TextField 
              key={index}
              label="Actors" name="stars" value={updateMovie.stars[index]}  type="text"
              onChange={e => {
                updateMovie.stars[index] = e.target.value
                setUpdateMovie({...updateMovie,stars:[...updateMovie.stars]})
              }  }
              
              
              />


            ))}


            
           
            
          </Grid>
          
          <button onClick={()=> addInput()}>+</button>
        </Grid>
        
      </div>
      <div className="UpdateSavebtnCont" >
      <Button
       onClick={handleSubmit}
        variant="contained"
        
        type="submit"
        startIcon={<SaveIcon />}
      >
         Save
      </Button>
      </div>
      </FormControl>
 
    </div>
    );
};

export default UpdateMovie;