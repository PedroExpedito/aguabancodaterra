import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';

export default function Main() {
  const peoples = ['Prefeitura', 'Carmago', 'Manoel', 'João', 'Oziel', 'Preto',
    'Marquim', 'Alcindo', 'Picinini', 'Pedro', 'Decio', 'Silvio', 'Marcos', 'Nilsin',
  ];

  const [spent, setSpent] = useState({});

  const [data, setData] = useState({
    title: null,
    totalSpendMoney: null,
    date: null,
    tribute: 10,
    spent: {},
  });

  const [sucess, setSucess] = useState(false);

  function handleChange(event) {
    setSpent({ ...spent, [Number(event.target.id) + 1]: Number(event.target.value) });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(data);
    try {
      await api({
        method: 'post',
        url: '/',
        data,
      });
      setSucess(true);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setData({
      ...data, spent,
    });
  }, [spent]);

  function handleChangeHeader(event) {
    setData({
      ...data, [event.target.name]: event.target.value,
    });
  }

  const people = peoples.map((x, index) => (
    <>
      <tr>
        <td>{x}</td>
        <td><input key={x} name={index} onChange={handleChange} type="number" id={index} /></td>
      </tr>
    </>
  ));

  const sucessFalse = (
    <>
      <h1>criar tabela de gasto</h1>
      <Link to="/"><button>Menu</button></Link><br />
      <br />
      <span>Data</span>
      <input key="date" onChange={handleChangeHeader} name="date" type="date" />
      <br />
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td>Titulo</td>
            <td><input key="title" onChange={handleChangeHeader} name="title" /></td>
          </tr>
          <tr>
            <td>Gasto Total</td>
              <td><input key="totalSpendMoney" onChange={handleChangeHeader} name="totalSpendMoney" type="number" step="0.01" /></td>
          </tr>
          <tr>
            <td><span>Tributo</span></td>
            <td><input key="tribute" onChange={handleChangeHeader} name="tribute" type="number" /></td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            {people}
          </tbody>
        </table>
        <button type="submit">Enviar</button>
      </form>
    </>
  );

  const sucessTrue = (
    <h1>Cadastrada com sucesso</h1>
  );

  const renderizar = sucess ? sucessTrue : sucessFalse;

  return (
    <div>{renderizar}</div>
  );
}
