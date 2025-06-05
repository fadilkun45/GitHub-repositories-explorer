import { useState, useRef, useCallback, useEffect } from "react";
import type { userListInterface } from "./interface/userInterface";
import GeneralsApis from "./services/generals.api";
import Users from "./components/Users";
import UserListSkeleton from "./components/userListSkeleton";
import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";

const App = () => {
  const [search, setSearch] = useState("");
  const [userListData, setUserListData] = useState<userListInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = useCallback(
    async (reset = false) => {
      if (!search) return;
      setIsLoading(true);
      try {
        const res = await GeneralsApis.getUsersList(`?q=${search}&page=${reset ? 1 : page}`);
        if (reset) {
          setUserListData(res);
        } else {
          setUserListData((prev) =>
            prev
              ? { ...res, items: [...prev.items, ...res.items] }
              : res
          );
        }
        setHasMore(res.items.length > 0);
      } finally {
        setIsLoading(false);
      }
    },
    [search, page]
  );

  const handleSearch = () => {
    setPage(1);
    setUserListData(null);
    fetchUsers(true);
  };

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      setShowToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!userListData?.items.length || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    });
    if (lastUserRef.current) observer.current.observe(lastUserRef.current);
  }, [userListData, isLoading, hasMore]);

  useEffect(() => {
    if (page === 1) return;
    fetchUsers();
  }, [page]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg">
  <div className="relative">
  <input
          className="w-full pe-4 bg-white border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <XMarkIcon className={`${!search && "hidden"} w-6 h-6 absolute right-2 top-2 text-gray-700`} onClick={() => setSearch("")} />
  </div>
        <button
          className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600 transition font-semibold shadow"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Search"}
        </button>

        <div className="space-y-2">
        <p className={`${!userListData?.items && "hidden"} text-lg text-gray-500 font-medium`}>Data Found : {userListData?.total_count}</p>
        <p className={`${(userListData !== null)  && "hidden"} text-lg text-center text-gray-400 font-medium`}>Find your friend github repo or something inspiration</p>

          {userListData?.items.map((user, idx) => {
            const isLast = idx === userListData.items.length - 1;
            return (

              <div
                key={user.id}
                ref={isLast ? lastUserRef : undefined}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 px-4 py-3  mb-2"
              >
                <Users user={user} />
              </div>
            );

          })}
          {
            (userListData?.items.length === 0 && search) && <p className="text-center">user not found</p>
          }
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => <UserListSkeleton key={i} />)}
        </div>
      </div>
      {showToTop && (
        <button
          onClick={handleToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition z-50"
          aria-label="Scroll to top"
        >
          <ChevronDoubleUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;