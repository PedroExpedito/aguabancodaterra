import React, {useState } from 'react';
import api from '../../config/api';
import { Link } from 'react-router-dom';

export default function ShowTable() {
  const [dataTable, setDataTable] = useState({ });
  const [date, setDate] = useState();

  const [afterMonth, setAfterMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const [consume, setConsume] = useState([]);
  const [spentMoney, setSpentMoney] = useState([]);
  const [spentMoneyTribute, setSpentMoneyTribute] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sumConsume, setSumConsume] = useState();

  async function getData() {
    const { data } = await api({
      method: 'get',
      url: `/table/${date}`,
    });
    setDataTable(data);
    setAfterMonth(Object.values(data.afterMonth));
    setCurrentMonth(Object.values(data.currentMonth));
    setConsume(Object.values(data.consume));
    setSpentMoney(Object.values(data.spentMoney));
    setSpentMoneyTribute(Object.values(data.spentMoneyTribute));
    setSumConsume(data.sumConsume);
  }

  function handleChange(event) {
    setDate(event.target.value);
  }
  function handleSubmit(event) {
    console.log(date);
    setLoading(true);
    event.preventDefault();
    getData();
  }

  const peoples = ['Prefeitura', 'Carmago', 'Manoel', 'João', 'Oziel', 'Preto',
    'Marquim', 'Alcindo', 'Picinini', 'Pedro', 'Decio', 'Silvio', 'Marcos', 'Nilsin',
  ];

  const tablePeoples = date && loading ? peoples.map((x, index) => (
    <tr key={x}>
      <td>
        <span>{x}</span>
      </td>
      <td>
        <span>{afterMonth[index]}</span>
      </td>
      <td>
        <span>{currentMonth[index]}</span>
      </td>
      <td>
        <span>{consume[index]}</span>
      </td>
      <td>
        <span>{`R$: ${Number(spentMoney[index]).toFixed(2)}`}</span>
      </td>
      <td>
        <span>{`R$: ${Number(spentMoneyTribute[index]).toFixed(2)}`}</span>
      </td>
    </tr>
  )) : <span>Selecione a data e clique em enviar</span>;

  const table = (
    <div>
      <table border="1">
        <tbody>
          <tr>
            <td>
              gasto:
              <span>{dataTable.totalSpendMoney}</span>
            </td>
            <td>
              <span>Anterior</span>
            </td>
            <td><span>Atual</span></td>
            <td><span>Consum</span></td>
            <td><span>valor</span></td>
            <td><span>+Taxa</span></td>
          </tr>
          {tablePeoples}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{sumConsume}</td>
            <td>{`R$: ${Number(dataTable.totalSpendMoney).toFixed(2)}`}</td>
            <td>{`R$: ${Number(dataTable.sumSpentMoneyTribute).toFixed(2)}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>Insira a data</span>
        <input type="date" onChange={handleChange} />
        <br />
        <button type="submit">Enviar</button>
        <div>{table}</div>
      </form>
      <Link to="/"><button>MENU</button></Link>
    </>
  );
}
