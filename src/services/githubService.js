import axios from 'axios';

const GITHUB_SEARCH_API_URL = 'https://api.github.com/search/users?q';

export const fetchUserData = async ({ username, location, minRepos,page = 1 }) => {
  try {
    let query = `${username ? `user:${username}` : ''}`;

    if (location) {
      query += ` location:${location}`;
    }

    if (minRepos) {
      query += ` repos:>${minRepos}`;
    }

    const response = await axios.get(`${GITHUB_SEARCH_API_URL}?q=${query}&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('No results found');
  }
};
