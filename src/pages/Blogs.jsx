import { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import api from "../api/axios";

import { setBlogs } from "../redux/blogSlice";

import BlogCard from "../components/BlogCard";

function Blogs() {

    const dispatch = useDispatch();

    const blogs = useSelector(
        state => state.blogs.blogs
    );

    useEffect(() => {

        const fetchBlogs = async () => {

            try {

                const response =
                    await api.get("/blogs");

                dispatch(
                    setBlogs(response.data)
                );

            } catch (error) {

                console.log(error);

            }

        };

        fetchBlogs();

    }, [dispatch]);

    return (

        <main className="min-h-screen bg-[#FCFAF6] text-[#2D211D]">

            {/* PAGE HEADER */}

            <section className="border-b border-[#D8C9B8]/70 bg-[#F7F1E7]">

                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                    <div className="max-w-3xl">

                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#B89B5E]">
                            The Journal
                        </p>

                        <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#5A1F2B] sm:text-6xl">
                            All Blogs
                        </h1>

                        <div className="mt-6 h-px w-20 bg-[#B89B5E]" />

                        <p className="mt-6 max-w-2xl text-base leading-8 text-[#75645B] sm:text-lg">
                            Explore stories, ideas and perspectives
                            from our collection of writers.
                            Discover something worth reading.
                        </p>

                    </div>

                </div>

            </section>


            {/* BLOG GRID */}

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

                {blogs.length > 0 ? (

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {blogs.map(blog => (

                            <BlogCard
                                key={blog.id}
                                blog={blog}
                            />

                        ))}

                    </div>

                ) : (

                    <div className="rounded-2xl border border-[#D8C9B8] bg-[#F7F1E7] px-6 py-16 text-center">

                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#5A1F2B] font-serif text-xl text-[#D8C39A]">
                            —
                        </div>

                        <h2 className="font-serif text-2xl font-semibold text-[#5A1F2B]">
                            No stories yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75645B]">
                            There are no blog posts to display right now.
                            Check back soon for new stories and ideas.
                        </p>

                    </div>

                )}

            </section>

        </main>
    );
}

export default Blogs;