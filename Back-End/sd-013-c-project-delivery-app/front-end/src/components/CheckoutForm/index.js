import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import './form.css';

// helpers
import makeDataToRequest from '../../schemas/request/makeDataToRequest';
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import { createSale, fetchSellers } from '../../api';
import { decodeTokenFullInfo }
  from '../../schemas/decodeJwtToken/decodeToken';
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import setDataToLocalStorage
  from '../../schemas/LocalStorageSetAndGet/setLocalStotageData';

const selectSelerTestId = 'customer_checkout__select-seller';
const inputAddressTestId = 'customer_checkout__input-address';
const inputAddressNumberTestId = 'customer_checkout__input-addressNumber';
const buttonSubmitOrderTestId = 'customer_checkout__button-submit-order';

function FormCheckout() {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(0);

  const getSellers = async () => {
    const fecthedSellers = await fetchSellers();
    setSellers(fecthedSellers);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    const regex = /^\d+$/;

    if (target.id === 'address-text') setAddress(target.value);
    else if (regex.test(Number(value))) setNumber(Number(value));
  };

  const handleChooseSeller = ({ target }) => {
    setSeller(target.value);
  };

  const getsellerId = () => {
    if (seller === 0) return sellers[0].id;
    return seller;
  };

  const sendRequest = async () => {
    const sellerId = getsellerId();

    const products = getDataFromLocalStorage('orderedProducts');
    const userFromLocalStorage = getDataFromLocalStorage('user');

    const { token } = userFromLocalStorage;
    const user = decodeTokenFullInfo(token);

    const status = 'Pendente';

    const totalPrice = calculateTotalPrice();

    const productsToinsert = products.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
    }));

    const sale = {
      userId: user.id,
      sellerId,
      totalPrice,
      address,
      number,
      status,
    };

    const data = makeDataToRequest(sale, productsToinsert);

    const foundSale = await createSale(token, data);

    const { id } = foundSale.data.sale;
    setDataToLocalStorage(id, 'detailsPage');
    setDataToLocalStorage(foundSale, 'lastSale');

    const TIMER = 500;

    setTimeout(() => {
      history.push(`/customer/orders/${id}`);
    }, TIMER);
  };

  useEffect(() => {
    if (number < 0 || number === '') setNumber(0);
    if (number === 0 || !address.length) setDisabled(true);
    if (number > 0 && address.length) setDisabled(false);
    if (!sellers.length) getSellers();
  }, [sellers, number, address, disabled]);

  return (
    <form className="form-container">
      <div className="container-form">
        <h2 className="title-form-sale">Detalhes e Endereço para Entrega</h2>
        <div className="select-seller-input">
          <label htmlFor="select-seller">
            Pessoa Vendedora Responsável
            <select
              id="select-seller"
              data-testid={ selectSelerTestId }
              onClick={ (event) => handleChooseSeller(event) }
              value={ seller }
            >
              {sellers.map((element) => (
                <option key={ element.id } value={ element.id }>
                  {element.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="address-checkout">
          <label htmlFor="address-text">
            Endereço
            <input
              id="address-text"
              type="text"
              data-testid={ inputAddressTestId }
              value={ address }
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <div className="number-checkout">
          <label htmlFor="address-number">
            Número
            <input
              id="address-number"
              type="text"
              data-testid={ inputAddressNumberTestId }
              value={ number }
              onChange={ (event) => handleChange(event) }
            />
          </label>
        </div>
        <div className="button-checkout">
          <button
            type="button"
            data-testid={ buttonSubmitOrderTestId }
            onClick={ sendRequest }
            disabled={ disabled }
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormCheckout;
