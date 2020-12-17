import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';

export default function Main() {
  const peoples = ['Prefeitura', 'Carmago', 'Manoel', 'João', 'Oziel', 'Preto',
    'Marquim', 'Alcindo', 'Picinini', 'Pedro', 'Decio', 'Silvio', 'Marcos', 'Nilsin',
  ];

  const [spent, setSpent] = useState({});
  const [id, setId] = useState();
  const [date, setDate] = useState();
  const [sucess, setSucess] = useState(false);
  const [afterData, setAfterData] = useState();
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api({
        method: 'put',
        url: `/edit/${id}`,
        data: afterData,
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

  useEffect(() => {
    setAfterData({
      title: data.title,
      totalSpendMoney: data.totalSpendMoney,
      date: data.date,
      tribute: 10,
      spent: spent,
    })
  }, [data]);

  function handleChangeHeader(event) {
    setData({
      ...data, [event.target.name]: event.target.value,
    });
  }

  async function handleSetDate(event) {
    const value = event.target.value;
    try {const { data } = await api({
      method: 'get',
      url:`table/${value}`
    });
      setDate(value);
      setSpent(data.currentMonth);
      setId(data._id);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const people = peoples.map((x, index) => {
    //const spent = Object.values(spent);
    return (
      <>
        <tr>
          <td><span>{x}</span></td>
          <td><input value={spent[index +1]} name={index} onChange={handleChange} type="number" id={index} /></td>
          <br />
        </tr>
      </>
    )});

  const sucessFalse = (
    <>
      <h1>Editar tabela de gasto</h1>
      <br />
      <span>Data</span>
      <input value={data.date} onChange={handleChangeHeader} name="date" type="date" />
      <br />
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Titulo</td>
            <td><input value={data.title} onChange={handleChangeHeader} name="title" /></td>
          </tr>
          <tr>
            <td>Gasto Total</td>
            <td><input value={data.totalSpendMoney} onChange={handleChangeHeader} name="totalSpendMoney" type="number" /></td>
          </tr>
          <tr>
            <td>Tributo</td>
            <td><input value={10} onChange={handleChangeHeader} name="tribute" type="number" /></td>
          </tr>
          {people}
        </table>
        <button type="submit">Enviar</button>
      </form>
    </>
  );

  const sucessTrue = (
    <h1>Cadastrada com sucesso</h1>
  );
  const dataRender = (
    <>
      <span>Selecione a data</span>
      <input type="date" onChange={handleSetDate}/>
    </>
  );

  const renderizar = sucess ? sucessTrue : sucessFalse;
  const selectData = date ? renderizar : dataRender;


  return (
    <div className="main">
      <div>{selectData}</div>
      <Link to="/"> <button>MENU</button></Link>
    </div>
  );
}

