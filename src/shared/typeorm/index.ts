import { createConnection } from 'typeorm';

// procura no projeto o arquiv ormconfig.json e faz toda a configuração de forma automatica
// bastando apenas a nós, fazer a importação do arquivo atual no server.ts
createConnection();