import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const app = express()
app.use(express.json())

app.post('/api/create_panel', async (req, res) => {
  const { username, ram, key } = req.body

  if (key !== process.env.ACCESS_KEY) {
    return res.status(403).json({ status: 'error', message: 'Key akses salah.' })
  }

  try {
    const payload = {
      username,
      email: `${username}@auto.com`,
      first_name: username,
      last_name: "auto",
      password: Math.random().toString(36).slice(-8)
    }

    const response = await axios.post(`${process.env.DOMAIN}/api/application/users`, payload, {
      headers: {
        'Authorization': `Bearer ${process.env.APIKEY}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
      }
    })

    return res.json({
      status: 'success',
      username: response.data.attributes.username,
      password: '********',
      domain_login: process.env.DOMAIN
    })
  } catch (err) {
    console.error(err.response?.data || err.message)
    return res.status(500).json({ status: 'error', message: 'Gagal buat panel.' })
  }
})

app.listen(3000, () => console.log('🚀 Backend running on http://localhost:3000'))
