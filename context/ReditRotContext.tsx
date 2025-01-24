"use client"
import { MakeVideoModalInterface, RedditPost } from "@/app/types";
import React, { createContext, useReducer } from "react";

export const initialState: ReditRotStateType = {
    publicPosts: [],
    unlistedPosts: [],
    contentPosts: [],
    isLeftSidebarOpen: true,
    isRightSidebarOpen: true,
    isMakeVideoModalOpen: false,
    makeVideoModalScript: undefined
};

type Action =
    | { type: any; value: any }
    | { type: "setAllPosts"; value: any }

export type ReditRotStateType = {
    publicPosts?: RedditPost[];
    unlistedPosts?: RedditPost[];
    contentPosts?: RedditPost[];
    priorityQueue?: RedditPost[];
    isLeftSidebarOpen?: boolean;
    isRightSidebarOpen?: boolean;
    isMakeVideoModalOpen?: boolean;
    makeVideoModalScript?: MakeVideoModalInterface;
};

type Dispatch = (action: Action) => void;

export const reducer = (state: ReditRotStateType, action: Action) => {
    switch (action.type) {
        case "setAllPosts":
            return { ...state, ...{ 
                publicPosts: action.value["public_videos"],
                unlistedPosts: action.value["unlisted_videos"],
                contentPosts: action.value["content_ready"],
                priorityQueue: action.value["priority_queue"]
            }};
        case "setIsLeftSideOpen":
            return { ...state, ...{ isLeftSidebarOpen: action.value } };
        case "setIsRightSideOpen":
            return { ...state, ...{ isRightSidebarOpen: action.value } };
        
        default:
            return { ...state, [action.type]: action.value };
    }
};

export const ReditRot = createContext<
    { state: ReditRotStateType; dispatch: Dispatch } | undefined
>(undefined);

export const useReditRotContext = () => {
    const context = React.useContext(ReditRot);
    if (context === undefined) {
        throw new Error("utilContext must be used within a utilProvider");
    }
    return context;
};


export const ReditRotProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ReditRot.Provider value={{ state, dispatch }}>
            {children}
        </ReditRot.Provider>
    );
}