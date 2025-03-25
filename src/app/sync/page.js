'use client';

import React, { useState, useEffect } from 'react';
import { destinations } from '../data/destinations'
const SyncPage = () => {
  const [loadingType, setLoadingType] = useState('sync'); 
  const [loadedImages, setLoadedImages] = useState([]);
  const [totalTime, setTotalTime] = useState(0); // 記錄總耗時
 
  useEffect(() => {
    const loadImages = async () => {
      setLoadedImages([]); // Reset loaded images
      // 開始計時
      setTotalTime(0);
      const startTime =  Date.now(); // 記錄開始時間

      if (loadingType === 'sync') {
        const loadSequentially = async () => {
          for (let i = 0; i < destinations.length; i++) {
            await new Promise((resolve) => {
              const img = new Image();
              img.src = destinations[i].src + `?t=${Date.now()}`; // 強制重新載入
              img.onload = () => {
                setLoadedImages(prev => [...prev, destinations[i].id]);
                resolve();
              };
            });
          }
        const endTime = Date.now() 
        const spend = endTime - startTime
        setTotalTime(spend);
        };
        loadSequentially()
            

      } 
    };

    loadImages();
  }, [loadingType]);  // React to changes in loadingType

  function formatTime(totalTime) {
    const totalSeconds = Math.floor(totalTime / 1000); // 轉為秒並取整
    const minutes = Math.floor(totalSeconds / 60); // 計算分鐘
    const seconds = totalSeconds % 60; // 計算剩餘秒數
    return `${minutes}分鐘${seconds}秒`;
  }

  const isLoading = loadedImages.length < destinations.length;  // Determine loading state

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          2024 Top Travel Destinations
        </h1>

        <div className="flex justify-center gap-4 mb-4">
</div>

        {isLoading && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              載入中... ({loadedImages.length}/{destinations.length})        
            </p>
          </div>
        )}
        <p className="font-bold text-gray-600 p-1">載入方式: 同步載入</p>
        <p className="text-gray-600">{ `總耗時: ${formatTime(totalTime)}`}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="relative group">
              {/* 圖片 */}
              <img
                src={destination.src}
                alt={destination.alt}
                className="w-full h-auto rounded-md object-cover"
              />
              
              {/* Loading indicator */}
              {!loadedImages.includes(destination.id) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )}
              
              {/* 覆蓋層 */}
              <div className="absolute inset-0 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default SyncPage;