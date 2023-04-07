import Table from 'cli-table3';
import fs from 'fs';
import chalk from 'chalk';
import AbstractCommand from './AbstractCommand';
import { ScanResult } from '../type/index';
import App from '../App';
import SmartContractFactory from '../SmartContractFactory';

export default class Print extends AbstractCommand {
  static filepath = './resource/result.json';

  constructor() {
    super('Show scan result');
  }

  private static getScanResult(): ScanResult | false {
    try {
      const filepath = './resource/result.json';

      const string = fs
        .readFileSync(filepath)
        .toString();

      const json = JSON.parse(string);

      return json.length ? json : false;
    } catch {
      return false;
    }
  }

  private static sortScanResult(scanResult: ScanResult): ScanResult {
    return scanResult.sort((a, b) => {
      if (a.expires < 0) {
        return -1;
      }

      if (a.expires < b.expires) {
        return -1;
      }

      return 0;
    });
  }

  private static async prepareScanResult(scanResult: ScanResult) {
    const baseRegistrarImplementation = SmartContractFactory
      .createBaseRegistrarImplementation();

    const gracePeriod = (await baseRegistrarImplementation.GRACE_PERIOD())
      .toNumber() * 1000;

    return scanResult.map(({ expires, name, price }, index) => [
      index + 1,
      name,
      price,
      Date.now() + gracePeriod - expires > 0
        ? (new Date(expires))
          .toUTCString()
          .replace('GMT', '')
          .substring(5, 22)
        : chalk.bgWhite(
          chalk.blue(
            chalk.bold('FREE'),
          ),
        ),
      `https://app.ens.domains/name/${name}.eth/register`,
    ]);
  }

  // eslint-disable-next-line class-methods-use-this
  async run() {
    const { log } = App;

    const table = new Table({
      head: ['#', 'Name', 'Last Price', 'Expires', 'Link'],
    });

    const scanResult = Print.getScanResult();

    if (!scanResult) {
      log('Nothing to show, lookup some names at first');
      return false;
    }

    const prepareScanResult = await Print.prepareScanResult(
      Print.sortScanResult(
        scanResult,
      ),
    );

    table.push(...prepareScanResult);

    log(table.toString());
    log(
      chalk.bgWhite(
        chalk.black(
          chalk.bold('Above you see all the names you watch'),
        ),
      ),
    );

    return true;
  }
}
