import fs from 'fs'
import { favoritesFile, outFileDir } from '../constants.js'
import getCliArgument from '../functions/getCliArgument.js'
import getFileWords from '../functions/getFileWords.js'
import Table from 'cli-table3'
import chalk from 'chalk'

const filepath = `${outFileDir}/${getCliArgument('--file')}`
const size = getCliArgument('--size', false)

async function main() {
  let json = JSON.parse(fs.readFileSync(filepath))

  const table = new Table({
    head: ['#', 'Name', 'Link', 'Price', 'Expires', 'Available']
  })

  const favorites = getFileWords(favoritesFile)

  json.sort((a, b) => {
    if (favorites.includes(a.name)) {
      return -1
    }

    if (a.available > b.available) {
      return -1
    }

    if (a.expires < b.expires) {
      return -1
    }
  })

  if (size) {
    json = json.slice(0, size)
  }

  json.forEach((element, index) => {
    const date = new Date(element.expires)
    const preparedDate = date.toUTCString().replace('GMT', '').substring(4, 22)

    table.push([
      index + 1,
      favorites.includes(element.name) ? chalk.blue(element.name) : element.name,
      `https://app.ens.domains/name/${element.name}.eth/register`,
      element.price,
      preparedDate,
      element.available ? chalk.blue(true) : false,
    ])
  })

  console.log(table.toString())
}

main()

