"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _CreateWaterDataController = require('./app/controllers/CreateWaterDataController'); var _CreateWaterDataController2 = _interopRequireDefault(_CreateWaterDataController);

const routes = new (0, _express.Router)();

routes.post('/', _CreateWaterDataController2.default.store);
routes.get('/table/:date', _CreateWaterDataController2.default.index);
routes.put('/edit/:id', _CreateWaterDataController2.default.update);

exports. default = routes;
