const UserListSkeleton = () => (
  <div className="animate-pulse flex items-center space-x-4 p-2 bg-white rounded">
    <div className="rounded-full bg-gray-300 h-10 w-10" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

export default UserListSkeleton;