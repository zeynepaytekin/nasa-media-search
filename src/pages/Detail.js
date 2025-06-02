// src/pages/Detail.js

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchNasaAsset } from '../utils/api';

function Detail() {
  const { nasa_id } = useParams();
  const location = useLocation();
  const mediaType = location.state?.mediaType || 'image';
  const title = location.state?.title || '';
  const description = location.state?.description || '';

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const items = await fetchNasaAsset(nasa_id);
        setAssets(items);
      } catch (error) {
        console.error('Error fetching asset:', error);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [nasa_id]);

  if (loading) return <div className="spinner"></div>;
  if (assets.length === 0) return <div>No data found.</div>;

  const videoAssets = assets.filter(asset => asset.href.endsWith('.mp4'));
  const imageAssets = assets.filter(asset =>
    (asset.href.endsWith('.jpg') || asset.href.endsWith('.png')) &&
    !asset.href.toLowerCase().includes('thumb')
  );

  return (
    <div className="App">
      <h1>Asset Detail</h1>
      <h2>{title}</h2>

      {mediaType === 'image' && imageAssets.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <img src={imageAssets[0].href} alt={title} style={{ maxWidth: '80%' }} />
        </div>
      )}

      {mediaType === 'video' && videoAssets.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <video controls style={{ maxWidth: '80%' }}>
            <source src={videoAssets[0].href} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {description && (
        <div style={{
          marginTop: '20px',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'left',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '16px',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#6a4fd3' }}>Description</h3>
          <p>{description}</p>
        </div>
      )}

      <Link to="/" className="button-primary">
        Back to Search
      </Link>
    </div>
  );
}

export default Detail;
