import { useState } from "react";
import GeneralsApis from "../services/generals.api";
import type { userInterface } from "../interface/userInterface";
import type { GitHubRepoInterface } from "../interface/repoInterface";
import Skeleton from "./repoSkeleton";



const Users = ({ user }: { user: userInterface }) => {
    const [toggle, setToggle] = useState<boolean>(false);
    const [reposData, setReposData] = useState<GitHubRepoInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRepos = () => {
        if (reposData.length !== 0 || loading) return;
        setLoading(true);
        GeneralsApis.getRepoList(user.login).then((res) => {
            setReposData(res);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    return (
        <div key={user.id}>
            <div
                className="flex w-full justify-between bg-white px-3 py-2 rounded cursor-pointer"
                onClick={() => { setToggle(!toggle); if (!toggle) fetchRepos(); }}
            >
                <span>{user.login}</span>
                <span>{toggle ? "▲" : "▼"}</span>
            </div>
            {toggle && (
                <div className="space-y-2 mt-2">
                    {loading ? (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    ) : (
                        reposData?.map((repo, idx) => (
                            <div
                                key={repo.id || idx}
                                className="bg-gray-200 rounded px-3 py-2 flex justify-between"
                            >
                                <div>
                                    <div className="font-semibold">{repo.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {repo.description}
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <span className="font-bold">{repo.stargazers_count}</span>
                                    <span>★</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Users;