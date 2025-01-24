export interface RedditPost {
    post_character: "male" | "female"; // Assuming only these two values are possible
    post_date: string; // ISO 8601 date-time string
    post_id: string; // Unique identifier for the post
    post_link: string; // URL of the post
    post_normalized_score: number; // Normalized score (e.g., a decimal value)
    post_progress: "YT_PUBLIC" | "YT_UNLISTED" | "VIDEO_QUEUED" | "SCRIPT_READY"; // Limited set of possible states
    post_revised_content: string; // Revised content snippet
    post_revised_content_length: number; // Length of the revised content
    post_revised_title: string; // Revised title of the post
    post_score: number; // Reddit score
    post_sub_reddit: string; // Name of the subreddit
    video_id: string; // ID of the corresponding video (can be empty string)
}


export interface PostPriorityQueuePayloadInterface {
    "Post ID": string,
    "Post Revised Title": string,
    "Post Revised Content": string
}


export interface MakeVideoModalInterface { 
    id: string; 
    title: string; 
    description: string
}

export interface ScriptInterface { 
    id: string; 
    title: string; 
    description: string
}