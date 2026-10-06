import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    Link
} from "react-router-dom";

import {
    Badge,
    Button,
    Spinner
} from "flowbite-react";

import api from "../api/axios";

function BlogDetails() {

    const { id } = useParams();

    const [blog, setBlog] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const fetchBlog = async () => {

            try {

                setLoading(true);

                const response =
                    await api.get(
                        `/blogs/${id}`
                    );

                setBlog(response.data);

            } catch (error) {

                console.error(error);

                setError(
                    "Blog not found."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchBlog();

    }, [id]);

    /* LOADING */

    if (loading) {

        return (

            <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6]">

                <div className="flex flex-col items-center gap-4">

                    <Spinner
                        size="xl"
                        className="fill-[#5A1F2B] text-[#D8C9B8]"
                    />

                    <p className="text-sm tracking-wide text-[#75645B]">
                        Loading story...
                    </p>

                </div>

            </main>
        );
    }

    /* ERROR */

    if (error) {

        return (

            <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6] px-6">

                <div className="w-full max-w-xl rounded-3xl border border-[#D8C9B8] bg-[#F7F1E7] px-8 py-16 text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                        The Journal
                    </p>

                    <h2 className="mb-6 font-serif text-3xl font-semibold text-[#5A1F2B]">
                        {error}
                    </h2>

                    <p className="mb-8 text-sm leading-7 text-[#75645B]">
                        We couldn't find the story you're looking for.
                        It may have been removed or the link may be invalid.
                    </p>

                    <Button
                        as={Link}
                        to="/blogs"
                        className="
                            rounded-full
                            border-[#5A1F2B]
                            bg-[#5A1F2B]
                            px-6
                            text-[#FCFAF6]
                            hover:bg-[#722F3E]
                            focus:ring-2
                            focus:ring-[#B89B5E]/40
                        "
                    >
                        Back to Blogs
                    </Button>

                </div>

            </main>
        );
    }

    return (

        <main className="min-h-screen bg-[#FCFAF6] text-[#2D211D]">

            {/* ARTICLE HEADER */}

            <section className="border-b border-[#D8C9B8]/70 bg-[#F7F1E7]">

                <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

                    {/* CATEGORY */}

                    <Badge
                        color="gray"
                        className="
                            mb-6
                            w-fit
                            border
                            border-[#B89B5E]
                            bg-[#FCFAF6]
                            px-3
                            py-1
                            text-[#5A1F2B]
                        "
                    >
                        {blog.category}
                    </Badge>

                    {/* TITLE */}

                    <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-tight text-[#5A1F2B] sm:text-5xl lg:text-6xl">

                        {blog.title}

                    </h1>

                    {/* META */}

                    <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#75645B]">

                        <span className="font-semibold text-[#5A1F2B]">
                            By {blog.author}
                        </span>

                        <span className="text-[#B89B5E]">
                            •
                        </span>

                        <span>
                            {blog.publishDate}
                        </span>

                        <span className="text-[#B89B5E]">
                            •
                        </span>

                        <span className="capitalize">
                            {blog.status}
                        </span>

                    </div>

                </div>

            </section>


            {/* ARTICLE */}

            <article className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

                {/* IMAGE */}

                <div className="overflow-hidden rounded-3xl border border-[#D8C9B8] bg-[#E8DCCB] shadow-sm">

                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="
                            h-70
                            w-full
                            object-cover
                            sm:h-100
                            lg:h-130
                        "
                    />

                </div>


                {/* DESCRIPTION */}

                <div className="mx-auto mt-12 max-w-3xl">

                    <p className="font-serif text-2xl font-medium leading-relaxed text-[#5A1F2B] sm:text-3xl">

                        {blog.description}

                    </p>

                    <div className="my-10 h-px w-full bg-[#D8C9B8]" />

                </div>


                {/* CONTENT */}

                <div className="mx-auto max-w-3xl">

                    <div className="whitespace-pre-line text-[17px] leading-9 text-[#493A34]">

                        {blog.content}

                    </div>

                </div>


                {/* TAGS */}

                <div className="mx-auto mt-14 max-w-3xl border-t border-[#D8C9B8] pt-8">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#B89B5E]">
                        Filed under
                    </p>

                    <div className="flex flex-wrap gap-2">

                        {blog.tags.map(
                            (tag, index) => (

                                <Badge
                                    key={index}
                                    color="gray"
                                    className="
                                        rounded-full
                                        border
                                        border-[#D8C9B8]
                                        bg-[#F7F1E7]
                                        px-3
                                        py-1
                                        text-[#5A1F2B]
                                    "
                                >
                                    #{tag}
                                </Badge>

                            )
                        )}

                    </div>

                </div>


                {/* BACK */}

                <div className="mx-auto mt-12 max-w-3xl border-t border-[#D8C9B8] pt-8">

                    <Button
                        color="light"
                        as={Link}
                        to="/blogs"
                        className="
                            rounded-full
                            border
                            border-[#D8C9B8]
                            bg-[#F7F1E7]
                            px-6
                            text-[#5A1F2B]
                            transition-all
                            duration-300
                            hover:border-[#B89B5E]
                            hover:bg-[#E8DCCB]
                            focus:ring-2
                            focus:ring-[#B89B5E]/40
                        "
                    >
                        ← Back to Blogs
                    </Button>

                </div>

            </article>

        </main>
    );
}

export default BlogDetails;