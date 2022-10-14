import axios from 'axios'
import cheerio from 'cheerio'

export default async function celebrities() {
  const url = 'https://www.imdb.com/list/ls052283250/'
  const res = await axios.get(url)
  const html = res.data

  const $ = cheerio.load(html)

  const headers = $('.lister-item-header')

  const array = []

  headers.map((i, el) => {
    const htmlText = $(el)
      .find('a')
      .text()
      .trim()
      .replace('.', '')

    const firstName = htmlText.split(' ')[0]
    const lastName = htmlText.split(' ')[1]

    if (firstName) {
      array.push(firstName)
    }

    if (lastName) {
      array.push(lastName)
    }

    if (firstName && lastName) {
      const v1 = `${firstName}-${lastName}`
      const v2 = `${firstName}${lastName}`

      array.push(v1, v2)
    }

  })

  return array.filter(word => word.length >= 3).map(word => word.toLowerCase())
}