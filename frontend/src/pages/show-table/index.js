import React, { useState } from 'react';
import api from '../../config/api';

export default function ShowTable() {
  const [dataTable, setDataTable] = useState({ });
  const [date, setDate] = useState();

  const [afterMonth, setAfterMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState([]);
  const [consume, setConsume] = useState([]);
  const [spentMoney, setSpentMoney] = useState([]);
  const [spentMoneyTribute, setSpentMoneyTribute] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <span>{`R$: ${spentMoney[index]}`}</span>
      </td>
      <td>
        <span>{spentMoneyTribute[index]}</span>
      </td>
    </tr>
  )) : <span>Selecione a data e clique em enviar</span>;

  const table = (
    <div>
      <table border="1">
        <tbody>
          <tr>
            <td>
              valor gasto:
              <span>{dataTable.totalSpendMoney}</span>
            </td>
            <td>
              <span>Mes anterior</span>
            </td>
            <td><span>Mes Atual</span></td>
            <td><span>Consumo</span></td>
            <td><span>valor</span></td>
            <td><span>valor+Taxa</span></td>
          </tr>
          {tablePeoples}
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
    </>
  );
}
