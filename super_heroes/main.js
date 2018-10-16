
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

                        <div class="modal" id="${movie.imdbID}">
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

    let modal = document.getElementsByClassName('modal');

    let request = new XMLHttpRequest();
    
    request.onload = function() {

        let movieInfo = JSON.parse(this.responseText);

            let newMovie = `
                <div class="movie-modal-container" style="background-image: url('${movieInfo.Poster}');">

                    <label class="movie-modal-title">${movieInfo.Title}</label>

                    <button id="close" class="close">Close</button>

                    <div class="movie-modal-information">${movieInfo.Rated}
                    ${movieInfo.Year} ${movieInfo.Genre}<br />
                    ${movieInfo.Released}, ${movieInfo.Runtime}
                    </div>

                    <div class="movie-modal-credits">- Writer: <small>${movieInfo.Writer}</small>
                    <br />- Actors: <small>${movieInfo.Actors}</small>
                    </div>

                    <div class="movie-modal-plot">${movieInfo.Plot}</div>

                    <div class="movie-modal-awards"><small>${movieInfo.Awards}</small></div>
                </div>
                `    
                // <div class="movie-modal-rating">${movieInfo.Country}${movieInfo.Language}${movieInfo.Director}${movieInfo.Ratings}</div>
                // </div>

        movieModalContainer.innerHTML = newMovie
        movieModalContainer.style.display = "flex";
        
        document.getElementById('close').addEventListener('click', function() {
            this.parentElement.parentElement.removeChild(this.parentElement);
        })


    }
    


    request.open('GET', `http://www.omdbapi.com/?i=${id}&apikey=${moviesKey}`);
    request.send();

    request;
}




requestMovies()