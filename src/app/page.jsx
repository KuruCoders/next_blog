"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data); // Update the state with the fetched posts
        setLoading(false); // Indicate that loading has finished
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => setLoading(false));
  }, [""]);

  const searchPost = (e) => {
    if (e.type == "keydown" && e.key !== 'Enter') {
      return;
    }
    fetch(process.env.NEXT_PUBLIC_API_URL + "posts?q=" + inputRef.current.value)
      .then((res) => res.json())
      .then((res) => setPosts(res));
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </main>
      <div className="flex justify-end px-4 mb-5">
        <input
          type="text"
          ref={inputRef}
          disabled={loading}
          onKeyDown={searchPost}
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          disabled={loading}
          onClick={searchPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? posts.map((post) => (
          <Link href={"/post/" + post._id}>
            <div className="border border-gray-200 p-4">
              <img
                className="w-full h-48 object-cover mb-4"
                src={post.image}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))
          : (
            <p className="text-xl text-center font-semibold mb-2">No posts available</p>
          )
        }
      </div>
    </>
  );
}
