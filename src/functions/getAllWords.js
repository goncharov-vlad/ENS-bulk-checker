import fs from 'fs'
import { wordsDir } from '../constants.js'

function getAllWords() {
  let allWords = []

  fs
    .readdirSync(wordsDir)
    .forEach(file => {
      if (file === '.gitignore') {
        return
      }

      const content = fs
        .readFileSync(`${wordsDir}/${file}`)
        .toString()

      const words = content.split("\n")

      allWords = [...allWords, ...words]
    })

  return allWords
}

export default getAllWords
