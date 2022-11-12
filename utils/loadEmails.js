import * as fs from 'fs'
import { parse } from 'csv'

const loadEmails = async (file) => {
  const fileName = file.slice(-4) === '.csv' ? file : `${file}.csv`
  return new Promise((resolve, reject) => {
    const emails = []
    const readingStream = fs.createReadStream(`./import/${fileName}`)
    readingStream
      .on('error', (e) => console.log('\x1b[31m', `❌ ${fileName} not found. Please check file name and try again.`, '\x1b[0m'))
      .pipe(parse())
      .on('data', (row) => {
        emails.push(row[0])
      })
      .on('end', () => {
        console.log('\x1b[32m', `✅ Emails imported from ${fileName}`, '\x1b[0m')
        resolve(emails)
        readingStream.close()
      })
      .on('error', (e) => {
        reject(e)
      })
  })
}

export default loadEmails
