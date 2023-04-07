export default abstract class AbstractCommand {
  readonly description: string;

  abstract run(): Promise<boolean>;

  constructor(description: string) {
    this.description = description;
  }
}
