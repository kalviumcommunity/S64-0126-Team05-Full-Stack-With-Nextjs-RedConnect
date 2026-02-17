"use client";

import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";

export default function SWRDebug() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const { cache } = useSWRConfig();
  const [cacheKeys, setCacheKeys] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Update cache keys when cache changes
    const updateKeys = () => {
      const keys = Array.from(cache.keys());
      setCacheKeys(keys);
    };

    updateKeys();
    const interval = setInterval(updateKeys, 1000);
    return () => clearInterval(interval);
  }, [cache]);

  const getCacheData = (key: string) => {
    try {
      const data = cache.get(key);
      if (!data) return "No data";
      
      const stringified = JSON.stringify(data, null, 2);
      const isTruncated = stringified.length > 200;
      const preview = stringified.substring(0, 200);
      
      return isTruncated ? preview + "..." : preview;
    } catch {
      return "Error reading cache";
    }
  };

  // Only render debug component in development mode
  if (!isDevelopment) {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-xs hover:bg-blue-700 shadow-lg"
      >
        🔍 SWR Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-md max-h-96 overflow-y-auto z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-900">SWR Cache Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      <div className="text-xs text-gray-600 mb-2">
        Active Cache Keys: {cacheKeys.length}
      </div>

      <div className="space-y-2">
        {cacheKeys.map((key) => (
          <div key={key} className="border border-gray-200 rounded p-2">
            <div className="text-xs font-medium text-gray-700 truncate">{key}</div>
            <div className="text-xs text-gray-500 mt-1">
              {getCacheData(key)}
            </div>
          </div>
        ))}

        {cacheKeys.length === 0 && (
          <div className="text-xs text-gray-500 text-center py-4">
            No active cache entries
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <button
          onClick={() => {
            // Clear all cached data by deleting each key
            cacheKeys.forEach(key => {
              cache.delete(key);
            });
            setCacheKeys([]);
          }}
          className="w-full text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
        >
          Clear Cache
        </button>
      </div>
    </div>
  );
}