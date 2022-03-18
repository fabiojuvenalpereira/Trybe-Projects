import React, { useContext, useEffect, useState } from 'react';

import './TelaDeProdutosDoCliente.css';

// helpers
import { fetchProducts } from '../../api';
import CustomerContext from '../../context/customerContext/CustomerContext';

// components
import BarraDeNavegacao from '../../components/BarraDeNavegacaoDoCliente';
import CardDoProduto from '../../components/CardDoProduto';
import BotaoVerCarrinho from '../../components/BotaoVerCarrinho';
import Loading from '../../components/Loading';

function TelaDeProdutosDoCliente() {
  const { products, setProducts } = useContext(CustomerContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const productsFetched = await fetchProducts();

        const productsToSet = productsFetched.map((item) => {
          const parsedValue = item.price.replace('.', ',');
          return { ...item, price: parsedValue };
        });

        setProducts(productsToSet);

        const TIMER = 1000;
        setTimeout(() => {
          setLoading(false);
        }, TIMER);
      }
    )();
    localStorage.removeItem('lastSale');
  }, [setLoading, setProducts]);

  if (loading) return <Loading />;
  return (
    <div className="main-customer-products">
      <BarraDeNavegacao />

      <h2 className="title-page">PRODUTOS</h2>
      <div
        className="produtos-cliente"
      >
        {products.map((product) => (
          <CardDoProduto
            key={ product.id }
            id={ product.id }
            name={ product.name }
            price={ product.price }
            urlImage={ product.url_image }
          />
        ))}
      </div>
      <BotaoVerCarrinho />
    </div>
  );
}

export default TelaDeProdutosDoCliente;
