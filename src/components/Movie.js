import React from 'react';

const defaultImagePlaceholder = 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';


const Movie = ( {movie} ) => {
    const poster = movie.Poster ? movie.Poster : defaultImagePlaceholder;

    return(
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img src={poster} alt={movie.Title}/>
            </div>
            <p>{movie.Year}</p>
        </div>
    )
}

export default Movie;