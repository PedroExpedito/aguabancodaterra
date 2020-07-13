import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
export default function Main() {
  return (
    <>
      <div>
        <h1>Agua Banco da terra</h1>
        <Link to="create-table"><button>Criar Tabela</button></Link>
        <br />
        <Link to="show-table"><button>Mostrar Tabela</button></Link>
        <br />
        <Link to="edit-table"><button>Editar Tabela</button></Link>
      </div>
    </>
  );
}
