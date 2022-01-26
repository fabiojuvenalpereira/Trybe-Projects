import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

import '../components/style/card.css';
import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getobjct();
  }

  async getobjct() {
    const movies = await movieAPI.getMovies();
    this.setState({
      movies,
      loading: false,
    });
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <div className="main-page-div">
        <div className="main-content" data-testid="movie-list">
          {loading ? (
            <Loading />
          ) : (
            <div className="pai">
              <div className="list-movie-content">
                { movies.map((movie) => (
                  <MovieCard key={ movie.title } movie={ movie } />
                ))}
              </div>
              <Link className="add-button" to="/movies/new">ADICIONAR CARTÃO</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MovieList;
