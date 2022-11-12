import { blackListEmail, loadEmails } from './utils/index.js'

const app = () => {
  const fileNames = process.argv.slice(2)
  if (!fileNames.length) return console.log('❗️ Please include a file name.')
  fileNames.forEach((file) => loadEmails(file)
    .catch(() => console.log(`${file} not found`))
    .then((emails) => {
      emails.forEach(email => {
        blackListEmail(email)
      })
    }))
}

app()
