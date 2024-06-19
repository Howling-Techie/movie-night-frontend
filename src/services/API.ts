import axios, {AxiosRequestConfig} from "axios";
import Submission from "../interfaces/Submission.ts";
import Event from "../interfaces/Event.ts";
import Movie from "../interfaces/Movie.ts";
import User from "../interfaces/User.ts";
import Server from "../interfaces/Server.ts";

const baseURL = import.meta.env.VITE_API_URL;

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
export const getServer = async (serverId: string, accessToken?: string): Promise<{ server: Server }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/servers/${serverId}`,
        ...config,
    });
};
export const getServers = async (accessToken?: string): Promise<{ servers: Server[] }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/servers`,
        ...config,
    });
};
export const getServerTags = async (serverId: string, accessToken?: string): Promise<{
    tags: {
        id: number,
        name: string,
        description: string,
        icon: string
    }[]
}> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/servers/${serverId}/tags`,
        ...config,
    });
};

export const getServerUsers = async (
    serverId: number,
    accessToken?: string
): Promise<{ users: User[] }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/servers/${serverId}/users`,
        ...config,
    });
};

// MOVIES
export const getMovies = async (sort_by: string = "title", order: string = "asc"): Promise<{ movies: Movie[] }> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/movies`,
        params: {sort_by, order},
        ...config,
    });
};
export const getMovie = async (movieId: number): Promise<{ movie: Movie }> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/movies/${movieId}`,
        ...config,
    });
};
export const getMovieImagesById = async (movieId: number): Promise<{
    images: { posters: string[], images: string[] }
}> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/movies/images/${movieId}`,
        ...config,
    });
};

export const searchMovie = async (movieSearch: string): Promise<{ movies: Movie[] }> => {
    const config: AxiosRequestConfig = {};
    return makeRequest({
        method: "get",
        url: `/movies/search/?searchTerm=${movieSearch}`,
        ...config,
    });
};

// SUBMISSIONS
export const getSubmissions = async (sort_by: string = "time_submitted", order: string = "desc", statuses: string[] | null, users: string[] | null)
    : Promise<{ submissions: Submission[] }> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/submissions`,
        params: {sort_by, order, statuses, users},
        ...config,
    });
};

export const getSubmissionStatuses = async ()
    : Promise<{ statuses: string[] }> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/submissions/statuses`,
        ...config,
    });
};

export const getSubmissionUsers = async ()
    : Promise<{ users: { user_id: string, username: string }[] }> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/submissions/users`,
        ...config,
    });
};

export const getSubmission = async (submissionId: number, accessToken?: string): Promise<{
    submission: Submission
}> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/submissions/${submissionId}`,
        ...config,
    });
};

export const getSubmissionEvents = async (submissionId: number, accessToken?: string): Promise<{ events: Event[] }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/submissions/${submissionId}/events`,
        ...config,
    });
};

export const getMovieSubmissions = async (movieId: number, accessToken?: string): Promise<{
    submissions: Submission[]
}> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/movies/${movieId}/submissions`,
        ...config,
    });
};

export const postMovieSubmission = async (server_id: string, title: string, description: string, rating: number, tag_id: number | undefined, movies: Movie[],
                                          accessToken: string): Promise<{ submission: Submission }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "post",
        url: `/submissions`,
        data: {server_id, title, description, rating, tag_id, movies},
        ...config,
    });
};

// EVENTS
export const getEvents = async (accessToken?: string): Promise<{ events: Event[] }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/events`,
        ...config,
    });
};
export const getEvent = async (eventId: number, accessToken?: string): Promise<{ event: Event }> => {
    const config: AxiosRequestConfig = accessToken
        ? setAccessToken(accessToken)
        : {};

    return makeRequest({
        method: "get",
        url: `/events/${eventId}`,
        ...config,
    });
};
export const getEventEntries = async (eventId: number): Promise<{
    entries: { entry_id: number, score: number, status: number, submission: Submission }[]
}> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/events/${eventId}/entries`,
        ...config,
    });
};
export const getEventVotes = async (eventId: number): Promise<{
    votes: {
        submission: Submission,
        votes: { user: User, points: number }[]
    }[]
}> => {
    const config: AxiosRequestConfig = {};

    return makeRequest({
        method: "get",
        url: `/events/${eventId}/votes`,
        ...config,
    });
};
