import lookupENS from '../functions/lookupENS.js'
import writeItems from '../functions/writeItem.js'
import getCliArgument from '../functions/getCliArgument.js'
import { outFileDir } from '../constants.js'

const filepath = `${outFileDir}/${getCliArgument('--outfile')}`

async function main() {
  console.log('Getting words')
  const generator = await import(`../generators/${getCliArgument('--generator')}.js`)
  const canditates = await generator.default()
  //Remove words with lenght less then 3 symbols 
  const filtered = canditates.filter(item => item.length > 2)

  const totalCanditates = filtered.length
  console.log(`  Total words ${totalCanditates}`)
  console.log('')

  const result = []
  for (const canditate of filtered) {
    const ens = await lookupENS(canditate)
    result.push(ens)
    console.log(`${canditates.length}/${result.length} Handled`, ens)
  }

  console.log('Writing file')
  writeItems(filepath, result)
}

main()