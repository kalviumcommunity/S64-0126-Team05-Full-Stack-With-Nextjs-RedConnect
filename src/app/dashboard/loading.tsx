export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Dashboard Header Skeleton */}
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8"></div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="h-4 bg-gray-100 rounded w-24 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                    </div>
                ))}
            </div>

            {/* Content Skeleton */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96">
                <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
}
