import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login';

import Produtos from './pages/admin/produtos';
import ProdutoEditar from './pages/admin/produtos/produto.editar';
import ProdutoCadastrar from './pages/admin/produtos/produto.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

import Home from './pages/client/home';
import ProdutosDetails from './pages/client/produtos/produtos.details';

import PrivateRoute from './services/wAuth';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/*Routes Client */}
                <Route path="/" exact component={Home} />
                <Route path="/produtos/:idProduto" exact component={ProdutosDetails} />

                {/*Routes Admin*/}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute path="/admin" exact component={Dashboard} />

                <PrivateRoute path="/admin/produtos" exact component={Produtos} />
                <PrivateRoute path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <PrivateRoute path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
}