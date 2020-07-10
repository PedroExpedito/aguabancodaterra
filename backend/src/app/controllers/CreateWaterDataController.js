import parseISO from 'date-fns/parseISO';
import endOfMonth from 'date-fns/endOfMonth';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import * as Yup from 'yup';
import waterSchema from '../schemas/waterSchema';

export default {
  async store(req, res) {
    const data = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required().min(2).max(256),
      totalSpendMoney: Yup.number().required(),
      date: Yup.date().required(),
      tribute: Yup.number().required(),
      spent: Yup.object().shape({
        1: Yup.number().required(),
        2: Yup.number().required(),
        3: Yup.number().required(),
        4: Yup.number().required(),
        5: Yup.number().required(),
        6: Yup.number().required(),
        7: Yup.number().required(),
        8: Yup.number().required(),
        9: Yup.number().required(),
        10: Yup.number().required(),
        11: Yup.number().required(),
        12: Yup.number().required(),
        13: Yup.number().required(),
        14: Yup.number().required(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const date = startOfMonth(parseISO(data.date));

    const existTable = await waterSchema.find({
      date,
    });

    if (existTable[0]) {
      return res.json({ error: 'Já existe uma tabela com essa data', existTable });
    }

    const afterTable = subMonths(date, 1);

    const results = await waterSchema.find({
      date: {
        $gte: startOfMonth(afterTable),
        $lte: endOfMonth(afterTable),
      },
    });

    if (!results[0]) {
      res.json({ erro: 'Não existe tabela anterior' });
    }

    data.date = startOfMonth(date);

    await waterSchema.create(data);

    return res.json(results);
  },

  async index(req, res) {
    const { date } = req.params;

    console.log(typeof (date));
    const tribute = 10;

    const schema = Yup.string().min(10).max(31).required();

    if (!(await schema.isValid(date))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const parsedDate = startOfMonth(parseISO(date));

    const table = await waterSchema.find({
      date: parsedDate,
    });

    if (!table.length) {
      return res.status(400).json({ error: 'Não existe tabela com está data' });
    }

    const afterTable = await waterSchema.find({
      date: subMonths(parsedDate, 1),
    });

    if (!afterTable.length) {
      return res.status(400).json({ error: 'Não existe tabela anterior a está data' });
    }

    const afterMonth = afterTable[0].spent.toJSON();
    const currentMonth = table[0].spent.toJSON();

    const consume = Object.fromEntries(
      Object.entries(currentMonth).map(([k, v]) => [k, v - afterMonth[k]]),
    );

    const sum = Object.values(consume).reduce((a, b) => a + b);

    const { totalSpendMoney } = table[0];

    const unitValue = sum > 0 ? totalSpendMoney / sum : 0;

    const spentMoney = Object.fromEntries(
      Object.entries(consume).map(([k, v]) => [k, v * unitValue]),
    );

    const sumSpentMoney = Object.values(spentMoney).reduce((a, b) => a + b);

    const spentMoneyTribute = Object.fromEntries(
      Object.entries(spentMoney).map(([k, v]) => [k, v + tribute]),
    );

    const sumSpentMoneyTribute = Object.values(spentMoneyTribute).reduce((a, b) => a + b);

    const result = {
      totalSpendMoney,
      unitValue,
      sumSpentMoney,
      sumSpentMoneyTribute,
      afterMonth,
      currentMonth,
      consume,
      spentMoney,
      spentMoneyTribute,
    };

    return res.json(result);
  },
};
