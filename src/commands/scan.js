import '../boot.js'
import lookupENS from '../functions/lookupENS.js'
import writeItems from '../functions/writeItem.js'
import getAllWords from '../functions/getAllWords.js';
import { outFileDir } from '../constants.js';
import getCliArgument from '../functions/getCliArgument.js';

const filepath = `${outFileDir}/${getCliArgument('--outfile')}`

async function main() {
  console.log('[GETTING WORDS]')
  console.log('')
  let canditates = getAllWords()

  // Remove words with lenght less then 3 symbols
  canditates = canditates.filter(item => item.length > 2)

  const duplicates = canditates.filter((item, index) => index !== canditates.indexOf(item));
  
  if (duplicates.length) {
    console.log('Duplicates found:', duplicates)
    console.log('')
  }
  
  // Remove duplicates
  canditates = [...new Set(canditates)]

  const totalCanditates = canditates.length
  console.log('Total words:', totalCanditates)
  console.log('')

  const result = []
  for (const canditate of canditates) {
    try {
      const ens = await lookupENS(canditate)
      result.push(ens)

      console.log(`[${canditates.length}/${result.length} HANDLED]`, ens)
    } catch (e) {
      console.log(e)
    }
  }

  console.log('[WRITING FILE]')
  writeItems(filepath, result)
}

main()