import fs from 'fs'

export default function writeItems(filepath, items) {
  if (fs.existsSync(filepath)) {
    const buffer = fs.readFileSync(filepath).toString()
    const fileItems = JSON.parse(buffer)

    const existedFiltered = fileItems.filter(fileItem => !items.find(({ name }) => (name === fileItem.name)))

    fs.writeFileSync(filepath, JSON.stringify(existedFiltered.concat(items)))
  } else {
    const dir = filepath.substring(0, filepath.lastIndexOf("/"))
    fs.mkdirSync(dir, { recursive: true })

    fs.writeFileSync(filepath, JSON.stringify(items))
  }
}