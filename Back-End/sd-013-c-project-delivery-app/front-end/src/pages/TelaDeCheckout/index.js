import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// css
import './TelaDeCheckout.css';

// components
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import removeItemFromLocalStorage
  from '../../schemas/setProductsOnlocalStorage/removeItemFromLocalStorage';

// helpers
import calculateTotalPrice from '../../utils/calculateTotalPrice';
import BarraDeNavegacao from '../../components/BarraDeNavegacaoDoCliente';
import FormCheckout from '../../components/CheckoutForm';
import Loading from '../../components/Loading';
import TESTID from '../../utils/testIdDictionary';

function TelaDeCheckout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const history = useHistory();

  const subTotalCalculate = (price, quantity) => {
    const parsedPrice = price.replace(',', '.');
    const subTotal = (Number(parsedPrice) * quantity).toFixed(2);
    return subTotal.replace('.', ',');
  };

  const setProductsFromOrders = () => {
    const foundProducts = getDataFromLocalStorage('orderedProducts');
    setProducts(foundProducts);
    setLoading(false);
    setTotalPrice(calculateTotalPrice());
  };

  const itemClickRemove = (product) => {
    removeItemFromLocalStorage(product.id);
    setProductsFromOrders();
  };

  useEffect(() => {
    if (loading === true) {
      setProductsFromOrders();
    }
    if (totalPrice === '0,00') {
      history.push('/');
    }
  }, [products, loading, totalPrice]);

  if (loading) return (<Loading />);
  return (
    <div className="content-page">
      <div className="main-content">
        <BarraDeNavegacao />
        <div
          className="title-total-value"
          data-testid={ TESTID.customer.totalPrice }
        >
          <h2>Finalizar Pedido</h2>
          Total: R$
          { totalPrice }
        </div>

        <table className="customTable">
          <thead>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
            <td>Remover Item</td>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={ item.id }>
                <td data-testid={ `${TESTID.customer.checkNumber}${index}` }>
                  { index + 1 }
                </td>
                <td data-testid={ `${TESTID.customer.checkName}${index}` }>
                  { item.name }
                </td>
                <td data-testid={ `${TESTID.customer.checkQuantity}${index}` }>
                  { item.quantity }
                </td>
                <td data-testid={ `${TESTID.customer.unitPrice}${index}` }>
                  R$
                  { item.price }
                </td>
                <td data-testid={ `${TESTID.customer.checkSubTotal}${index}` }>
                  R$
                  { subTotalCalculate(item.price, item.quantity) }
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => itemClickRemove(item) }
                    data-testid={ `${TESTID.customer.tableRemove}${index}` }
                    className="remove-item-button"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        <FormCheckout />
      </div>
    </div>
  );
}

export default TelaDeCheckout;
