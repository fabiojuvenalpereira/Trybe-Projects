import React from 'react';
import PropTypes from 'prop-types';

class Reviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: null,
    };
  }

  componentDidMount() {
    this.requestLocalStorage();
  }

  requestLocalStorage() {
    const { productId } = this.props;
    if (localStorage.getItem('submited-review')) {
      const reviews = JSON.parse(localStorage.getItem('submited-review'));
      const productIdReviews = reviews.filter((review) => review.productId === productId);
      this.setState({
        reviews: productIdReviews,
      });
    }
  }

  renderReviews() {
    const { reviews } = this.state;

    return reviews.map((review) => (
      <section key={ review.email }>
        <span>{`Email: ${review.email}`}</span>
        <span>&nbsp;&nbsp;&nbsp;</span>
        <span>{`Estrela: ${review.star}`}</span>
        <p>{`Comentário: ${review.comment}`}</p>
      </section>
    ));
  }

  render() {
    const { reviews } = this.state;

    return (
      <section>
        { reviews ? this.renderReviews() : <p>Sem avaliações</p> }
      </section>
    );
  }
}

Reviews.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default Reviews;
