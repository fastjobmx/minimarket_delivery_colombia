'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = 'Buscar productos...' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-smooth press-scale"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;