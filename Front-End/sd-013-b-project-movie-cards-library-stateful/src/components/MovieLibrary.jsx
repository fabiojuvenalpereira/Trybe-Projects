import React from 'react';
import PropTypes from 'prop-types';
import AddMovie from './AddMovie';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };

    this.onClickChange = this.onClickChange.bind(this);
    this.genericChange = this.genericChange.bind(this);
    this.moviesSeachFilter = this.moviesSeachFilter.bind(this);
  }

  onClickChange(newMovie) {
    const { movies } = this.state;

    if (newMovie.title !== ''
      || newMovie.subtitle !== ''
      || newMovie.storyline !== '') {
      const getMovies = [...movies, newMovie];
      this.setState({
        movies: getMovies,
      });
    }
  }

  genericChange({ target }) {
    const { name, value } = target;

    if (name === 'bookmarkedOnly') {
      this.setState((prevValue) => ({
        [name]: !prevValue.bookmarkedOnly,
      }));
    } else {
      this.setState({
        [name]: value,
      });
      this.moviesSeachFilter();
    }
  }

  moviesSeachFilter() {
    const { movies, searchText, bookmarkedOnly, selectedGenre } = this.state;

    let filtered = movies.filter((movie) => (
      (movie.title.toLowerCase().includes(searchText)
      || movie.subtitle.toLowerCase().includes(searchText)
      || movie.storyline.toLowerCase().includes(searchText))
    )).map((movie) => movie);

    if (bookmarkedOnly === true) {
      filtered = filtered.filter((movie) => movie.bookmarked === true)
        .map((movie) => movie);
    }

    if (selectedGenre !== '') {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre)
        .map((movie) => movie);
    } else {
      return filtered;
    }

    return filtered;
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.genericChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.genericChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.genericChange }
        />
        <AddMovie onClick={ this.onClickChange } />
        <MovieList movies={ this.moviesSeachFilter() } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
