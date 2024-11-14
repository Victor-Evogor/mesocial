import { useState } from 'react';
import { Search } from 'lucide-react';
import { User } from '@/types';

interface SearchSectionProps {
    onSearch: (query: string) => void;
    searchResults: User[];
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, searchResults }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by username or name"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(e.target.value);
                            onSearch(e.target.value);
                        }}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div key={result.id} className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            {result.name} ({result.username})
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-gray-500">No results found</div>
                )}
            </div>
        </div>
    );
};

export default SearchSection;