import React, { useEffect, useState } from 'react';
import './TelaDePedidosDoCliente.css';

// helpers
import { fetchSales } from '../../api';

// components
import BarraDeNavegacao from '../../components/BarraDeNavegacaoDoCliente';
import CardDoPedidoDoCliente from '../../components/CardDoPedidoDoCliente';
import Loading from '../../components/Loading';

function TelaDePedidosDoCliente() {
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
    <div>
      <BarraDeNavegacao />
      <h2 className="main-content-customer">MEUS PEDIDOS</h2>
      <div className="main-pedidos">
        {sales.map((sale) => (
          <CardDoPedidoDoCliente
            key={ sale.id }
            id={ sale.id }
            status={ sale.status }
            saleDate={ new Date(sale.saleDate).toLocaleDateString('en-GB') }
            totalPrice={ sale.totalPrice.toString().replace('.', ',') }
          />
        ))}
      </div>
    </div>
  );
}

export default TelaDePedidosDoCliente;
