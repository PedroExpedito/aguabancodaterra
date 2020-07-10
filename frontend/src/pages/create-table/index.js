import React, { useState } from 'react';
import api from '../../config/api';

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

  function handleChange(event) {
    setSpent({ ...spent, [Number(event.target.id) + 1]: Number(event.target.value) });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setData({
      ...data, spent,
    });
    console.log(data);
  }

  function handleChangeHeader(event) {
    setData({
      ...data, [event.target.name]: event.target.value,
    });
  }

  const people = peoples.map((x, index) => (
    <>
      <tr>
        <td><span>{x}</span></td>
        <td><input name={index} onChange={handleChange} type="number" id={index} /></td>
        <br />
      </tr>
    </>
  ));

  return (
    <>
      <h1>criar tabela de gasto</h1>
      <span>Titulo</span>
      <input onChange={handleChangeHeader} name="title" />
      <br />
      <span>Gasto Total</span>
      <input onChange={handleChangeHeader} name="totalSpendMoney" type="number" />
      <br />
      <span>date</span>
      <input onChange={handleChangeHeader} name="date" type="date" />
      <br />
      <span>Tributo</span>
      <input onChange={handleChangeHeader} name="tribute" type="number" />
      <br />

      <span>Gasto</span>
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          {people}
        </table>
        <button type="submit">Enviar</button>
      </form>
    </>
  );
}
