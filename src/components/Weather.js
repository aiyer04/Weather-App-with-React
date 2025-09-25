import React from 'react';

export default function Weather({ description }) {
  return (
    <div className="weather">{description}</div>
  );
}
