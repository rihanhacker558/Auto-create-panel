import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, ram, adp, key } = req.body;
  const ACCESS_KEY = process.env.ACCESS_KEY;
  const APIKEY = process.env.APIKEY;
  const DOMAIN = process.env.DOMAIN;

  if (key !== ACCESS_KEY) {
    return res.status(403).json({ status: 'error', message: 'Key akses salah.' });
  }

  try {
    const userPayload = {
      username,
      email: `${username}@yourdomain.com`,
      first_name: username,
      last_name: "auto",
      password: Math.random().toString(36).slice(-8)
    };

    const response = await axios.post(`${DOMAIN}/api/application/users`, userPayload, {
      headers: {
        'Authorization': `Bearer ${APIKEY}`,
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      status: 'success',
      username: response.data.attributes.username,
      password: '********',
      domain_login: DOMAIN
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ status: 'error', message: 'Gagal membuat user.' });
  }
}