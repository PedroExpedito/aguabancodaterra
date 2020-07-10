import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <>
      <h1>Mundo</h1>
      <Link to="create-table">criar tabela</Link>
      <br />
      <Link to="show-table">mostrar tabela</Link>
    </>
  );
}
