import type { LoaderFunctionArgs } from "react-router";
import { findOneShortened } from "../http/shorten-api";
import type { IShortLinkOutput } from "../types/link";

type Parameters = {
    shortenedLink: string;
}

export async function searchOneShortLink({
    params,
}: LoaderFunctionArgs): Promise<IShortLinkOutput>{
    const { shortenedLink } = params as Parameters;
    
    const { data } = await findOneShortened(shortenedLink);

    if (!data) { throw new Error("Short link not found") }

    return data;
}