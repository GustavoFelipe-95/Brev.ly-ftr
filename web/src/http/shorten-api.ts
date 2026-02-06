import { api } from "./api";

const header = { 'Content-Type': 'application/json' };

export async function findOneShortened(shortenedLink: string) {
    const response = await api.get(`/${shortenedLink}`, { headers: header });
    if (response.status !== 200) {
        throw new Error("Failed to fetch the shortened link");
    }
    return response;
}

export async function findAllShortened() {
    const response = await api.get("/", { headers: header });
    if (response.status !== 200) {
        throw new Error("Failed to fetch shortened links");
    }
    return response.data;
}

export async function generatedCSVAllShortened() {
    const response = await api.get("/export", { headers: header });
    if (response.status !== 200) {
        throw new Error("Failed to export CSV");
    }
    return response.data;
}

export async function newShortenedLink(data: { originalLink: string, shortenedLink: string }) {
    try {
        const header = { 'Content-Type': 'application/json' };
        const body = {
            "originalURL": data.originalLink,
            "shortURL": data.shortenedLink
        }
        const response = await api.post("/", body, { headers: header });
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function removeShortenedLink(shortenedLink: string) {
    const response = await api.delete(`/${shortenedLink}`, { headers: header });
    if (response.status !== 204) {
        throw new Error("Failed to delete shortened link");
    }
    return response.status === 204;
}