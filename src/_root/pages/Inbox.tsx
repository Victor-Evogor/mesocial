import React, { useState } from 'react';
import SearchSection from '@/components/ui/search';
import ConversationList from '@/components/ui/conversation';
import { User, Conversation } from '@/types';

const Inbox: React.FC = () => {
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    const handleSearch = (query: string) => {
        // Implement actual search logic here
        console.log('Searching for:', query);
        // Update searchResults state with the results
    };

    return (
        <div className="flex flex-col md:flex-row flex-1 h-full">
            <div className="w-full md:w-1/3 border-b md:border-r border-gray-200 dark:border-gray-700">
                <SearchSection onSearch={handleSearch} searchResults={searchResults} />
            </div>
            <div className="flex-1 flex flex-col">
                <ConversationList conversations={conversations} />
            </div>
        </div>
    );
};

export default Inbox;