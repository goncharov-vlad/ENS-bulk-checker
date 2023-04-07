import Table from 'cli-table3';
import chalk from 'chalk';
import App from '../App';
import AbstractCommand from './AbstractCommand';

export default class Help extends AbstractCommand {
  constructor(commands: App['commands']) {
    let text = '';

    text += chalk.bold('Welcome to The ENS Bulk Checker!');
    text += '\n';
    text += 'Commands:';
    text += '\n';

    const table = new Table({ head: ['name', 'description'] });
    table.push(['help', 'Show this message']);

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, { description }] of Object.entries(commands)) {
      table.push([name, description]);
    }

    text += table.toString();
    super(text);
  }

  async run() {
    App.log(this.description);
    return true;
  }
}
