"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// procura no projeto o arquiv ormconfig.json e faz toda a configuração de forma automatica
// bastando apenas a nós, fazer a importação do arquivo atual no server.ts
(0, typeorm_1.createConnection)();
