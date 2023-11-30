'use client';

import { useState } from 'react';
import * as _ from 'lodash';
import { IUser } from '../types';

type SearchResult = {
  data: IUser[];
};

export function SearchBar() {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);

  const debouncedFetchSearchResults = _.debounce(fetchSearchResuts, 500);

  async function fetchSearchResuts(searchText: string) {
    const res = await fetch(`/api/search?q=${searchText}`);

    if (res.ok) {
      const json = (await res.json()) as SearchResult;
      setSearchResults(json.data);
    }
  }

  async function handleChange(text: string) {
    if (text.length === 0) {
      setSearchResults([]);
      return;
    }
    await debouncedFetchSearchResults(text);
  }

  return (
    <div>
      <input
        className="p-2 my-2 rounded-lg bg-gray-700"
        type="text"
        placeholder="Search"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
