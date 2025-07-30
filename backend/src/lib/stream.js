import { StreamChat } from "stream-chat";
import "dotenv/config";

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;

if (!api_key || !api_secret) {
    console.error("Stream API key or secret is not set.");
}

const streamUser = StreamChat.getInstance(api_key, api_secret);

export const upsertStreamUser = async (userData) => {
    try {
        await streamUser.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error("Error in upsertStreamUser:", error.message);
    }
}

export const generateToken = (userId) => {}