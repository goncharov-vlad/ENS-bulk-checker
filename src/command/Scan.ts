import { ethers } from 'ethers';
import fs from 'fs';
import chalk from 'chalk';
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
    super('        Scans your ENS names');

    this.baseRegistrarImplementationContract = SmartContractFactory
      .createBaseRegistrarImplementation();

    this.registrarControllerContract = SmartContractFactory
      .createRegistrarController();

    const { filepath } = Scan;

    if (!fs.existsSync(filepath)) {
      fs.writeFileSync(filepath, '');
    }
  }

  static getNames() {
    const { filepath } = Scan;

    const string = fs
      .readFileSync(filepath)
      .toString()
      .trim();

    if (!string) {
      throw new Error(`You don't have any names to lookup, please add several to ${filepath}`);
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
    fs.writeFileSync(Print.filepath, JSON.stringify(result));
  }

  async run() {
    const { log } = App;
    let names = Scan.getNames();

    const duplicates = Scan.findDuplicates(names);

    if (duplicates.length) {
      log(chalk.bold('Duplicates has been found:'), duplicates.length);
      log('');
      log(duplicates.join('\n'));
      log('');
    }

    names = Scan.removeDuplicates(names);

    log(chalk.bold('Names count:'), names.length);
    log('');

    const result = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      let logText = `${result.length + 1}/${names.length} | `;

      try {
        // eslint-disable-next-line no-await-in-loop
        result.push(await this.lookupName(name));
        logText += `${chalk.bold(chalk.blueBright('success'))} | `;
      } catch (e) {
        logText += `${chalk.bold(chalk.redBright('error'))} | `;
      }

      logText += `${name}`;

      log(logText);
    }

    log('Saving...');

    Scan.writeResult(result);

    return true;
  }
}
