import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(
    `http://localhost:4000/fruits?_page=${pageParam}&_per_page=10`
  );
};

const InfiniteQueries = () => {
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fruits"],
      queryFn: fetchFruits,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 6) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {data?.pages?.map((page) => {
        return page?.data?.data.map((fruit) => {
          return (
            <div className="fruit-item" key={fruit.id}>
              {fruit.name}
            </div>
          );
        });
      })}

      <div ref={ref} className="fetch-state-div">
        {isFetchingNextPage && "Loading..."}
        {isFetchingNextPage || "You are up-to-date!"}
      </div>
    </div>
  );
};

export default InfiniteQueries;
