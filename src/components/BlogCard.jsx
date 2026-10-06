import { Link } from "react-router-dom";

function BlogCard({ blog }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#FCFAF6] shadow-[0_8px_25px_rgba(45,33,29,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-[#D8C39A] hover:shadow-[0_18px_40px_rgba(45,33,29,0.12)]">

            {/* Blog Image */}
            <Link
                to={`/blogs/${blog.id}`}
                className="relative block overflow-hidden"
            >
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-60 w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0  from-[#2D211D]/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Category */}
                <span className="absolute left-5 top-5 rounded-full border border-[#D8C39A]/60 bg-[#2D211D]/90 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D8C39A] backdrop-blur-sm">
                    {blog.category}
                </span>
            </Link>

            {/* Content */}
            <div className="p-6 sm:p-7">

                {/* Date + Status */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A8778]">
                    <span>{blog.publishDate}</span>

                    <span className="text-[#B89B5E]">
                        ✦
                    </span>

                    <span>{blog.status}</span>
                </div>

                {/* Title */}
                <Link to={`/blogs/${blog.id}`}>
                    <h2 className="font-serif text-2xl font-semibold leading-tight text-[#2D211D] transition duration-200 group-hover:text-[#5A1F2B]">
                        {blog.title}
                    </h2>
                </Link>

                {/* Decorative Divider */}
                <div className="mt-4 h-px w-10 bg-[#B89B5E] transition-all duration-300 group-hover:w-16" />

                {/* Author */}
                <p className="mt-4 text-sm text-[#9A8778]">
                    By{" "}
                    <span className="font-medium text-[#5A1F2B]">
                        {blog.author}
                    </span>
                </p>

                {/* Description */}
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#75645B]">
                    {blog.description}
                </p>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-[#E8DCCB] pt-5">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9A8778]">
                        Read story
                    </span>

                    <Link
                        to={`/blogs/${blog.id}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5A1F2B] text-lg text-[#D8C39A] transition duration-300 group-hover:bg-[#722F3E] group-hover:text-[#FCFAF6] group-hover:shadow-md"
                        aria-label={`Read ${blog.title}`}
                    >
                        →
                    </Link>

                </div>
            </div>
        </article>
    );
}

export default BlogCard;