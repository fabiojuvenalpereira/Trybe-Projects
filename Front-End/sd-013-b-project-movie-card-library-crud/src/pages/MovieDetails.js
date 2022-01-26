import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import '../components/style/card.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      loading: true,
    };
    this.getMovie = this.getMovie.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.getMovie();
  }

  async getMovie() {
    const { match } = this.props;
    const { id } = match.params;
    const getMovie = await movieAPI.getMovie(id);
    this.setState({
      movie: getMovie,
      loading: false,
    });
  }

  async delete() {
    const { match } = this.props;
    const { id } = match.params;
    const deleteMovie = await movieAPI.deleteMovie(id);
    return deleteMovie;
  }

  render() {
    // Change the condition to check the state
    const {
      movie: { title, storyline, imagePath, genre, rating, subtitle, id },
      loading,
    } = this.state;

    if (loading) return <Loading />;
    return (
      <div className="main-div" data-testid="movie-details">
        <div className="div-image">
          <img className="main-image" alt="Movie Cover" src={ `../${imagePath}` } />
        </div>
        <div className="main-text">
          <h1>{ title }</h1>
          <p>{ `Subtitle: ${subtitle}` }</p>
          <p className="storyline">{ `Storyline: ${storyline}` }</p>
          <p>{ `Genre: ${genre}` }</p>
          <p>{ `Rating: ${rating}` }</p>
        </div>
        <div className="main-buttons">
          <Link className="button-goback" to="/">VOLTAR</Link>
          <Link className="button-edit" to={ `/movies/${id}/edit` }>EDITAR</Link>
          <Link className="button-delete" to="/" onClick={ this.delete }>DELETAR</Link>
        </div>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
