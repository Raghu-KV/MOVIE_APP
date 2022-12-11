import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
//for dark mode
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
// formik
import { useFormik } from "formik";

// yup
import * as yup from "yup";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // async function dummy() {
  //   const data = await fetch(
  //     "https://638df99faefc455fb2b139a4.mockapi.io/movies"
  //   );
  //   const vil = await data.json();
  //   console.log(vil);
  // }
  // dummy();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/movie")}>
              Movie
            </Button>
            <Button color="inherit" onClick={() => navigate("/add-movie")}>
              Add Movie
            </Button>
            <Button color="inherit" onClick={() => navigate("/colorgame")}>
              Color Game
            </Button>
            <Button
              color="inherit"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              sx={{ marginLeft: "auto" }}
              startIcon={
                mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />
              }
            >
              {mode === "light" ? "  dark mode" : "  light mode"}
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/colorgame" element={<AddColor />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/flim" element={<Navigate replace to="/movie" />} />
          <Route path="/add-movie" element={<Form />}></Route>
          <Route path="/movie/:id" element={<MovieDetil />} />
          <Route path="/basicForm" element={<BasicForm />} />
          <Route path="/movie/edit/:id" element={<EditMovie />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

function EditMovie() {
  const [movies, setMovies] = useState(null);
  const { id } = useParams();

  // getting value from inputs ----------------------
  useEffect(() => {
    fetch(`https://638df99faefc455fb2b139a4.mockapi.io/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((movies) => setMovies(movies));
  }, []);

  return (
    <div>
      {movies ? <FormEditMovie movie={movies} movieId={id} /> : "loading..."}
    </div>
  );
}

function FormEditMovie({ movie, movieId }) {
  const navigate = useNavigate();
  const formCheckYup = yup.object({
    name: yup.string().min(1).required(),
    rating: yup.number().min(0).max(10).required(),
    poster: yup.string().min(5).required(),
    summary: yup.string().min(5).required(),
    trailer: yup.string().min(5).required(),
  });

  const formik = useFormik({
    initialValues: {
      name: movie.name,
      rating: movie.rating,
      poster: movie.poster,
      summary: movie.summary,
      trailer: movie.trailer,
    },
    validationSchema: formCheckYup,
    onSubmit: (value) => {
      console.log(value);
      saveChanges(value);
    },
    // console.log(value);
  });

  function saveChanges(value) {
    fetch(`https://638df99faefc455fb2b139a4.mockapi.io/movies/${movieId}`, {
      method: "PUT",
      body: JSON.stringify(value),
      headers: { "content-type": "application/json" },
    }).then(() => navigate("/movie"));
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Enter Movie Name"
          variant="outlined"
          type="text"
          placeholder="Movie name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name && formik.touched.name}
          helperText={
            formik.errors.name && formik.touched.name
              ? formik.errors.name
              : null
          }
          value={formik.values.name}
        />

        <TextField
          id="outlined-basic"
          label="Enter Movie Rating"
          variant="outlined"
          type="number"
          placeholder="Movie rating"
          name="rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.rating && formik.touched.rating}
          helperText={
            formik.errors.rating &&
            formik.touched.rating &&
            formik.errors.rating
          }
          value={formik.values.rating}
        />

        <TextField
          id="outlined-basic"
          label="Enter Movie Poster"
          variant="outlined"
          type="text"
          placeholder="Movie poster link"
          name="poster"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.poster && formik.touched.poster}
          helperText={
            formik.errors.poster &&
            formik.touched.poster &&
            formik.errors.poster
          }
          value={formik.values.poster}
        />

        <TextField
          id="outlined-basic"
          label="Movie Summary"
          variant="outlined"
          type="text"
          placeholder="Movie summary"
          name="summary"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.summary && formik.touched.summary}
          helperText={
            formik.errors.summary &&
            formik.touched.summary &&
            formik.errors.summary
          }
          value={formik.values.summary}
        />

        <TextField
          id="outlined-basic"
          label="Movie Trailer"
          variant="outlined"
          type="text"
          placeholder="Movie Trailer Link"
          name="trailer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.trailer && formik.touched.trailer}
          helperText={
            formik.errors.trailer &&
            formik.touched.trailer &&
            formik.errors.trailer
          }
          value={formik.values.trailer}
        />

        <Button variant="contained" type="submit" color="success">
          save Changes
        </Button>
      </div>
    </form>
  );
}

function MovieDetil() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovieList] = useState([]);

  useEffect(() => {
    fetch(`https://638df99faefc455fb2b139a4.mockapi.io/movies/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((movies) => setMovieList(movies));
  }, []);

  return (
    <div>
      <iframe
        width="100%"
        height="820"
        src={movie.trailer}
        title="VIKRAM - Official Trailer | Kamal Haasan | VijaySethupathi, FahadhFaasil | LokeshKanagaraj | Anirudh"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-container">
        <div className="movie-specs" style={{ padding: "10px" }}>
          <h2 className="movie-name">{movie.name} </h2>
          <p className="movie-rating">⭐ {movie.rating}</p>
        </div>

        <p className="movie-summary" style={{ padding: "10px" }}>
          {movie.summary}
        </p>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>testing Router on HOME</h1>
    </div>
  );
}
function NotFound() {
  return <h1>Not Found 404</h1>;
}
// ----------------- Add Color function -------------------
function AddColor() {
  const [bgColor, setBgColor] = useState("");

  const design = {
    backgroundColor: bgColor,
  };

  const [sampleColors, setSampleColors] = useState(["black", "red", "brown"]);

  function addNewColor() {
    setSampleColors([...sampleColors, bgColor]);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="enter color"
        style={design}
        onChange={(event) => setBgColor(event.target.value)}
      />
      <button onClick={addNewColor}>Add color</button>
      {sampleColors.map((SapColr, index) => (
        <ColorBox color={SapColr} key={index} />
      ))}
    </div>
  );
}

function ColorBox({ color }) {
  const design = {
    backgroundColor: color,
    width: "250px",
    height: "25px",
    marginTop: "10px",
  };
  return <div style={design}></div>;
}

// -----------------------------------------------------------------------------------------

function MovieList() {
  const [movieList, setMovieList] = useState([]);

  const data = () => {
    fetch("https://638df99faefc455fb2b139a4.mockapi.io/movies", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((movies) => setMovieList(movies));
  };

  useEffect(() => {
    data();
  }, []);

  const removeMovie = (id) => {
    fetch(`https://638df99faefc455fb2b139a4.mockapi.io/movies/${id}`, {
      method: "DELETE",
    }).then(() => data());
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="movie-list">
        {movieList.map((singleMovie) => (
          <Card variant="outlined" key={singleMovie.id}>
            <Movies
              movie={singleMovie}
              index={singleMovie.id}
              deleteButton={
                <IconButton
                  aria-label="delete"
                  onClick={() => removeMovie(singleMovie.id)}
                  color={"error"}
                >
                  <DeleteIcon />
                </IconButton>
              }
              editButton={
                <IconButton
                  aria-label="delete"
                  onClick={() => navigate(`/movie/edit/${singleMovie.id}`)}
                  color={"error"}
                >
                  <EditIcon />
                </IconButton>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
// display single movie component =======================================================
function Movies({ movie, index, deleteButton, editButton }) {
  const design = {
    color: movie.rating >= 8.5 ? "green" : "red",
  };

  const [toggle, setToggle] = useState(true);

  function changeState() {
    setToggle(!toggle);
  }

  const navigate = useNavigate();

  return (
    <div className="movie-container">
      <img src={movie.poster} alt="poster" className="movie-poster" />
      <div className="movie-specs" style={{ padding: "10px" }}>
        <h2 className="movie-name">
          {movie.name}{" "}
          <IconButton aria-label="toggle" onClick={changeState} color="primary">
            {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton
            aria-label="more Info"
            onClick={() => navigate(`/movie/${index}`)}
            color="primary"
          >
            <InfoIcon />
          </IconButton>
          {deleteButton}
        </h2>
        <p className="movie-rating" style={design}>
          ⭐ {movie.rating}
        </p>
      </div>
      {toggle && (
        <p className="movie-summary" style={{ padding: "10px" }}>
          {movie.summary}
        </p>
      )}
      {editButton}
      <Counter />
    </div>
  );
}
// this component has like and dis like button =========================================================
function Counter() {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  return (
    <div>
      <IconButton aria-label="delete" onClick={() => setLike((prv) => 1 + prv)}>
        <Badge badgeContent={like} color="primary">
          👍🏻
        </Badge>
      </IconButton>
      <IconButton aria-label="delete" onClick={() => setDislike(dislike + 1)}>
        <Badge badgeContent={dislike} color="error">
          👎🏻
        </Badge>
      </IconButton>
    </div>
  );
}

// this components add movies to API --------------------------------------------------------
function Form() {
  const navigate = useNavigate();

  // const updateMovieList = () => {
  //   fetch("https://638df99faefc455fb2b139a4.mockapi.io/movies", {
  //     method: "POST",
  //     body: JSON.stringify(userMovie),
  //     headers: { "content-type": "application/json" },
  //   }).then(() => navigate("/movie"));
  // };
  //  user Adding  new movies function -----------
  // function updateMovieList() {
  //   // console.log("ok");
  //   setMovieList([...movieList, userMovie]);
  // }

  // getting value from inputs ----------------------

  const formCheckYup = yup.object({
    name: yup.string().min(5).required(),
    rating: yup.number().min(0).max(10).required(),
    poster: yup.string().min(5).required(),
    summary: yup.string().min(5).required(),
    trailer: yup.string().min(5).required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: "",
      poster: "",
      summary: "",
      trailer: "",
    },
    validationSchema: formCheckYup,
    onSubmit: (value) => {
      fetch("https://638df99faefc455fb2b139a4.mockapi.io/movies", {
        method: "POST",
        body: JSON.stringify(value),
        headers: { "content-type": "application/json" },
      }).then(() => navigate("/movie"));
    },
    // console.log(value);
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Enter Movie Name"
          variant="outlined"
          type="text"
          placeholder="Movie name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name && formik.touched.name}
          helperText={
            formik.errors.name && formik.touched.name
              ? formik.errors.name
              : null
          }
        />

        <TextField
          id="outlined-basic"
          label="Enter Movie Rating"
          variant="outlined"
          type="number"
          placeholder="Movie rating"
          name="rating"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.rating && formik.touched.rating}
          helperText={
            formik.errors.rating &&
            formik.touched.rating &&
            formik.errors.rating
          }
        />

        <TextField
          id="outlined-basic"
          label="Enter Movie Poster"
          variant="outlined"
          type="text"
          placeholder="Movie poster link"
          name="poster"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.poster && formik.touched.poster}
          helperText={
            formik.errors.poster &&
            formik.touched.poster &&
            formik.errors.poster
          }
        />

        <TextField
          id="outlined-basic"
          label="Movie Summary"
          variant="outlined"
          type="text"
          placeholder="Movie summary"
          name="summary"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.summary && formik.touched.summary}
          helperText={
            formik.errors.summary &&
            formik.touched.summary &&
            formik.errors.summary
          }
        />

        <TextField
          id="outlined-basic"
          label="Movie Trailer"
          variant="outlined"
          type="text"
          placeholder="Movie Trailer Link"
          name="trailer"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.trailer && formik.touched.trailer}
          helperText={
            formik.errors.trailer &&
            formik.touched.trailer &&
            formik.errors.trailer
          }
        />

        <Button variant="contained" type="submit">
          Add Movie
        </Button>
      </div>
    </form>
  );
}

// for practice ==============================================
function BasicForm() {
  const formValidate = yup.object({
    emailId: yup.string().min(4, "enter 4 character da dai").required(),
    passwordId: yup.string().min(4, "enter 4 character da dai").required(),
  });

  const formik = useFormik({
    initialValues: {
      // email: "",
      // password: "",
    },
    validationSchema: formValidate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="text"
        // value={formik.values.email}
        name="emailId"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email && formik.errors.email}
      <input
        type="text"
        // value={formik.values.password}
        name="passwordId"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.password &&
        formik.touched.password &&
        formik.errors.password}
      <button type="submit">submit</button>
    </form>
  );
}

export default App;
