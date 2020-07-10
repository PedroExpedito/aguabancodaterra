import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import CreateTable from './pages/create-table';
import ShowTable from './pages/show-table';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/create-table" exact component={CreateTable} />
        <Route path="/show-table" exact component={ShowTable} />
      </Switch>
    </BrowserRouter>
  );
}

