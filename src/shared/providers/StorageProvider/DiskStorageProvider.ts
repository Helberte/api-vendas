import fs from 'fs';
import path from 'path';
import uploadConfig from 'src/config/upload';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {

    // usado para renomear de forma assíncrona um arquivo em um
    // determinado caminho antigo para um determinado novo caminho.
    // Ele substituirá o arquivo de destino se ele já existir.
    // Ele resolve a promessa sem argumentos após o sucesso
    await fs.promises.rename(
      
      // o metodo resolve, junta partes de caminhos em apenas um
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.tmpFolder, file)
    );

    return file;
  }

  public async deleFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}