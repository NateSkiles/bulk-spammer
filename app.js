import * as fs from 'fs'
import { parse } from 'csv'
import { API_KEY, ORG_NAME } from './utils/api.js'

const spamEndpoint = `https://${ORG_NAME}.api.kustomerapp.com/v1/spam/senders`

const loadEmails = async () => {
  return new Promise((resolve, reject) => {
    const emails = []
    const readingStream = fs.createReadStream('test.csv')
    readingStream
      .pipe(parse())
      .on('data', (row) => {
        emails.push(row[0])
      })
      .on('end', () => {
        console.log('Emails imported')
        resolve(emails)
        readingStream.close()
      })
      .on('error', (e) => {
        reject(e)
      })
  })
}

const blackListEmail = async (email) => {
  const body = JSON.stringify({ sender: `${email}`, channel: 'email', list: 'blacklist' })
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` }
  console.log(body)
  try {
    await fetch(spamEndpoint, {
      method: 'put',
      body,
      headers
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => console.log(data))
    return
  } catch (e) {
    return console.error(e)
  }
}

loadEmails().then((emails) => {
  emails.forEach(email => {
    blackListEmail(email)
  })
})
