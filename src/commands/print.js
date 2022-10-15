import fs from 'fs'
import { outFileDir } from '../constants.js'
import getCliArgument from '../functions/getCliArgument.js'
import Table from 'cli-table3'
import chalk from 'chalk'

const filepath = `${outFileDir}/${getCliArgument('--file')}`

async function main() {
  const json = JSON.parse(fs.readFileSync(filepath))

  const table = new Table({
    head: ['#', 'Name', 'Price', 'Expires', 'Available']
  })

  json.forEach((element, index) => {
    const date = new Date(element.expires)
    const preparedDate = date.toUTCString().replace('GMT', '').substring(4, 22)

    table.push([index, element.name, element.price, preparedDate, element.available ? chalk.blue(true) : false])
  });

  console.log(table.toString())
}

main()

