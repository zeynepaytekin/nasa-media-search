// src/utils/api.js

export const fetchNasaMedia = async (query, filter, pageNumber) => {
  const url = `${process.env.REACT_APP_NASA_API_URL}/search?q=${query}&media_type=${filter}&page=${pageNumber}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.collection?.items || [];
};

export const fetchNasaAsset = async (nasa_id) => {
  const url = `${process.env.REACT_APP_NASA_API_URL}/asset/${nasa_id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data.collection?.items || [];
};
