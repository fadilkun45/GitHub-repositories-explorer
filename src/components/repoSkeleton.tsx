const Skeleton = () => (
    <div className="bg-gray-200 rounded px-3 py-2 flex justify-between animate-pulse">
        <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-40"></div>
        </div>
        <div className="flex space-x-1 items-center">
            <div className="h-4 w-6 bg-gray-300 rounded"></div>
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);

export default Skeleton;