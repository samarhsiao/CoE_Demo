import React from 'react';

const DestinationCard = ({ destination }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 根據圖片方向調整高度 */}
        <img
          src={destination.image}
          alt={destination.name}
          className={`w-full ${destination.orientation === 'vertical' ? 'h-[400px]' : 'h-[300px]'} object-cover`}
        />
        
        {/* 文字區塊留白較大 */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">{destination.name}</h2>
          <p className="text-gray-600 text-sm">{destination.description}</p>
        </div>
      </div>
    );
  };
export default DestinationCard;
