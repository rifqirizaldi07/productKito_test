import axios from "axios";

const request = (method) => {
    return async (endpoint, body) => {
        const response = await requestApi({ method, endpoint, body})

        return response
    }
}

const requestApi = async ({ method, endpoint, data }) => {
    axios.defaults.baseURL = "http://localhost:3003"
    axios.defaults.headers['Content-Type'] = 'application/json'

    let response = {}
    
    switch (method) {   
        case 'POST':
            response = await axios.post(endpoint, data).catch(handleError)
            break;
        case 'PUT':
            response = await axios.put(endpoint, data).catch(handleError)
            break;
        case 'DELETE':
            response = await axios.delete(endpoint).catch(handleError)
            break;
        default:
            response = await axios.get(endpoint).catch(handleError)
            break;
    }

    return response.data
}

const handleError = (error) => {
    let message = 'Not Found'

    if (error.response) {
        message = error.response?.data || 'Not Found'
    }

    return Promise.reject(message)
}

const fetchApi = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

export default fetchApi