import React from 'react';
import { Link } from 'react-router-dom';
import './style/card.css';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const {
      movie: { id, title, storyline, rating, imagePath },
    } = this.props;
    return (
      <div className="card-movie" data-testid="movie-card">
        <div className="main-card">
          <h2 className="card-name">{ title }</h2>
          <img className="card-image" src={ imagePath } alt="movie-img" />
          <h6 className="card-info">{ storyline }</h6>
          <div className="card-rating">{ rating }</div>
          <Link className="card-link" to={ `/movies/${id}` }>VER DETALHES</Link>
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
  })).isRequired,
};

export default MovieCard;
