import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import CustomerProvider from './context/customerContext/Provider';

import TelaDeLogin from './pages/TelaDeLogin';
import TelaDeCadastro from './pages/TelaDeCadastro';
import TelaDeProdutosDoCliente from './pages/TelaDeProdutosDoCliente';
import TelaDePedidosDoCliente from './pages/TelaDePedidosDoCliente';
import TelaDeCheckout from './pages/TelaDeCheckout';
import TelaDePedidosDaVendedora from './pages/TelaDePedidosDaVendedora';
import TelaDeDetalhesDoPedidoDoCliente from './pages/TelaDeDetalhesDoPedidoDoCliente';
import TelaAdmin from './pages/AdminPage';
import TelaDeDetalhesDoPedidoDaVendedora from './pages/TelaDeDetalhesDoPedidoDaVendedora';
import SaleDone from './pages/SaleDone';

function App() {
  return (
    <BrowserRouter>
      <CustomerProvider>
        <Switch>
          <Route exact path="/admin/manage" component={ TelaAdmin } />
          <Route exact path="/"><Redirect to="/login" /></Route>
          <Route exact path="/login" component={ TelaDeLogin } />
          <Route exact path="/register" component={ TelaDeCadastro } />
          <Route exact path="/seller/orders" component={ TelaDePedidosDaVendedora } />
          <Route exact path="/customer/orders/done" component={ SaleDone } />
          <Route
            exact
            path="/seller/orders/:id"
            component={ TelaDeDetalhesDoPedidoDaVendedora }
          />
          <Route
            exact
            path="/customer/orders/:id"
            component={ TelaDeDetalhesDoPedidoDoCliente }
          />
          <Route exact path="/customer/orders" component={ TelaDePedidosDoCliente } />
          <Route exact path="/customer/products" component={ TelaDeProdutosDoCliente } />
          <Route exact path="/customer/checkout" component={ TelaDeCheckout } />
        </Switch>
      </CustomerProvider>
    </BrowserRouter>
  );
}

export default App;
