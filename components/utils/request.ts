import axios from 'axios'

export const request = axios.create({
    baseURL: "https://momentum.redberryinternship.ge/api/",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_BEARER_API_TOKEN}`
    }
});