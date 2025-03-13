import axios from 'axios'

const token = process.env.NEXT_PUBLIC_BEARER_API_TOKEN;

if (!token && typeof window !== 'undefined') {
    console.error("Missing API token!");
}

export const request = axios.create({
    baseURL: "https://momentum.redberryinternship.ge/api/",
    headers: {
        Authorization: token ? `Bearer ${token}` : ''
    }
});