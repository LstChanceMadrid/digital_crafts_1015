
const MOVIES_URL = `http://www.omdbapi.com/?s=batman&apikey=${moviesKey}`;

// const MOVIE_URL = `http://www.omdbapi.com/?i=${movie.imbdID}&apikey=${moviesKey}`;


let movieList = document.getElementById('movie-list');


const requestMovies = () => {

    let request = new XMLHttpRequest();

    request.onload = function() {

        let movies = JSON.parse(this.responseText);
        console.log(movies)
        let movieData = movies.Search.map(function(movie) {
            
            return `                    
                <div class="movie-container">
                    <label class="movie-title">${movie.Title}</label>

                    <div class="movie-information">
                        <p onClick="requestMovieDescription('${movie.imdbID}')">More Details</p>

                        <div id="${movie.imdbID}">
                        </div>
                    </div>

                    <img class="movie-poster" src="${movie.Poster}">
                </div>
                `       
        });
        

        movieList.innerHTML = movieData.join('');
    }   

    request.open('GET', `http://www.omdbapi.com/?s=batman&apikey=${moviesKey}`);
    request.send()
            
    request
}




 
const requestMovieDescription = (id) => {
    
    let movieModalContainer = document.getElementById(id);

    
    let request = new XMLHttpRequest();

    request.onload = function() {

        let movieInfo = JSON.parse(this.responseText);
        console.log(movieInfo.Poster)
        

        // let movieInfoPiece = movieInfo.Search.map(function(info) {

            let newMovie = `
                <div class="movie-modal-container" style="background-image: url('${movieInfo.Poster}');">
                <label class="movie-modal-title">${movieInfo.Title}</label>
                Year
                Rated
                Released
                Runtime
                Genre
                Director
                Writer
                Actors
                Plot
                Language
                Country
                Awards
                Poster
                Ratings
                </div>
                `
    // }
        // );
        movieModalContainer.innerHTML = newMovie
        movieModalContainer.style.display = "flex";
    }
    
    request.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=${moviesKey}`);
    request.send();

    request;
}







requestMovies()