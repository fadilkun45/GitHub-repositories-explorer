import { useState } from "react";
import GeneralsApis from "../services/generals.api";
import type { userInterface } from "../interface/userInterface";
import type { GitHubRepoInterface } from "../interface/repoInterface";
import Skeleton from "./repoSkeleton";
import { ChevronDoubleDownIcon } from "@heroicons/react/16/solid";

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
                className="flex w-full items-center justify-between bg-white px-3 py-2 rounded cursor-pointer"
                onClick={() => { setToggle(!toggle); if (!toggle) fetchRepos(); }}
            >
                <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 rounded-full" />
                <span>{user.login}</span>
                <ChevronDoubleDownIcon className={`${toggle && "transform rotate-180 "} transition duration-300 text-gray-600 w-6 h-6`} />
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
                       reposData.length > 0 ?  reposData?.map((repo, idx) => (
                        <a
                            href={repo.html_url}
                            key={repo.id || idx}
                            target="_blank"
                            className="bg-gray-200 rounded px-3 py-2 flex justify-between hover:rotate-x-6 transform hover:rotate-y-6 duration-300 transition-all"
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
                        </a>
                    )) : <p className="text-sm text-center">user has not have public repositories</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Users;