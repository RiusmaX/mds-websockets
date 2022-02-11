import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const loadChannels = async () => {
  try {
    const response = await api.get('/getChannels')
    return response.data && response.data.channels
  } catch (error) {
    console.error(error)
  }
}

export {
  loadChannels
}
