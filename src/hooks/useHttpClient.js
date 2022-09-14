import Axios from "axios"

const httpClient = Axios.create({
  baseURL: "http://localhost:3005",
  timeout: 1000
});

export default function useHttpClient() {
    return httpClient
}
