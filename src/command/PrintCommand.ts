import Table from 'cli-table3';
import chalk from 'chalk';
import AbstractCommand from './AbstractCommand';
import { ScanResult } from '../type/index';
import App from '../App';
import SmartContractFactory from '../SmartContractFactory';
import FileManager from '../FileManager';

export default class PrintCommand extends AbstractCommand {
  constructor() {
    FileManager.createIfIsNotExist(FileManager.filepath.scanResult, JSON.stringify([]));
    FileManager.createIfIsNotExist(FileManager.filepath.favoriteName, '');

    super(`       Show information about your ENS names that have been checked/scanned previously (data saved in the file ${FileManager.filepath.scanResult})`);
  }

  private static getScanResult(): ScanResult {
    return JSON.parse(
      FileManager
        .getFileContentAsString(FileManager.filepath.scanResult),
    );
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

    const sorted = PrintCommand.sortScanResult(scanResult);

    return sorted.map(({ expires, name, price }, index) => [
      index + 1,
      name,
      price,
      Date.now() - (expires + gracePeriod) < 0
        ? (new Date(expires))
          .toUTCString()
          .replace('GMT', '')
          .substring(5, 22)
        : chalk.blue(chalk.bold('free')),
      `https://app.ens.domains/name/${name}.eth/register`,
    ]);
  }

  private static async createTable(items: ScanResult) {
    const table = new Table({
      head: ['#', 'Name', 'Last Price', 'Expires', 'Link'],
    });

    const preparedItems = await PrintCommand.prepareScanResult(items);

    table.push(...preparedItems);

    return table;
  }

  // eslint-disable-next-line class-methods-use-this
  async run() {
    const { log } = App;

    const scanResult = PrintCommand.getScanResult();

    if (!scanResult.length) {
      log('There is nothing to show, no names have been scanned. Make sure names are scanned/checked first');
      return false;
    }

    const favoriteNames = FileManager.getNames(FileManager.filepath.favoriteName);
    const onlyFavoriteNameResult = scanResult.filter(({ name }) => favoriteNames.includes(name));
    const onlyOthersNameResult = scanResult.filter(({ name }) => !favoriteNames.includes(name));

    log(chalk.bold('Favorite names:', onlyFavoriteNameResult.length));

    if (onlyFavoriteNameResult.length) {
      log((await PrintCommand.createTable(onlyFavoriteNameResult))
        .toString());
    }

    log(chalk.dim(`${chalk.bold('NOTE')}: You can save your favorite names in the file ${FileManager.filepath.favoriteName}`));
    log('');
    log(chalk.bold('Other ENS names:', onlyOthersNameResult.length));

    log((await PrintCommand.createTable(onlyOthersNameResult))
      .toString());

    return true;
  }
}
