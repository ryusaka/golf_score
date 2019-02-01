const fs = require('fs')
const ICON_REG = /^(icon-[0-9]+x[0-9]+)\.[0-9a-z]+\.png$/
const LAUNCH_REG = /^(launch-[0-9]+x[0-9]+)\.[0-9a-z]+\.png$/
const main = () => {
  const files = fs.readdirSync('./dist')
  const table = {}
  for (const f of files) {
    if (/^bundle.+\.js$/.test(f)) {
      table['bundle.js'] = f
    } else if (ICON_REG.test(f)) {
      const filename = f.match(ICON_REG)[1] + '.png'
      table[filename] = f
    } else if (/^launch.+\.png$/.test(f)) {
      const filename = f.match(LAUNCH_REG)[1] + '.png'
      table[filename] = f
    }
  }
  fs.writeFileSync('./dist/hashTable.json', JSON.stringify(table))
}
main()