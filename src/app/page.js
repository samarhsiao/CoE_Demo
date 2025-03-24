'use client';

import React, { useState, useEffect } from 'react';
import { destinations } from './data/destinations'
const Home = () => {
  const [loadingType, setLoadingType] = useState('async'); // 'sync' or 'async'
  const [loadedImages, setLoadedImages] = useState([]);
  const [startTime, setStartTime] = useState(0); // 記錄開始時間
  const [totalTime, setTotalTime] = useState(0); // 記錄總耗時
 
  useEffect(() => {
    const loadImages = async () => {
      setLoadedImages([]); // Reset loaded images
      // 開始計時
      setTotalTime(0);
      setStartTime(Date.now()); // 記錄開始時間

      if (loadingType === 'sync') {
        // // Synchronous loading (simulated) - blocks the UI
        // destinations.forEach((destination) => {
        //   const img = new Image();
        //   img.src = destination.src + `?t=${Date.now()}`;
        //   // Simulate waiting for the image to load (BAD PRACTICE in real-world async scenarios)
         
        //   img.onload =()=> {
        //     console.log(img)
        //     setLoadedImages((prev) => [...prev, destination.id]);
          
          
        //   }
          
          
        // });
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
          setTotalTime(Date.now() - startTime); // 記錄總耗時 
        };
        loadSequentially()
            

      } else {
        // Asynchronous loading using Promises - non-blocking
        const promises = destinations.map(
          (destination) =>
            new Promise((resolve) => {
              const img = new Image();
              
              img.src = destination.src + `?t=${Date.now()}`;
              
              img.onload = () => {
                console.log(img)
                setLoadedImages((prev) => [...prev, destination.id]);
                resolve();
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${destination.src}`);
                resolve(); // Resolve even on error to prevent Promise.all from rejecting
              };
            })
        );
        await Promise.all(promises);
        setTotalTime(Date.now() - startTime);
      }
    };

    loadImages();
  }, [loadingType]);  // React to changes in loadingType

  const isLoading = loadedImages.length < destinations.length;  // Determine loading state

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          2024 Top Travel Destinations
        </h1>

        <div className="flex justify-center gap-4 mb-4">
  {/* 同步按鈕 */}
  <button
    className={`px-6 py-2 rounded-lg ${
      loadingType === 'sync' 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={() => setLoadingType('sync')}
  >
    同步載入 (模擬 UI 阻塞)
  </button>

  {/* 非同步按鈕 */}
  <button
    className={`px-6 py-2 rounded-lg ${
      loadingType === 'async' 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
    onClick={() => setLoadingType('async')}
  >
    非同步載入
  </button>
</div>

        {isLoading && (
          <div className="text-center mt-4">
            <p className="text-gray-600">
              載入中... ({loadedImages.length}/{destinations.length}) 
              
            </p>
          </div>
        )}
        <p className="text-gray-600">{ `總耗時: ${Math.round(totalTime / 1000)}秒`}</p>
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

export default Home;