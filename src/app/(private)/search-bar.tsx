'use client';

import { MouseEvent, useEffect, useRef, useState } from 'react';
import * as _ from 'lodash';
import { IUser } from '../types';
import { User } from '../components/User';

type SearchResult = {
  data: IUser[];
};

export function SearchBar() {
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const [visible, setVisible] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);

  const debouncedFetchSearchResults = _.debounce(fetchSearchResuts, 500);

  async function fetchSearchResuts(searchText: string) {
    const res = await fetch(`/api/search?q=${searchText}`);

    if (res.ok) {
      const json = (await res.json()) as SearchResult;
      setVisible(true);
      setSearchResults(json.data);
    } else {
      setSearchResults([]);
      setVisible(false);
    }
  }

  async function handleChange(text: string) {
    await debouncedFetchSearchResults(text);
  }

  function handleClick(e: MouseEvent<HTMLInputElement>) {
    setVisible(true);
  }

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div
      className="relative flex flex-row w-full max-w-md justify-end"
      ref={ref}
    >
      <input
        className="p-2 my-2 rounded-lg bg-gray-700 max-w-xs"
        type="text"
        placeholder="Search"
        onChange={(e) => handleChange(e.target.value)}
        onClick={handleClick}
      />
      {visible && searchResults.length > 0 && (
        <ul className="absolute top-14 right-2 p-2 w-full max-w-sm flex flex-col bg-gray-700 rounded-lg">
          {searchResults.map((res) => (
            <li className="my-3" key={res.id} onClick={() => setVisible(false)}>
              <User href={res.username} user={res} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
