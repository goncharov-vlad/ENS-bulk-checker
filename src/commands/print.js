import fs from 'fs'
import { outFileDir } from '../constants.js'
import getCliArgument from '../functions/getCliArgument.js'
import Table from 'cli-table3'
import chalk from 'chalk'

const filepath = `${outFileDir}/${getCliArgument('--file')}`

async function main() {
  const json = JSON.parse(fs.readFileSync(filepath))

  const table = new Table({
    head: ['#', 'Name', 'Link', 'Price', 'Expires', 'Available']
  })

  json.sort((a, b) => {
    if (a.available > b.available) {
      return -1
    }

    if (a.expires < b.expires) {
      return -1
    }
  })

  json.forEach((element, index) => {
    const date = new Date(element.expires)
    const preparedDate = date.toUTCString().replace('GMT', '').substring(4, 22)

    table.push([
      index,
      element.name,
      `https://app.ens.domains/name/${element.name}.eth/register`,
      element.price,
      preparedDate,
      element.available ? chalk.blue(true) : false,
    ])
  })

  console.log(table.toString())
}

main()

