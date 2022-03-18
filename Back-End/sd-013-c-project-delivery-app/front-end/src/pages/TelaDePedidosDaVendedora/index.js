import React, { useEffect, useState } from 'react';

import './TelaDePedidosDaVendedora.css';

// helpers
import BarraDeNavegacaoDaVendedora from '../../components/BarraDeNavegacaoDaVendedora';
import CardDoPedidoDaVendedora from '../../components/CardDoPedidoDaVendedora';
import { fetchSales } from '../../api';

// components
import Loading from '../../components/Loading';

function TelaDePedidosDaVendedora() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const salesFetched = await fetchSales();

        setSales(salesFetched);
        const TIMER = 500;
        setTimeout(() => {
          setLoading(false);
        }, TIMER);
      }
    )();
  }, [setLoading, setSales]);

  if (loading) return <Loading />;
  return (
    <div className="main-content-seller">
      <BarraDeNavegacaoDaVendedora />
      <h2 className="title-seller">PEDIDOS</h2>
      <div className="seller-orders">
        {sales.map((sale) => (
          <CardDoPedidoDaVendedora
            key={ sale.id }
            id={ sale.id }
            status={ sale.status }
            saleDate={ new Date(sale.saleDate).toLocaleDateString('en-GB') }
            totalPrice={ sale.totalPrice.toString().replace('.', ',') }
            deliveryAddress={ sale.deliveryAddress }
            deliveryNumber={ sale.deliveryNumber }
          />
        ))}
      </div>
    </div>
  );
}

export default TelaDePedidosDaVendedora;
