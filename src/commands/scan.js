import '../boot.js'
import lookupENS from '../functions/lookupENS.js'
import writeItems from '../functions/writeItem.js'
import getAllWords from '../functions/getAllWords.js';
import { outFileDir } from '../constants.js';
import getCliArgument from '../functions/getCliArgument.js';

const filepath = `${outFileDir}/${getCliArgument('--outfile')}`

async function main() {
  console.log('Getting words')
  const canditates = getAllWords()

  // Remove words with lenght less then 3 symbols
  const filtered = canditates.filter(item => item.length > 2)

  const totalCanditates = filtered.length
  console.log(`  Total words ${totalCanditates}`)
  console.log('')

  const result = []
  for (const canditate of filtered) {
    try {
      const ens = await lookupENS(canditate)
      result.push(ens)

      console.log(`${canditates.length}/${result.length} Handled`, ens)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('Writing file')
  writeItems(filepath, result)
}

main()