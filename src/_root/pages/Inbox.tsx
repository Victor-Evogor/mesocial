import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { getUserConversations, sendMessage, createConversation, getUsers } from '@/lib/appwrite/api';
import { User, Conversation, Message } from '@/types';

const Inbox: React.FC = () => {
    const { user } = useUserContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (user?.$id) {
            loadUserConversations();
        }
    }, [user]);

    const loadUserConversations = async () => {
        if (!user?.$id) return;
        const userConversations = await getUserConversations(user.$id);
        if (userConversations) {
            setConversations(userConversations);
        }
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            const users = await getUsers();
            if (users) {
                const filtered = users.documents.filter((u: Models.Document) => 
                    u.name.toLowerCase().includes(query.toLowerCase()) &&
                    u.$id !== user?.$id
                );
                setSearchResults(filtered);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSendMessage = async () => {
        if (!selectedConversation || !newMessage.trim() || !user?.$id) return;

        const sent = await sendMessage(
            selectedConversation.id,
            user.$id,
            newMessage.trim()
        );

        if (sent) {
            setNewMessage('');
            loadUserConversations();
        }
    };

    const startNewConversation = async (otherUser: User) => {
        if (!user?.$id) return;

        const existing = conversations.find(conv => 
            conv.participants.includes(otherUser.id) && 
            conv.participants.includes(user.$id)
        );

        if (existing) {
            setSelectedConversation(existing);
        } else {
            const newConv = await createConversation([user.$id, otherUser.id]);
            if (newConv) {
                loadUserConversations();
                setSelectedConversation(newConv);
            }
        }
        setSearchResults([]);
        setSearchQuery('');
    };

    return (
        <div className="flex flex-col md:flex-row flex-1 h-full">
            <div className="w-full md:w-1/3 border-b md:border-r border-gray-200 dark:border-gray-700">
                {/* Search Section */}
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                    {searchResults.length > 0 && (
                        <div className="mt-2">
                            {searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    onClick={() => startNewConversation(result)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                >
                                    {result.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Conversations List */}
                <div className="overflow-y-auto">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => setSelectedConversation(conversation)}
                            className={`p-4 cursor-pointer hover:bg-gray-100 ${
                                selectedConversation?.id === conversation.id ? 'bg-gray-100' : ''
                            }`}
                        >
                            <div className="font-semibold">
                                {conversation.participants.filter(id => id !== user?.$id).join(', ')}
                            </div>
                            <div className="text-sm text-gray-500">
                                {conversation.lastMessage || 'No messages yet'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {selectedConversation.messages.map((message: Message) => (
                                <div
                                    key={message.id}
                                    className={`mb-4 ${
                                        message.senderId === user?.$id
                                            ? 'text-right'
                                            : 'text-left'
                                    }`}
                                >
                                    <div
                                        className={`inline-block p-2 rounded-lg ${
                                            message.senderId === user?.$id
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 p-2 border rounded-lg"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a conversation or start a new one
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
