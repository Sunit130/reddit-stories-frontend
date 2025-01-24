import { GET_ALL_PROCESSED_VIDEOS_ENDPOINT, SEND_MESSAGE_PQ_ENDPOINT, UPLOAD_TO_YOUTUBE_ENDPOINT } from "@/app/apiPath"
import { PostPriorityQueuePayloadInterface } from "@/app/types";

export const fetchPosts = async () => {
    try {
        const response = await fetch(GET_ALL_PROCESSED_VIDEOS_ENDPOINT);

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};



export const makeVideoPublic = async (video_id: string) => {
    try {
        const response = await fetch(UPLOAD_TO_YOUTUBE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                video_id: video_id,
            }),
        });

        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error making video public:', error);
        throw error;
    }
};


export const sendPostPriorityQueue = async (post: PostPriorityQueuePayloadInterface) => {
    try {
        const response = await fetch(SEND_MESSAGE_PQ_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "post": post,
            }),
        });

        if (!response.ok) {
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error making video public:', error);
        throw error;
    }
};
