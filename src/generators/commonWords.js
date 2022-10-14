import axios from 'axios'
import cheerio from 'cheerio'

export default async function commonWords() {
  const res = await axios.get('https://www.ef.com/wwen/english-resources/english-vocabulary/top-3000-words/')
  const html = res.data

  const $ = cheerio.load(html)

  const paragraph = $('#main-content').find('p').last().html()

  if (paragraph) {
    const array = paragraph.split('<br>')
    return array
  }

  return []
}
