import '../boot.js'
import lookupENS from '../functions/lookupENS.js'
import writeItems from '../functions/writeItem.js'
import getAllWords from '../functions/getAllWords.js';
import { outFileDir } from '../constants.js';
import getCliArgument from '../functions/getCliArgument.js';

const filepath = `${outFileDir}/${getCliArgument('--outfile')}`

async function main() {
  const { log } = console
  log('[GETTING WORDS]')
  log('')
  let canditates = getAllWords()

  // Remove words with lenght less then 3 symbols
  canditates = canditates.filter(item => item.length > 2)

  const duplicates = canditates.filter((item, index) => index !== canditates.indexOf(item));

  if (duplicates.length) {
    log('Duplicates found:', duplicates)
    log('')
  }

  // Remove duplicates
  canditates = [...new Set(canditates)]

  const totalCanditates = canditates.length
  log('Total words:', totalCanditates)
  log('')

  const result = []
  for (const canditate of canditates) {
    try {
      const ens = await lookupENS(canditate)
      result.push(ens)

      log(`[${canditates.length}/${result.length} HANDLED]`, ens)
    } catch (e) {
      log(e)
    }
  }

  log('[WRITING FILE]')
  writeItems(filepath, result)
}

main()