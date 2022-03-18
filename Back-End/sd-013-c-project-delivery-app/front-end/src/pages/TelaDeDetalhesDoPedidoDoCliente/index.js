import React, { useEffect, useState } from 'react';

import './TelaDeDetalhesDoPedidoDoCliente.css';

// helpers
import { fetchSalesDetails } from '../../api';
import getDataFromLocalStorage
  from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

// components
import BarraDeNavegacao from '../../components/BarraDeNavegacaoDoCliente';
import CardSalesDetails from '../../components/CardSalesDetails';
import Loading from '../../components/Loading';

function TelaDeDetalhesDoPedidoDoCliente() {
  const [salesDetails, setSalesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const nameVendedora = 'P.Vend: Fulana Pereira';

  useEffect(() => {
    if (refresh === true) {
      const lastSale = getDataFromLocalStorage('lastSale');
      if (lastSale) {
        setSalesDetails(lastSale);
      }

      setRefresh(false);
    }

    if (loading === true && refresh === false) {
      (async () => {
        const { token } = getDataFromLocalStorage('user');
        const detailPage = getDataFromLocalStorage('detailsPage');

        const salesDetailsFetched = await fetchSalesDetails(detailPage, token);
        setSalesDetails(salesDetailsFetched);

        const TIMER = 500;
        setTimeout(() => {
          setLoading(false);
        }, TIMER);
      })();
      setDisabled(true);
    }
  }, [loading, refresh]);

  if (loading) return <Loading />;
  return (
    <main className="container">
      <BarraDeNavegacao />
      <CardSalesDetails
        id={ salesDetails.id }
        name={ nameVendedora }
        status={ salesDetails.status }
        saleDate={ new Date(salesDetails.saleDate) }
      />
      <div className="total-value">
        <h2 className="title-page-details">Detalhes da compra</h2>
        <button
          className="button-total"
          type="button"
          data-testid={ `${TESTID.customer.total}` }
        >
          Total R$
          { salesDetails.totalPrice.replace('.', ',') }
        </button>
        <button
          className="button-order"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ disabled }
          type="button"
        >
          marcar como entregue
        </button>
      </div>
      <div className="table-content">
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
        </tr>
        {salesDetails.products.map((item, index) => (
          <tr key={ item.id }>
            <td
              data-testid={ `${TESTID.customer.itemNumber}${index}` }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `${TESTID.customer.tableName}${index}` }
            >
              { item.name }
            </td>
            <td data-testid={ `${TESTID.customer.tableQuantity}${index}` }>
              { item.SaleProduct.quantity }
            </td>
            <td>
              <span>R$</span>
              <span data-testid={ `${TESTID.customer.subTotal}${index}` }>
                {item.price.replace('.', ',')}
              </span>
            </td>
            <td>
              <span>R$</span>
              <span>
                {(item.price * item.SaleProduct.quantity)
                  .toFixed(2)
                  .replace('.', ',')}
              </span>
            </td>
          </tr>
        ))}
      </div>
    </main>
  );
}

export default TelaDeDetalhesDoPedidoDoCliente;
