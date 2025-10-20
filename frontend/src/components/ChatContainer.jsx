import React, { useEffect, useRef } from "react";
import { messageStore } from "../store/messageStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { userAuthStore } from "../store/userAuthStore";
import formatMessageDate from "../lib/utills";

const ChatContainer = () => {
    const { messages, fetchMessages, selectedUser, isLoadingMessages, subscribeToMessage, unsubscribFromMessage } = messageStore();
    const { authUser } = userAuthStore();
    //const messageEndRef = useRef(null)

    useEffect(() => {

        fetchMessages(selectedUser._id);
        subscribeToMessage()
        return () => unsubscribFromMessage()


    }, [selectedUser._id, fetchMessages, subscribeToMessage, unsubscribFromMessage]);
{/*
    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }

    }, [messages])*/}

    if (isLoadingMessages)
        return (
            <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );

    return (
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
            <ChatHeader />
            <div
                className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                style={{ scrollBehavior: "smooth" }}
            >
                {messages.map((message) => {
                    const isOwnMessage = message.senderId === authUser._id;
                    return (
                        <div
                            key={message._id}
                            className={`flex items-end gap-2 sm:gap-3 ${isOwnMessage ? "justify-end" : "justify-start"
                                }`}
                        >
                            {!isOwnMessage && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={selectedUser.profilePic || "/avatar.png"}
                                        alt="avatar"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                                    />
                                </div>
                            )}
                            <div
                                className={`max-w-[75%] sm:max-w-[65%] md:max-w-[55%] px-3 sm:px-4 py-2 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${isOwnMessage
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
                                    }`}
                            >
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="sent"
                                        className="rounded-xl mb-2 max-w-full sm:max-w-[250px] md:max-w-[300px] object-cover shadow-sm"
                                    />
                                )}
                                {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}

                                <span
                                    className={`block text-[0.65rem] sm:text-[0.7rem] mt-1 ${isOwnMessage
                                        ? "text-blue-100 opacity-80"
                                        : "text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {formatMessageDate(message.createdAt)}
                                </span>
                            </div>
                            {isOwnMessage && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={authUser.profilePic || "/avatar.png"}
                                        alt="avatar"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <MessageInput />
        </div>
    );
};

export default ChatContainer;
