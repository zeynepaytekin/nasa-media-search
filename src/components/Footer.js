import React from 'react';

function Footer() {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#1a1a2e',
      color: 'white',
      textAlign: 'center',
    }}>
      <p>© {new Date().getFullYear()} NASA Media App - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
