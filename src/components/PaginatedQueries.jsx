import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits?_page=${pageId}&_per_page=4`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(page);

  return (
    <div className="container">
      {data?.data?.data.map((item) => (
        <div className="fruit-label" key={item.id}>
          {item.name}
        </div>
      ))}

      <button onClick={() => setPage(data?.data?.prev)} disabled={page <= 1}>
        Prev Page
      </button>
      <button onClick={() => setPage(data?.data?.next)} disabled={page === 15}>
        Next Page
      </button>
    </div>
  );
};

export default PaginatedQueries;
