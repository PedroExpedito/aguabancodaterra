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
        {x}
      </td>
      <td>
        {afterMonth[index]}
      </td>
      <td>
        {currentMonth[index]}
      </td>
      <td>
        {consume[index]}
      </td>
      <td>
        {`R$: ${Number(spentMoney[index]).toFixed(2)}`}
      </td>
      <td>
        {`R$: ${Number(spentMoneyTribute[index]).toFixed(2)}`}
      </td>
    </tr>
  )) : <span> Selecione a data e clique em enviar</span>;

  const table = (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              gasto R$:
              {dataTable.totalSpendMoney}
            </td>
            <td>
              Anterior
            </td>
            <td>Atual</td>
            <td>Consum</td>
            <td>valor</td>
            <td>+Taxa</td>
          </tr>
          {tablePeoples}
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
    <div className="main">
      <form onSubmit={handleSubmit}>
        <h2>Insira a data</h2>
        <input type="date" onChange={handleChange} />
        <br />
        <button type="submit">Enviar</button>
        <div>{table}</div>
      </form>
      <Link to="/"><button>MENU</button></Link>
    </div>
  );
}
