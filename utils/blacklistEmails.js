import { API_KEY, ORG_NAME } from './api.js'

const spamEndpoint = `https://${ORG_NAME}.api.kustomerapp.com/v1/spam/senders`

const blackListEmail = async (email) => {
  let data
  const body = JSON.stringify({ sender: `${email}`, channel: 'email', list: 'blacklist' })
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}` }
  try {
    await fetch(spamEndpoint, {
      method: 'put',
      body,
      headers
    })
      .then((res) => {
        data = res.json()
        return data
      })
    return data
  } catch (e) {
    return console.error(e)
  }
}

export default blackListEmail
