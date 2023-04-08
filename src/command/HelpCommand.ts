import chalk from 'chalk';
import App from '../App';
import AbstractCommand from './AbstractCommand';

export default class HelpCommand extends AbstractCommand {
  constructor(commands: App['commands']) {
    let text = '';

    text += chalk.bold('Welcome to The ENS Bulk Checker!');
    text += '\n';
    text += `${chalk.bold('Homepage:')} https://github.com/goncharov-vlad/ens-bulk-checker`;
    text += '\n';
    text += '\n';
    text += chalk.bold('Commands:');
    text += '\n';

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, { description }] of Object.entries(commands)) {
      text += `${name}${description}`;
      text += '\n';
    }

    text += 'help        Display this message';

    super(text);
  }

  async run() {
    App.log(this.description);
    return true;
  }
}
