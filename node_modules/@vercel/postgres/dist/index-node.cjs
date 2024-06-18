"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }








var _chunk5AO5NGV7cjs = require('./chunk-5AO5NGV7.cjs');

// src/index-node.ts
var _serverless = require('@neondatabase/serverless');
var _ws = require('ws'); var _ws2 = _interopRequireDefault(_ws);
if (_serverless.neonConfig) {
  _serverless.neonConfig.webSocketConstructor = _ws2.default;
}









exports.VercelClient = _chunk5AO5NGV7cjs.VercelClient; exports.VercelPool = _chunk5AO5NGV7cjs.VercelPool; exports.createClient = _chunk5AO5NGV7cjs.createClient; exports.createPool = _chunk5AO5NGV7cjs.createPool; exports.db = _chunk5AO5NGV7cjs.db; exports.postgresConnectionString = _chunk5AO5NGV7cjs.postgresConnectionString; exports.sql = _chunk5AO5NGV7cjs.sql; exports.types = _chunk5AO5NGV7cjs.types;
//# sourceMappingURL=index-node.cjs.map