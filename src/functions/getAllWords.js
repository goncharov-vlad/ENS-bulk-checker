import fs from 'fs'
import { wordsDir } from '../constants.js'
import getCliArgument from '../functions/getCliArgument.js';

function getFileWords(filepath) {
  const content = fs
    .readFileSync(`${wordsDir}/${filepath}`)
    .toString()

  const words = content.split("\n")

  return words
}

function getAllWords() {
  let allWords = []

  const wordsFile = getCliArgument('--wordsFile', false)

  if (wordsFile) {
    return getFileWords(wordsFile)
  }

  fs
    .readdirSync(wordsDir)
    .forEach(file => {
      if (file === '.gitignore') {
        return
      }

      allWords = [...allWords, ...getFileWords(file)]
    })

  return allWords
}

export default getAllWords
