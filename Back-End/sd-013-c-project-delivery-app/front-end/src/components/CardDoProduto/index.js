import React, { useEffect, useState, useContext } from 'react';

import PropTypes from 'prop-types';

import './CardDoProduto.css';

// helpers
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import CustomerContext from '../../context/customerContext/CustomerContext';
import setProductsOnLocalStorage
  from '../../schemas/setProductsOnlocalStorage';
import removeItemFromLocalStorage
  from '../../schemas/setProductsOnlocalStorage/removeItemFromLocalStorage';
import TESTID from '../../utils/testIdDictionary';

  function CardDoProduto({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);
  const { refreshPage, setRefreshPage } = useContext(CustomerContext);

  const handleChangeQuantity = ({ target }) => {
    const { value } = target;
    const regex = /^\d+$/;

    if (regex.test(Number(value)) === true) {
      setQuantity(Number(value));
    }

    setRefreshPage(!refreshPage);
  };

  const increaseQuantityClick = () => {
    const increasedQuantity = quantity + 1;
    setQuantity(increasedQuantity);
  };

  const decreaseQuantityClick = () => {
    if (quantity > 0) {
      const decreasedQuantity = quantity - 1;
      setQuantity(decreasedQuantity);
    }
  };

  useEffect(() => {
    if (quantity > 0) {
      setProductsOnLocalStorage({ id, name, price, urlImage, quantity });
      calculateTotalPrice();
      setRefreshPage(!refreshPage);
    }

    if (quantity === 0) {
      removeItemFromLocalStorage(id);
      calculateTotalPrice();
      setRefreshPage(!refreshPage);
    }

    if (quantity < 0 || quantity === ' ') setQuantity(0);
  }, [id, name, price, quantity, urlImage]);

  return (
    <div className="productCard">
      <div className="main-image">
        <img
          className="productCardThumbnail"
          src={ urlImage }
          alt={ name }
          data-testid={ `${TESTID.customer.cardBgImage}${id}` }
        />
      </div>
      <div className="name-price">
        <p
          className="productCardTitle"
          data-testid={ `${TESTID.customer.cardTitle}${id}` }
        >
          {name}
        </p>
        <p
          className="productCardPrice"
          data-testid={ `${TESTID.customer.cardPrice}${id}` }
        >
          R$
          {price}
        </p>
      </div>
      <div className="input-quantity">
        <input
          type="text"
          data-testid={ `${TESTID.customer.cardQuantity}${id}` }
          value={ quantity }
          onChange={ (event) => handleChangeQuantity(event) }
        />
      </div>
      <div className="buttons-inc-dec">
        <button
          className="productCardButton"
          data-testid={ `${TESTID.customer.cardAddItem}${id}` }
          type="submit"
          onClick={ increaseQuantityClick }
        >
          +
        </button>
        <button
          className="productCardButton"
          data-testid={ `${TESTID.customer.rmItem}${id}` }
          type="submit"
          onClick={ decreaseQuantityClick }
        >
          -
        </button>
      </div>

    </div>
  );
}

CardDoProduto.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default CardDoProduto;
