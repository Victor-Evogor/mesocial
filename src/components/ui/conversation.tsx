import { Conversation, User } from '@/types';

interface ConversationListProps {
    conversations: Conversation[];
}

const placeholderConversations: User[] = [
    { id: '1', name: 'John Doe', username: '@johndoe' },
    { id: '2', name: 'Jane Smith', username: '@janesmith' },
    // Add more placeholder data as needed
];

const ConversationList: React.FC<ConversationListProps> = ({ conversations }) => {
    return (
        <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.length > 0 ? (
                    conversations.map((convo) => (
                        <div key={convo.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {convo.user? convo.user.name: "Anonymous user"} ({convo.user? convo.user.username : "No username"})
                            {convo.lastMessage && <div className="text-sm text-gray-500">{convo.lastMessage}</div>}
                        </div>
                    ))
                ) : (
                    placeholderConversations.map((person) => (
                        <div key={person.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {person.name} ({person.username})
                            <div className="text-sm text-gray-500">Popular</div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default ConversationList;