import { API_BASE_URL, ENDPOINTS } from '../config/api';

const fetchApi = async (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

export const fetchCategories = () => fetchApi(ENDPOINTS.CATEGORIES);

export const fetchPosts = (params) => fetchApi(ENDPOINTS.POSTS, params);

export const fetchMedia = (id) => fetchApi(`${ENDPOINTS.MEDIA}/${id}`);
