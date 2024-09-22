import React, { useState } from 'react';

const Search = ({ fetchUserData }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData({ username, location, minRepos, page: 1 });
      setUserData(data);
      setPage(1); // Reset page number to 1 after a new search
    } catch (err) {
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreUsers = async () => {
    setLoading(true);
    try {
      const moreData = await fetchUserData({ username, location, minRepos, page: page + 1 });
      setUserData((prevData) => ({
        ...moreData,
        items: [...prevData.items, ...moreData.items],
      }));
      setPage(page + 1);
    } catch (err) {
      setError('Error loading more users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 w-full max-w-lg"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 w-full max-w-lg"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum Repositories"
          className="border p-2 w-full max-w-lg"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Search
        </button>
      </form>

      {/* Conditional rendering for loading, error, and user data */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div className="mt-8">
          <ul className="space-y-4">
            {userData.items.map((user) => (
              <li key={user.id} className="border p-4 rounded">
                <div className="flex items-center space-x-4">
                  <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                  <div>
                    <h2 className="font-bold text-lg">{user.login}</h2>
                    <p>{user.location}</p>
                    <p>Repositories: {user.public_repos}</p>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      View Profile
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Load More Button */}
          <button onClick={loadMoreUsers} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
