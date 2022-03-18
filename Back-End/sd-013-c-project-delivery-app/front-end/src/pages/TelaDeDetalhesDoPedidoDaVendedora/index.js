import React, { useEffect, useState } from 'react';

import './TelaDeDetalhesDoPedidoDaVendedora.css';

// helpers
import { fetchSalesDetails } from '../../api';
import getDataFromLocalStorage
from '../../schemas/LocalStorageSetAndGet/getLocalStorageData';
import TESTID from '../../utils/testIdDictionary';

// components
import BarraDeNavegacaoDaVendedora from '../../components/BarraDeNavegacaoDaVendedora';

function TelaDeDetalhesDoPedidoDaVendedora() {
  const [salesDetails, setSalesDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);

  
  useEffect(() => {
    if (loading) {
      (
        async () => {
          const { token } = getDataFromLocalStorage('user');
          const detailPage = getDataFromLocalStorage('detailsPage');

          const salesDetailsFetched = await fetchSalesDetails(detailPage, token);

          setSalesDetails(salesDetailsFetched);
          setDisabled(true);
          setLoading(false);
        }
      )();
    }
  }, [loading, setLoading, setSalesDetails]);

  return (
    <main className="container">
      <BarraDeNavegacaoDaVendedora />
      {loading ? (
        <h2>loading</h2>
      ) : (
        <div>
          <h2>Detalhe do Pedido</h2>
          <section className="orderDetails">
            <span data-testid={ TESTID.seller.orderId }>
              Pedido:
              {salesDetails.id}
            </span>
            <span data-testid={ TESTID.seller.orderDate }>
              {new Date(salesDetails.saleDate).toLocaleDateString('en-GB')}
            </span>
            <span data-testid={ TESTID.seller.dStts }>
              {salesDetails.status}
            </span>
            <button
              type="button"
              data-testid={ TESTID.seller.preparingCheck }
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              data-testid={ TESTID.seller.dispatchCheck }
              disabled={ disabled }
            >
              SAIU PARA ENTREGA
            </button>

          </section>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {salesDetails.products.map((item, i) => (
                <tr key={ item.id }>
                  <td data-testid={ `${TESTID.seller.tableNumber}${i}` }>
                    {i + 1}
                  </td>
                  <td data-testid={ `${TESTID.seller.tableName}${i}` }>
                    {item.name}
                  </td>
                  <td data-testid={ `${TESTID.seller.tableQuantity}${i}` }>
                    {item.quantity}
                  </td>
                  <td>
                    <span>R$</span>
                    <span data-testid={ `${TESTID.seller.unitPrice}${i}` }>
                      {(item.price).replace('.', ',')}
                    </span>
                  </td>
                  <td>
                    <span>R$</span>
                    <span data-testid={ `${TESTID.seller.subTotal}${i}` }>
                      {(item.price * item.SaleProduct.quantity)
                        .toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-total-price-tppv">
            <button
              type="button"
              data-testid={ TESTID.seller.totalPrice }
            >
              {(salesDetails.totalPrice).replace('.', ',')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default TelaDeDetalhesDoPedidoDaVendedora;
