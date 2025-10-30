import axios from 'axios'

export default class apiClient {
    constructor() {
        this.apiUrl = 'http://localhost:8080';
        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async post(endpoint, data) {
        try {
            const res = await this.client.post(`/${endpoint}`, data);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    async get(endpoint) {
        try {
            const res = await this.client.get(`/${endpoint}`);
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}