import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { useDispatch } from "react-redux";

import BlogForm from "../../components/BlogForm";
import api from "../../api/axios";
import { addBlog } from "../../redux/blogSlice";

function AddBlog() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddBlog = async (blogData) => {
        try {
            const response = await api.post("/blogs", blogData);

            dispatch(addBlog(response.data));

            navigate("/admin", {
                state: {
                    success: "Blog added successfully!"
                }
            });

        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    return (
        <main className="min-h-screen bg-[#FCFAF6] px-4 py-10 sm:py-14">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                        The Journal
                    </p>

                    <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#5A1F2B] sm:text-5xl">
                        Add New Blog
                    </h1>

                    <div className="mt-4 h-px w-16 bg-[#B89B5E]" />

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645B] sm:text-base">
                        Create a thoughtful new story and add it to your
                        collection of published work.
                    </p>
                </div>

                {/* Form Card */}
                <Card
                    className="overflow-hidden rounded-3xl border border-[#E8DCCB] bg-white shadow-[0_18px_50px_rgba(45,33,29,0.08)]"
                    theme={{
                        root: {
                            base: "flex rounded-3xl border",
                            children: "flex h-full flex-col justify-center gap-4 p-6 sm:p-8",
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
                            Fill in the details below to create your new
                            blog post.
                        </p>
                    </div>

                    <BlogForm
                        onSubmit={handleAddBlog}
                        buttonText="Add Blog"
                    />
                </Card>

                {/* Editorial footer note */}
                <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#9A8778]">
                    <span className="h-px w-8 bg-[#D8C9B8]" />
                    <span>Write something worth reading</span>
                </div>

            </div>
        </main>
    );
}

export default AddBlog;