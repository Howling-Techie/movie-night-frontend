import axios, {AxiosRequestConfig} from 'axios';

const baseURL = "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL,
});

// Function to set the access token in the headers
const setAccessToken = (token: string): AxiosRequestConfig => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

// Function to handle API requests
const makeRequest = async (config: AxiosRequestConfig) => {
    try {
        const response = await axiosInstance(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response ? error.response.data : error.message;
        }
    }
};

// SERVERS
export const getServer = async (serverId: number, accessToken?: string) => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: 'get',
        url: `/servers/${serverId}`,
        ...config,
    });
};
export const getServers = async (accessToken?: string) => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: 'get',
        url: `/servers`,
        ...config,
    });
};

export const getServerUsers = async (
    serverId: number,
    accessToken?: string
) => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: 'get',
        url: `/servers/${serverId}/users`,
        ...config,
    });
};

// MOVIES
export const getMovies = async () => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: 'get',
        url: `/movies`,
        ...config,
    });
};
export const getMovie = async (movieId: number) => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: 'get',
        url: `/movies/${movieId}`,
        ...config,
    });
};
export const getMovieSubmissions = async (movieId: number) => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: 'get',
        url: `/movies/${movieId}/submissions`,
        ...config,
    });
};

