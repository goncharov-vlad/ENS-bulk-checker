import { ethers } from 'ethers';
import fs from 'fs';
import AbstractCommand from './AbstractCommand';
import App from '../App';
import { ScanResult } from '../type';
import Print from './Print';
import SmartContractFactory from '../SmartContractFactory';

export default class Scan extends AbstractCommand {
  static filepath = './resource/name.txt';

  baseRegistrarImplementationContract: ethers.Contract;

  registrarControllerContract: ethers.Contract;

  constructor() {
    super('Scans your ENS names');

    this.baseRegistrarImplementationContract = SmartContractFactory
      .createBaseRegistrarImplementation();

    this.registrarControllerContract = SmartContractFactory
      .createRegistrarController();
  }

  static getNames() {
    const { filepath } = Scan;

    if (!fs.existsSync(filepath)) {
      throw new Error(`${filepath} doen't exist, plese create it and add name you wanna lookup`);
    }

    const string = fs
      .readFileSync(filepath)
      .toString()
      .trim();

    if (!string) {
      throw new Error('You don\'t have any names to lookup, please add several to the file');
    }

    const names = string.split('\n');

    return names.map((name) => name.toLowerCase().trim());
  }

  async lookupName(name: string) {
    const { BigNumber, utils } = ethers;
    const labelHash = utils.keccak256(utils.toUtf8Bytes(name));
    const tokenId = BigNumber.from(labelHash).toString();

    const rentPrice = await this.registrarControllerContract.rentPrice(name, 1);
    const price = ethers.utils.formatUnits(rentPrice, 'gwei');
    const expires = (await this
      .baseRegistrarImplementationContract
      .nameExpires(tokenId))
      .toNumber() * 1000;

    return { name, price, expires };
  }

  static findDuplicates(names: string[]) {
    return names.filter((item, index) => index !== names.indexOf(item));
  }

  static removeDuplicates(names: string[]) {
    return [...new Set(names)];
  }

  static writeResult(result: ScanResult) {
    const { filepath } = Print;

    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, JSON.stringify(result));
      return;
    }

    const string = fs.readFileSync(filepath).toString();
    const fileItems: ScanResult = JSON.parse(string);
    const existedFiltered = fileItems
      .filter((fileItem) => !result.find(({ name }) => (name === fileItem.name)));

    fs.writeFileSync(filepath, JSON.stringify(existedFiltered.concat(result)));
  }

  async run() {
    const { log } = App;

    log('[GETTING WORDS]');
    log('');

    let names = Scan.getNames();

    const duplicates = Scan.findDuplicates(names);

    if (duplicates.length) {
      log('Duplicates found:', duplicates);
      log('');
    }

    names = Scan.removeDuplicates(names);

    log('Total names:', names.length);
    log('');

    const result = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const handled = await this.lookupName(name);
        result.push(handled);

        log(`[${names.length}/${result.length} HANDLED]`, handled);
      } catch (e) {
        log(e);
      }
    }

    Scan.writeResult(result);

    return true;
  }
}
