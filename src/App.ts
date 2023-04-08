import AbstractCommand from './command/AbstractCommand';
import Help from './command/HelpCommand';
import Print from './command/PrintCommand';
import Scan from './command/ScanCommand';

export default class App {
  defaultCommand: AbstractCommand;

  commands: {
    [key: string]: AbstractCommand
  };

  constructor() {
    this.commands = {
      scan: new Scan(),
      print: new Print(),
    };

    this.defaultCommand = new Help(this.commands);
  }

  async run() {
    await (this.commands[App.getCommand()] || this.defaultCommand).run();
  }

  static log(...params: any) {
    // eslint-disable-next-line no-console
    console.log(...params);
  }

  static getCommand() {
    return process.argv.slice(2)[0];
  }
}
