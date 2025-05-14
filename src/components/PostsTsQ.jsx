import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

// GET method
const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

// Post method
const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsTsQ = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime: 30000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: addPost,
    // onSuccess: (newData) => {
    //   // queryClient.invalidateQueries("posts");
    //   queryClient.setQueryData(["posts"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data],
    //     };
    //   });
    // },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPostData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { ...newPost, id: String(oldQueryData?.data?.length + 1) },
          ],
        };
      });

      return {
        previousPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.previousPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = { title, body };

    addPostMutation(post);

    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          value={title}
        />

        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post body"
          value={body}
        />

        <button type="submit">Post</button>
      </form>

      <button onClick={refetch} className="reload-btn">
        {data ? "Reload Posts" : "Fetch Posts"}
      </button>

      {data?.data.map((post) => (
        <Link to={`/tsq-posts/${post.id}`} key={post.id}>
          <div className="post-item" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsTsQ;
