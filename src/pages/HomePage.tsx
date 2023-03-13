import { useEffect, useState } from "react";
import { useDobounce } from "../hooks/debounce";
import RepoCard from "../RepoCard";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";

function HomePage() {
  const [search, setSearch] = useState("");
  const [drop, setDrop] = useState(false);
  const debounced = useDobounce(search);

  useEffect(() => {
    setDrop(debounced.length > 3 && data?.length! > 0);
  }, [debounced]);

  const [fetchRepos, { isLoading: reposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  function clickHandler(username: string) {
    fetchRepos(username);
    setDrop(false);
    setSearch("");
  }

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}
      <div className="relative w-[560px]">
        <input
          className="border py-2 px-4 w-full h-[42px] mb-2"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {drop && (
          <ul className="list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {reposLoading && <p>Repos are loading...</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
