import fs from 'fs'
import { wordsDir } from '../constants.js'

function getFileWords(filepath) {
  const content = fs
    .readFileSync(`${wordsDir}/${filepath}`)
    .toString()

  const words = content.split("\n")

  return words
}

export default getFileWords