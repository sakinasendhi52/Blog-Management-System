import { useEffect, useState } from "react";

import {
    Alert,
    Label,
    Select,
    Textarea,
    TextInput
} from "flowbite-react";

const initialForm = {
    title: "",
    author: "",
    email: "",
    category: "",
    image: "",
    description: "",
    content: "",
    tags: "",
    publishDate: "",
    status: "Draft"
};

function BlogForm({
    initialData = initialForm,
    onSubmit,
    buttonText = "Add Blog"
}) {
    const [form, setForm] = useState(initialData);
    const [error, setError] = useState("");

    useEffect(() => {
        setForm({
            ...initialForm,
            ...initialData
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value
        }));

        setError("");
    };

    const validateForm = () => {
        if (!form.title.trim()) {
            return "Blog title is required.";
        }

        if (!form.author.trim()) {
            return "Author name is required.";
        }

        if (!form.email.trim()) {
            return "Email is required.";
        }

        if (!form.email.includes("@")) {
            return "Please enter a valid email.";
        }

        if (!form.category) {
            return "Please select a category.";
        }

        if (!form.image.trim()) {
            return "Image URL is required.";
        }

        if (!form.description.trim()) {
            return "Description is required.";
        }

        if (!form.content.trim()) {
            return "Content is required.";
        }

        if (!form.tags.trim()) {
            return "Please enter at least one tag.";
        }

        if (!form.publishDate) {
            return "Publish date is required.";
        }

        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        const blogData = {
            ...form,
            tags: form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
        };

        onSubmit(blogData);
    };

    const inputClass =
        "[&_input]:rounded-xl " +
        "[&_input]:border-[#D8C9B8] " +
        "[&_input]:bg-[#FCFAF6] " +
        "[&_input]:text-[#2D211D] " +
        "[&_input]:placeholder:text-[#9A8778] " +
        "[&_input]:shadow-sm " +
        "[&_input]:focus:border-[#722F3E] " +
        "[&_input]:focus:ring-[#B89B5E]";

    const selectClass =
        "[&_select]:rounded-xl " +
        "[&_select]:border-[#D8C9B8] " +
        "[&_select]:bg-[#FCFAF6] " +
        "[&_select]:text-[#2D211D] " +
        "[&_select]:shadow-sm " +
        "[&_select]:focus:border-[#722F3E] " +
        "[&_select]:focus:ring-[#B89B5E]";

    const textareaClass =
        "rounded-xl " +
        "border-[#D8C9B8] " +
        "bg-[#FCFAF6] " +
        "text-[#2D211D] " +
        "placeholder:text-[#9A8778] " +
        "shadow-sm " +
        "focus:border-[#722F3E] " +
        "focus:ring-[#B89B5E]";

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            {/* Error */}
            {error && (
                <Alert
                    color="failure"
                    className="rounded-2xl border border-[#E1B8C1] bg-[#F8E9EC] text-[#722F3E]"
                >
                    {error}
                </Alert>
            )}

            {/* Form Heading */}
            <div className="border-b border-[#E8DCCB] pb-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                    Create your story
                </p>

                <h2 className="font-serif text-2xl font-semibold text-[#5A1F2B] sm:text-3xl">
                    Blog Information
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#75645B]">
                    Add the details of your blog post below.
                </p>
            </div>

            {/* Basic Information */}
            <section>
                <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F1E7] text-xs font-semibold text-[#5A1F2B]">
                        01
                    </span>

                    <div>
                        <h3 className="font-serif text-lg font-semibold text-[#2D211D]">
                            Basic Information
                        </h3>

                        <p className="text-xs text-[#9A8778]">
                            Introduce your article and its author.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="title"
                                className="font-medium text-[#4A3831]"
                            >
                                Blog Title
                            </Label>
                        </div>

                        <TextInput
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Give your story a title..."
                            value={form.title}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="author"
                                className="font-medium text-[#4A3831]"
                            >
                                Author
                            </Label>
                        </div>

                        <TextInput
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Enter author name"
                            value={form.author}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                className="font-medium text-[#4A3831]"
                            >
                                Email
                            </Label>
                        </div>

                        <TextInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="author@example.com"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="category"
                                className="font-medium text-[#4A3831]"
                            >
                                Category
                            </Label>
                        </div>

                        <Select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={selectClass}
                        >
                            <option value="">
                                Select category
                            </option>
                            <option value="Technology">
                                Technology
                            </option>
                            <option value="Programming">
                                Programming
                            </option>
                            <option value="Web Development">
                                Web Development
                            </option>
                            <option value="Lifestyle">
                                Lifestyle
                            </option>
                            <option value="Education">
                                Education
                            </option>
                            <option value="Travel">
                                Travel
                            </option>
                        </Select>
                    </div>

                    {/* Image */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="image"
                                className="font-medium text-[#4A3831]"
                            >
                                Image URL
                            </Label>
                        </div>

                        <TextInput
                            id="image"
                            name="image"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={form.image}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>
                </div>
            </section>

            {/* Story Content */}
            <section className="border-t border-[#E8DCCB] pt-8">
                <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F1E7] text-xs font-semibold text-[#5A1F2B]">
                        02
                    </span>

                    <div>
                        <h3 className="font-serif text-lg font-semibold text-[#2D211D]">
                            Story Content
                        </h3>

                        <p className="text-xs text-[#9A8778]">
                            Shape the introduction and body of your article.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Description */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="description"
                                className="font-medium text-[#4A3831]"
                            >
                                Description
                            </Label>
                        </div>

                        <Textarea
                            id="description"
                            name="description"
                            rows={4}
                            placeholder="Write a short description about your story..."
                            value={form.description}
                            onChange={handleChange}
                            className={textareaClass}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="content"
                                className="font-medium text-[#4A3831]"
                            >
                                Content
                            </Label>
                        </div>

                        <Textarea
                            id="content"
                            name="content"
                            rows={10}
                            placeholder="Write your blog content here..."
                            value={form.content}
                            onChange={handleChange}
                            className={textareaClass}
                        />
                    </div>
                </div>
            </section>

            {/* Publishing */}
            <section className="border-t border-[#E8DCCB] pt-8">
                <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F1E7] text-xs font-semibold text-[#5A1F2B]">
                        03
                    </span>

                    <div>
                        <h3 className="font-serif text-lg font-semibold text-[#2D211D]">
                            Publishing Details
                        </h3>

                        <p className="text-xs text-[#9A8778]">
                            Add tags, publication date, and visibility.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Tags */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="tags"
                                className="font-medium text-[#4A3831]"
                            >
                                Tags
                            </Label>
                        </div>

                        <TextInput
                            id="tags"
                            name="tags"
                            type="text"
                            placeholder="React, JavaScript, Frontend"
                            value={form.tags}
                            onChange={handleChange}
                            className={inputClass}
                        />

                        <p className="mt-2 text-xs text-[#9A8778]">
                            Separate multiple tags using commas.
                        </p>
                    </div>

                    {/* Publish Date + Status */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="publishDate"
                                    className="font-medium text-[#4A3831]"
                                >
                                    Publish Date
                                </Label>
                            </div>

                            <TextInput
                                id="publishDate"
                                name="publishDate"
                                type="date"
                                value={form.publishDate}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="status"
                                    className="font-medium text-[#4A3831]"
                                >
                                    Status
                                </Label>
                            </div>

                            <Select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={selectClass}
                            >
                                <option value="Published">
                                    Published
                                </option>

                                <option value="Draft">
                                    Draft
                                </option>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E8DCCB] pt-6 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="rounded-full border border-[#D8C9B8] bg-transparent px-7 py-2.5 text-sm font-medium text-[#5A1F2B] transition duration-200 hover:border-[#B89B5E] hover:bg-[#F7F1E7] focus:outline-none focus:ring-4 focus:ring-[#E8DCCB]"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="rounded-full bg-[#5A1F2B] px-8 py-2.5 text-sm font-semibold text-[#FCFAF6] shadow-[0_8px_20px_rgba(90,31,43,0.18)] transition duration-200 hover:bg-[#722F3E] hover:shadow-[0_10px_24px_rgba(90,31,43,0.24)] focus:outline-none focus:ring-4 focus:ring-[#D8C39A]"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
}

export default BlogForm;