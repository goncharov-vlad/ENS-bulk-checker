import fs from 'fs'
import { favoritesFile, wordsDir } from '../constants.js'
import getCliArgument from '../functions/getCliArgument.js';

function getAllWords() {
  let allWords = []

  const wordsFile = getCliArgument('--wordsFile', false)

  if (wordsFile) {
    return getFileWords(wordsFile)
  }

  fs
    .readdirSync(wordsDir)
    .forEach(file => {
      if (file === '.gitignore' || file === favoritesFile) {
        return
      }

      allWords = [...allWords, ...getFileWords(file)]
    })

  return allWords
}

export default getAllWords
