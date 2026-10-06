import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    Alert,
    Badge,
    Button,
    Card,
    Select,
    Spinner,
    TextInput
} from "flowbite-react";

import api from "../../api/axios";

import {
    deleteBlog,
    setBlogs
} from "../../redux/blogSlice";

function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // --------------------------------
    // REDUX DATA
    // --------------------------------

    const blogs = useSelector(
        (state) => state.blogs.blogs
    );

    // --------------------------------
    // LOCAL STATES
    // --------------------------------

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(
        location.state?.success || ""
    );

    const blogsPerPage = 5;

    // --------------------------------
    // GET BLOGS
    // --------------------------------

    useEffect(() => {

        const fetchBlogs = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/blogs");

                dispatch(
                    setBlogs(response.data)
                );

            } catch (error) {

                console.error(
                    "Error fetching blogs:",
                    error
                );

                setError(
                    "Unable to load blogs. Please try again."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchBlogs();

    }, [dispatch]);

    // --------------------------------
    // SUCCESS MESSAGE
    // --------------------------------

    useEffect(() => {

        if (location.state?.success) {

            setSuccess(
                location.state.success
            );

            navigate(
                location.pathname,
                {
                    replace: true,
                    state: {}
                }
            );
        }

    }, [location, navigate]);

    // --------------------------------
    // DELETE BLOG
    // --------------------------------

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/blogs/${id}`
            );

            dispatch(
                deleteBlog(id)
            );

            setSuccess(
                "Blog deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Error deleting blog:",
                error
            );

            setError(
                "Unable to delete the blog."
            );
        }
    };

    // --------------------------------
    // STATISTICS
    // --------------------------------

    const totalBlogs = blogs.length;

    const publishedBlogs = blogs.filter(
        (blog) => blog.status === "Published"
    ).length;

    const draftBlogs = blogs.filter(
        (blog) => blog.status === "Draft"
    ).length;

    // --------------------------------
    // SEARCH + FILTER + SORT
    // --------------------------------

    const processedBlogs = useMemo(() => {

        let result = [...blogs];

        // SEARCH

        if (search.trim()) {

            const searchText =
                search.toLowerCase();

            result = result.filter((blog) => {

                const title =
                    blog.title?.toLowerCase() || "";

                const author =
                    blog.author?.toLowerCase() || "";

                return (
                    title.includes(searchText) ||
                    author.includes(searchText)
                );
            });
        }

        // CATEGORY FILTER

        if (category !== "All") {

            result = result.filter(
                (blog) =>
                    blog.category === category
            );
        }

        // SORT

        if (sort === "az") {

            result.sort((a, b) =>
                (a.title || "").localeCompare(
                    b.title || ""
                )
            );
        }

        if (sort === "za") {

            result.sort((a, b) =>
                (b.title || "").localeCompare(
                    a.title || ""
                )
            );
        }

        if (sort === "latest") {

            result.sort(
                (a, b) =>
                    new Date(b.publishDate) -
                    new Date(a.publishDate)
            );
        }

        if (sort === "oldest") {

            result.sort(
                (a, b) =>
                    new Date(a.publishDate) -
                    new Date(b.publishDate)
            );
        }

        return result;

    }, [
        blogs,
        search,
        category,
        sort
    ]);

    // --------------------------------
    // PAGINATION
    // --------------------------------

    const totalPages = Math.ceil(
        processedBlogs.length /
        blogsPerPage
    );

    const lastIndex =
        currentPage * blogsPerPage;

    const firstIndex =
        lastIndex - blogsPerPage;

    const currentBlogs =
        processedBlogs.slice(
            firstIndex,
            lastIndex
        );

    // --------------------------------
    // RESET PAGE WHEN FILTER CHANGES
    // --------------------------------

    useEffect(() => {

        setCurrentPage(1);

    }, [
        search,
        category,
        sort
    ]);

    // --------------------------------
    // CATEGORIES
    // --------------------------------

    const categories = [
        "Technology",
        "Programming",
        "Web Development",
        "Lifestyle",
        "Education",
        "Travel"
    ];

    // --------------------------------
    // LOADING
    // --------------------------------

    if (loading) {

        return (

            <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF6]">

                <div className="text-center">

                    <Spinner
                        size="xl"
                        className="fill-[#5A1F2B] text-[#D8C9B8]"
                    />

                    <p className="mt-4 text-sm tracking-wide text-[#75645B]">
                        Loading your journal...
                    </p>

                </div>

            </main>
        );
    }

    // --------------------------------
    // DASHBOARD
    // --------------------------------

    return (

        <main className="min-h-screen bg-[#FCFAF6] text-[#2D211D]">

            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

                {/* ==============================
                    HEADER
                ============================== */}

                <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                    <div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                            Administration
                        </p>

                        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#5A1F2B] sm:text-5xl">
                            Blog Dashboard
                        </h1>

                        <p className="mt-3 max-w-xl leading-7 text-[#75645B]">
                            Manage, organize and refine all your
                            stories from one elegant workspace.
                        </p>

                    </div>

                    <Button
                        onClick={() =>
                            navigate(
                                "/admin/add-blog"
                            )
                        }
                        className="
                            rounded-full
                            border
                            border-[#5A1F2B]
                            bg-[#5A1F2B]
                            px-6
                            py-2.5
                            font-semibold
                            text-[#FCFAF6]
                            transition-all
                            duration-300
                            hover:border-[#722F3E]
                            hover:bg-[#722F3E]
                            focus:ring-2
                            focus:ring-[#B89B5E]/40
                        "
                    >
                        + Add New Blog
                    </Button>

                </div>


                {/* ==============================
                    MESSAGES
                ============================== */}

                {success && (

                    <Alert
                        color="success"
                        className="
                            mb-6
                            border
                            border-[#B89B5E]/50
                            bg-[#F7F1E7]
                            text-[#5A1F2B]
                        "
                    >
                        {success}
                    </Alert>

                )}

                {error && (

                    <Alert
                        color="failure"
                        className="
                            mb-6
                            border
                            border-[#722F3E]/30
                            bg-[#F7E9E8]
                            text-[#5A1F2B]
                        "
                    >
                        {error}
                    </Alert>

                )}


                {/* ==============================
                    STATISTICS
                ============================== */}

                <div className="mb-8 grid gap-5 md:grid-cols-3">

                    {/* TOTAL */}

                    <Card
                        className="
                            rounded-2xl
                            border
                            border-[#D8C9B8]
                            bg-[#F7F1E7]
                            shadow-sm
                        "
                    >

                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B89B5E]">
                            Total Blogs
                        </p>

                        <p className="mt-3 font-serif text-4xl font-semibold text-[#5A1F2B]">
                            {totalBlogs}
                        </p>

                        <p className="mt-1 text-sm text-[#75645B]">
                            Stories in your collection
                        </p>

                    </Card>


                    {/* PUBLISHED */}

                    <Card
                        className="
                            rounded-2xl
                            border
                            border-[#D8C9B8]
                            bg-[#F7F1E7]
                            shadow-sm
                        "
                    >

                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B89B5E]">
                            Published
                        </p>

                        <p className="mt-3 font-serif text-4xl font-semibold text-[#5A1F2B]">
                            {publishedBlogs}
                        </p>

                        <p className="mt-1 text-sm text-[#75645B]">
                            Live and visible stories
                        </p>

                    </Card>


                    {/* DRAFTS */}

                    <Card
                        className="
                            rounded-2xl
                            border
                            border-[#D8C9B8]
                            bg-[#F7F1E7]
                            shadow-sm
                        "
                    >

                        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B89B5E]">
                            Drafts
                        </p>

                        <p className="mt-3 font-serif text-4xl font-semibold text-[#5A1F2B]">
                            {draftBlogs}
                        </p>

                        <p className="mt-1 text-sm text-[#75645B]">
                            Stories still in progress
                        </p>

                    </Card>

                </div>


                {/* ==============================
                    SEARCH / FILTER / SORT
                ============================== */}

                <Card
                    className="
                        mb-8
                        rounded-2xl
                        border
                        border-[#D8C9B8]
                        bg-[#F7F1E7]
                        shadow-sm
                    "
                >

                    <div className="mb-6">

                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B89B5E]">
                            Refine your collection
                        </p>

                        <h2 className="mt-1 font-serif text-2xl font-semibold text-[#5A1F2B]">
                            Search & Filters
                        </h2>

                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        {/* SEARCH */}

                        <div>

                            <label
                                htmlFor="search"
                                className="mb-2 block text-sm font-semibold text-[#5A1F2B]"
                            >
                                Search
                            </label>

                            <TextInput
                                id="search"
                                type="text"
                                placeholder="Search by title or author..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="w-full"
                                theme={{
                                    field: {
                                        input: {
                                            base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
                                            sizes: {
                                                sm: "p-2 sm:text-xs",
                                                md: "p-3 text-sm",
                                                lg: "p-4 sm:text-base",
                                            },
                                            colors: {
                                                gray: "border-[#D8C9B8] bg-[#FCFAF6] text-[#2D211D] placeholder-[#9A8778] focus:border-[#722F3E] focus:ring-[#B89B5E]",
                                            },
                                        },
                                    },
                                }}
                                sizing="md"
                            />

                        </div>


                        {/* CATEGORY */}

                        <div>

                            <label
                                htmlFor="category"
                                className="mb-2 block text-sm font-semibold text-[#5A1F2B]"
                            >
                                Category
                            </label>

                            <Select
                                id="category"
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="
                                    border-[#D8C9B8]
                                    bg-[#FCFAF6]
                                    text-[#2D211D]
                                    focus:border-[#722F3E]
                                    focus:ring-[#B89B5E]
                                "
                            >

                                <option value="All">
                                    All Categories
                                </option>

                                {categories.map(
                                    (item) => (

                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    )
                                )}

                            </Select>

                        </div>


                        {/* SORT */}

                        <div>

                            <label
                                htmlFor="sort"
                                className="mb-2 block text-sm font-semibold text-[#5A1F2B]"
                            >
                                Sort By
                            </label>

                            <Select
                                id="sort"
                                value={sort}
                                onChange={(e) =>
                                    setSort(
                                        e.target.value
                                    )
                                }
                                className="
                                    border-[#D8C9B8]
                                    bg-[#FCFAF6]
                                    text-[#2D211D]
                                    focus:border-[#722F3E]
                                    focus:ring-[#B89B5E]
                                "
                            >

                                <option value="">
                                    Default
                                </option>

                                <option value="az">
                                    Title A-Z
                                </option>

                                <option value="za">
                                    Title Z-A
                                </option>

                                <option value="latest">
                                    Latest
                                </option>

                                <option value="oldest">
                                    Oldest
                                </option>

                            </Select>

                        </div>

                    </div>

                </Card>


                {/* ==============================
                    BLOG LIST
                ============================== */}

                <Card
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#D8C9B8]
                        bg-[#FCFAF6]
                        p-0
                        shadow-sm
                    "
                >

                    <div className="border-b border-[#D8C9B8] bg-[#F7F1E7] px-6 py-5">

                        <h2 className="font-serif text-2xl font-semibold text-[#5A1F2B]">
                            All Blogs
                        </h2>

                        <p className="mt-1 text-sm text-[#75645B]">
                            Showing{" "}
                            {currentBlogs.length}{" "}
                            of{" "}
                            {processedBlogs.length}{" "}
                            blogs
                        </p>

                    </div>


                    {/* NO BLOGS */}

                    {currentBlogs.length === 0 ? (

                        <div className="px-6 py-16 text-center">

                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#5A1F2B] font-serif text-xl text-[#D8C39A]">
                                —
                            </div>

                            <p className="font-serif text-2xl font-semibold text-[#5A1F2B]">
                                No blogs found
                            </p>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#75645B]">
                                Try changing your search or
                                category filter, or begin a
                                new story.
                            </p>

                            <Button
                                className="
                                    mx-auto
                                    mt-6
                                    rounded-full
                                    border
                                    border-[#5A1F2B]
                                    bg-[#5A1F2B]
                                    px-6
                                    text-[#FCFAF6]
                                    hover:bg-[#722F3E]
                                "
                                onClick={() =>
                                    navigate(
                                        "/admin/add-blog"
                                    )
                                }
                            >
                                Add Your First Blog
                            </Button>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-left text-sm">

                                <thead className="border-b border-[#D8C9B8] bg-[#F7F1E7] text-xs uppercase tracking-wider text-[#75645B]">

                                    <tr>

                                        <th className="px-6 py-4">
                                            Image
                                        </th>

                                        <th className="px-6 py-4">
                                            Title
                                        </th>

                                        <th className="px-6 py-4">
                                            Author
                                        </th>

                                        <th className="px-6 py-4">
                                            Category
                                        </th>

                                        <th className="px-6 py-4">
                                            Date
                                        </th>

                                        <th className="px-6 py-4">
                                            Status
                                        </th>

                                        <th className="px-6 py-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {currentBlogs.map(
                                        (blog) => (

                                            <tr
                                                key={blog.id}
                                                className="
                                                    border-b
                                                    border-[#E8DCCB]
                                                    bg-[#FCFAF6]
                                                    transition-colors
                                                    duration-200
                                                    hover:bg-[#F7F1E7]
                                                "
                                            >

                                                {/* IMAGE */}

                                                <td className="px-6 py-4">

                                                    {blog.image ? (

                                                        <img
                                                            src={blog.image}
                                                            alt={blog.title}
                                                            className="
                                                                h-12
                                                                w-16
                                                                rounded-lg
                                                                border
                                                                border-[#D8C9B8]
                                                                object-cover
                                                            "
                                                        />

                                                    ) : (

                                                        <div className="
                                                            flex
                                                            h-12
                                                            w-16
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            border
                                                            border-[#D8C9B8]
                                                            bg-[#F7F1E7]
                                                            text-xs
                                                            text-[#9A8778]
                                                        ">
                                                            No Image
                                                        </div>

                                                    )}

                                                </td>


                                                {/* TITLE */}

                                                <td className="px-6 py-4">

                                                    <Link
                                                        to={`/blogs/${blog.id}`}
                                                        className="
                                                            font-semibold
                                                            text-[#5A1F2B]
                                                            transition-colors
                                                            hover:text-[#B89B5E]
                                                        "
                                                    >
                                                        {blog.title}
                                                    </Link>

                                                    <p className="mt-1 max-w-xs truncate text-xs text-[#75645B]">
                                                        {blog.description}
                                                    </p>

                                                </td>


                                                {/* AUTHOR */}

                                                <td className="px-6 py-4">

                                                    <p className="font-medium text-[#2D211D]">
                                                        {blog.author}
                                                    </p>

                                                    <p className="text-xs text-[#9A8778]">
                                                        {blog.email}
                                                    </p>

                                                </td>


                                                {/* CATEGORY */}

                                                <td className="px-6 py-4">

                                                    <Badge
                                                        color="gray"
                                                        className="
                                                            border
                                                            border-[#D8C9B8]
                                                            bg-[#F7F1E7]
                                                            text-[#5A1F2B]
                                                        "
                                                    >
                                                        {blog.category}
                                                    </Badge>

                                                </td>


                                                {/* DATE */}

                                                <td className="whitespace-nowrap px-6 py-4 text-[#75645B]">
                                                    {blog.publishDate}
                                                </td>


                                                {/* STATUS */}

                                                <td className="px-6 py-4">

                                                    {blog.status ===
                                                    "Published" ? (

                                                        <Badge
                                                            color="gray"
                                                            className="
                                                                border
                                                                border-[#B89B5E]
                                                                bg-[#F7F1E7]
                                                                text-[#5A1F2B]
                                                            "
                                                        >
                                                            Published
                                                        </Badge>

                                                    ) : (

                                                        <Badge
                                                            color="gray"
                                                            className="
                                                                border
                                                                border-[#D8C9B8]
                                                                bg-[#E8DCCB]
                                                                text-[#75645B]
                                                            "
                                                        >
                                                            Draft
                                                        </Badge>

                                                    )}

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="px-3 py-4 w-3xl">

                                                    <div className="flex flex-wrap gap-1">

                                                        {/* VIEW */}

                                                        <Link
                                                            to={`/blogs/${blog.id}`}
                                                            className="
                                                                rounded-full
                                                                border
                                                                border-[#D8C9B8]
                                                                bg-[#F7F1E7]
                                                                px-2
                                                                py-1.5
                                                                text-xs
                                                                font-semibold
                                                                text-[#5A1F2B]
                                                                transition-all
                                                                hover:border-[#B89B5E]
                                                                hover:bg-[#E8DCCB]
                                                            "
                                                        >
                                                            View
                                                        </Link>


                                                        {/* EDIT */}

                                                        <Link
                                                            to={`/admin/edit/${blog.id}`}
                                                            className="
                                                                rounded-full
                                                                border
                                                                border-[#5A1F2B]
                                                                bg-[#5A1F2B]
                                                                px-2
                                                                py-1.5
                                                                text-xs
                                                                font-semibold
                                                                text-[#FCFAF6]
                                                                transition-all
                                                                hover:border-[#722F3E]
                                                                hover:bg-[#722F3E]
                                                            "
                                                        >
                                                            Edit
                                                        </Link>


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    blog.id
                                                                )
                                                            }
                                                            className="
                                                                rounded-full
                                                                border
                                                                border-[#B89B5E]
                                                                bg-transparent
                                                                px-2
                                                                py-1.5
                                                                text-xs
                                                                font-semibold
                                                                text-[#722F3E]
                                                                transition-all
                                                                hover:bg-[#F7E9E8]
                                                            "
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}


                    {/* ==============================
                        PAGINATION
                    ============================== */}

                    {totalPages > 1 && (

                        <div className="border-t border-[#D8C9B8] bg-[#F7F1E7] px-6 py-5">

                            <div className="flex flex-wrap items-center justify-center gap-2">

                                {/* PREVIOUS */}

                                <Button
                                    size="sm"
                                    color="light"
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage - 1
                                        )
                                    }
                                    className="
                                        rounded-full
                                        border
                                        border-[#D8C9B8]
                                        bg-[#FCFAF6]
                                        text-[#5A1F2B]
                                        hover:border-[#B89B5E]
                                        hover:bg-[#E8DCCB]
                                        focus:ring-2
                                        focus:ring-[#B89B5E]/40
                                        disabled:opacity-40
                                    "
                                >
                                    Previous
                                </Button>


                                {/* PAGE NUMBERS */}

                                {Array.from(
                                    {
                                        length: totalPages
                                    },
                                    (_, index) => {

                                        const page =
                                            index + 1;

                                        return (

                                            <Button
                                                key={page}
                                                size="sm"
                                                color="light"
                                                onClick={() =>
                                                    setCurrentPage(
                                                        page
                                                    )
                                                }
                                                className={
                                                    currentPage === page
                                                        ? `
                                                            min-w-9
                                                            rounded-full
                                                            border
                                                            border-[#5A1F2B]
                                                            bg-[#5A1F2B]
                                                            text-[#FCFAF6]
                                                            hover:bg-[#722F3E]
                                                          `
                                                        : `
                                                            min-w-9
                                                            rounded-full
                                                            border
                                                            border-[#D8C9B8]
                                                            bg-[#FCFAF6]
                                                            text-[#5A1F2B]
                                                            hover:border-[#B89B5E]
                                                            hover:bg-[#E8DCCB]
                                                          `
                                                }
                                            >
                                                {page}
                                            </Button>

                                        );
                                    }
                                )}


                                {/* NEXT */}

                                <Button
                                    size="sm"
                                    color="light"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage + 1
                                        )
                                    }
                                    className="
                                        rounded-full
                                        border
                                        border-[#D8C9B8]
                                        bg-[#FCFAF6]
                                        text-[#5A1F2B]
                                        hover:border-[#B89B5E]
                                        hover:bg-[#E8DCCB]
                                        focus:ring-2
                                        focus:ring-[#B89B5E]/40
                                        disabled:opacity-40
                                    "
                                >
                                    Next
                                </Button>

                            </div>

                        </div>

                    )}

                </Card>

            </div>

        </main>
    );
}

export default Dashboard;