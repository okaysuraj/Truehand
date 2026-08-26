import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#faf8f5] font-body-md text-on-surface flex flex-col justify-between pt-20 animate-pulse">
      
      {/* Main Skeleton Feed */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 space-y-12">
        
        {/* Top Hero Banner Skeleton */}
        <div className="w-full h-80 rounded-3xl bg-surface-container-high/60 flex items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="w-64 h-8 bg-surface-container-highest rounded-xl mx-auto" />
            <div className="w-96 h-4 bg-surface-container-highest/60 rounded-lg mx-auto" />
          </div>
        </div>

        {/* Category Pills Skeleton */}
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-24 h-9 rounded-full bg-surface-container-high/50" />
          ))}
        </div>

        {/* 2x4 Product Card Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="space-y-3">
              <div className="w-full h-56 rounded-2xl bg-surface-container-high/60" />
              <div className="space-y-1.5">
                <div className="w-3/4 h-3.5 bg-surface-container-highest rounded" />
                <div className="w-1/2 h-2.5 bg-surface-container-highest/60 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Story Split Banner Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 border-t border-outline-variant/20">
          <div className="w-full h-80 rounded-3xl bg-surface-container-high/60" />
          <div className="space-y-4">
            <div className="w-1/4 h-3 bg-surface-container-highest rounded" />
            <div className="w-3/4 h-8 bg-surface-container-highest rounded-xl" />
            <div className="space-y-2">
              <div className="w-full h-3 bg-surface-container-highest/60 rounded" />
              <div className="w-full h-3 bg-surface-container-highest/60 rounded" />
              <div className="w-2/3 h-3 bg-surface-container-highest/60 rounded" />
            </div>
            <div className="w-36 h-10 rounded-xl bg-surface-container-highest pt-2" />
          </div>
        </div>

      </main>

    </div>
  );
};

export default LoadingSkeleton;
