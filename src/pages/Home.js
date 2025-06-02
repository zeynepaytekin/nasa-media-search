// src/pages/Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNasaMedia } from '../utils/api';

function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('image');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchResults(1);
  };

  const fetchResults = async (pageNumber) => {
    setLoading(true);
    setError('');

    try {
      const items = await fetchNasaMedia(query, filter, pageNumber);
      setResults(items);

      if (items.length === 0) {
        setError('No results found.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data. Please try again.');
    }

    setLoading(false);
  };

  const handlePageChange = async (newPage) => {
    setPage(newPage);
    await fetchResults(newPage);
  };

  const handleImageClick = (nasa_id, title, description) => {
    navigate(`/detail/${nasa_id}`, {
      state: {
        mediaType: filter,
        title,
        description
      }
    });
  };

  return (
    <div className="App">
      <h1>NASA Media Search 🌌</h1>

      <form onSubmit={handleSearch} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        marginTop: '35px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search term"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
              height: '42px',
              boxSizing: 'border-box',
              width: '250px',
              padding: '0 12px',
              lineHeight: '42px',
              marginTop: '20px'
            }}
          />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '42px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0 12px',
          backgroundColor: 'white'
        }}>
          <select
            className="select-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>
        <button type="submit" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          height: '42px',
          boxSizing: 'border-box',
          minWidth: '100px'
        }}>
          Search
        </button>
      </form>

      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <div className="grid">
            {results.map((item, index) => {
              const imgSrc = item.links?.[0]?.href;
              const nasa_id = item.data?.[0]?.nasa_id;
              const title = item.data?.[0]?.title;
              const description = item.data?.[0]?.description;

              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => handleImageClick(nasa_id, title, description)}
                >
                  <img src={imgSrc} alt={title} />
                  <div className="card-title">{title}</div>
                </div>
              );
            })}
          </div>

          {results.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={{ marginRight: '10px' }}
              >
                Previous Page
              </button>
              <button onClick={() => handlePageChange(page + 1)}>
                Next Page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
