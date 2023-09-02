import multer from "multer";
import path from "path";
import crypto from 'crypto';

// para poder determinar um local pra encontrar um dir ou arquivo
// pegar path atual usa-se a var global __dirname => pega o local atual de onde está sendo chamada
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// estes pontos seginifica que está voltando mais um nível
// sendo assim, pegamos o path do local onde armazenar as imagens

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder, // em qual pasta vai salvar
    filename(request, file, callback) { // define a forma como vamos compor o nome do arquivo
      const fileHash = crypto.randomBytes(10).toString('hex'); // crie um hash

      const fileName = `${fileHash}-${file.originalname}`; // define o nome do arquivo

      callback(null, fileName);
    }
  }) // armazenar em disco no server
}