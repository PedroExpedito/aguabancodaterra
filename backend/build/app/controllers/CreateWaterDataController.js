"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _parseISO = require('date-fns/parseISO'); var _parseISO2 = _interopRequireDefault(_parseISO);
var _endOfMonth = require('date-fns/endOfMonth'); var _endOfMonth2 = _interopRequireDefault(_endOfMonth);
var _subMonths = require('date-fns/subMonths'); var _subMonths2 = _interopRequireDefault(_subMonths);
var _startOfMonth = require('date-fns/startOfMonth'); var _startOfMonth2 = _interopRequireDefault(_startOfMonth);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _waterSchema = require('../schemas/waterSchema'); var _waterSchema2 = _interopRequireDefault(_waterSchema);
var _toPositive = require('../utils/toPositive'); var _toPositive2 = _interopRequireDefault(_toPositive);

exports. default = {
  async update(req, res) {
    const data = req.body;
    const { id } = req.params;

    const exist = await _waterSchema2.default.findById(id);

    const paramsSchema = Yup.string().min(24).max(25).required();
    console.log(id);

    if (!(await paramsSchema.isValid(id))) {
      return res.status(400).json({ error: 'Validations ID fails' });
    }

    if (!exist) {
      res.status(400).json({ error: 'this table dont existe' });
    }

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

    try {
      const { date } = data;
      data.date = _startOfMonth2.default.call(void 0, _parseISO2.default.call(void 0, date));
      await _waterSchema2.default.findByIdAndUpdate(id, data);
      return res.json({ sucess: true });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  },
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

    const date = _startOfMonth2.default.call(void 0, _parseISO2.default.call(void 0, data.date));

    const existTable = await _waterSchema2.default.find({
      date,
    });

    if (existTable[0]) {
      return res.status(400).json({ error: 'Já existe uma tabela com essa data' });
    }

    const afterTable = _subMonths2.default.call(void 0, date, 1);

    const results = await _waterSchema2.default.find({
      date: {
        $gte: _startOfMonth2.default.call(void 0, afterTable),
        $lte: _endOfMonth2.default.call(void 0, afterTable),
      },
    });

    if (!results[0]) {
      res.status(400).json({ erro: 'Não existe tabela anterior' });
    }

    data.date = _startOfMonth2.default.call(void 0, date);

    await _waterSchema2.default.create(data);

    return res.json(results);
  },

  async index(req, res) {
    const { date } = req.params;

    const tribute = 10;

    const schema = Yup.string().min(10).max(31).required();

    if (!(await schema.isValid(date))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const parsedDate = _startOfMonth2.default.call(void 0, _parseISO2.default.call(void 0, date));
    console.log(parsedDate);

    const table = await _waterSchema2.default.find({
      date: parsedDate,
    });

    if (!table.length) {
      return res.status(400).json({ error: 'Não existe tabela com está data' });
    }

    const afterTable = await _waterSchema2.default.find({
      date: _subMonths2.default.call(void 0, parsedDate, 1),
    });

    if (!afterTable.length) {
      return res.status(400).json({ error: 'Não existe tabela anterior a está data' });
    }

    const afterMonth = afterTable[0].spent.toJSON();
    const currentMonth = table[0].spent.toJSON();

    // K = Key
    // V = Value
    const consume = Object.fromEntries(
      Object.entries(currentMonth)
        .map(([key]) => [key, _toPositive2.default.call(void 0, currentMonth[key], afterMonth[key])]),
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

    const { _id, title } = table[0];

    const sumSpentMoneyTribute = Object.values(spentMoneyTribute).reduce((a, b) => a + b);

    const sumConsume = Object.values(consume).reduce((a, b) => a + b);

    const result = {
      title,
      _id,
      date,
      sumConsume,
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
