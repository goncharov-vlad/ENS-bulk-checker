import fs from 'fs';

export default class FileManager {
  static filepath = {
    scanResult: './resource/scanResult.json',
    favorite: './resource/favorite.txt',
    name: './resource/name.txt',
  };

  static createIfIsNotExist(filepath: string, content: string) {
    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, content);
    }
  }

  static getFileContentAsString(filepath: string) {
    return fs
      .readFileSync(filepath)
      .toString()
      .trim();
  }

  static writeFile(filepath: string, content: string) {
    fs.writeFileSync(filepath, content);
  }
}
