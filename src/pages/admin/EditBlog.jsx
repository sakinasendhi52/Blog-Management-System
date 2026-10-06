import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Spinner, Alert } from "flowbite-react";
import { useDispatch } from "react-redux";

import BlogForm from "../../components/BlogForm";
import api from "../../api/axios";
import { updateBlog } from "../../redux/blogSlice";

function EditBlog() {
    const { id } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);

                const blogData = {
                    ...response.data,

                    tags: Array.isArray(response.data.tags)
                        ? response.data.tags.join(", ")
                        : response.data.tags || ""
                };

                setBlog(blogData);

            } catch (error) {
                console.error("Error fetching blog:", error);

                setError("Unable to load blog.");

            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleEditBlog = async (blogData) => {
        try {
            const response = await api.put(
                `/blogs/${id}`,
                blogData
            );

            dispatch(updateBlog(response.data));

            navigate("/admin", {
                state: {
                    success: "Blog updated successfully!"
                }
            });

        } catch (error) {
            console.error("Error updating blog:", error);

            setError("Unable to update blog.");
        }
    };

    if (loading) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6]">
                <div className="text-center">
                    <Spinner
                        size="xl"
                        color="purple"
                    />

                    <p className="mt-4 text-sm text-[#75645B]">
                        Loading blog...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#FCFAF6] px-4 py-10 sm:py-14">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                            The Journal
                        </p>

                        <h1 className="font-serif text-4xl font-semibold text-[#5A1F2B]">
                            Edit Blog
                        </h1>

                        <div className="mt-4 h-px w-16 bg-[#B89B5E]" />
                    </div>

                    <Alert
                        color="failure"
                        className="rounded-2xl border border-[#E8DCCB] bg-[#F7F1E7] text-[#5A1F2B]"
                    >
                        {error}
                    </Alert>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FCFAF6] px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                        The Journal
                    </p>

                    <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#5A1F2B] sm:text-5xl">
                        Edit Blog
                    </h1>

                    <div className="mt-4 h-px w-16 bg-[#B89B5E]" />

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645B] sm:text-base">
                        Refine your story, update its details, and keep
                        your journal collection polished.
                    </p>
                </div>

                {/* Form */}
                <Card
                    className="overflow-hidden rounded-3xl border border-[#E8DCCB] bg-white shadow-[0_18px_50px_rgba(45,33,29,0.08)]"
                    theme={{
                        root: {
                            base: "flex rounded-3xl border",
                            children:
                                "flex h-full flex-col justify-center gap-4 p-6 sm:p-8",
                            horizontal: {
                                off: "flex-col",
                                on: "md:flex-row",
                            },
                        },
                    }}
                >
                    <div className="mb-2 border-b border-[#E8DCCB] pb-5">
                        <h2 className="font-serif text-2xl font-semibold text-[#2D211D]">
                            Story Details
                        </h2>

                        <p className="mt-1 text-sm text-[#9A8778]">
                            Make any changes to your blog post below.
                        </p>
                    </div>

                    <BlogForm
                        initialData={blog}
                        onSubmit={handleEditBlog}
                        buttonText="Update Blog"
                    />
                </Card>

                {/* Editorial footer */}
                <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#9A8778]">
                    <span className="h-px w-8 bg-[#D8C9B8]" />
                    <span>Refine your story</span>
                </div>

            </div>
        </main>
    );
}

export default EditBlog;