import {
    Button,
    Card
} from "flowbite-react";

import {
    Link
} from "react-router-dom";

function Home() {

    return (

        <main className="min-h-screen bg-[#FCFAF6] text-[#2D211D]">

            {/* HERO */}

            <section className="relative overflow-hidden bg-[#5A1F2B]">

                {/* Decorative elements */}

                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#B89B5E]/30" />

                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-[#B89B5E]/20" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">

                    <div className="mx-auto max-w-4xl text-center">

                        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#D8C39A]">
                            The Journal
                        </p>

                        <h1 className="mb-7 font-serif text-5xl font-semibold leading-tight tracking-tight text-[#FCFAF6] sm:text-6xl lg:text-7xl">

                            Discover.
                            <span className="text-[#D8B978]">
                                {" "}Read.
                            </span>

                            <br />

                            <span className="text-[#FCFAF6]">
                                Create.
                            </span>

                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-[#E8DCCB] sm:text-lg">

                            Explore thoughtful stories, discover
                            new ideas, and share your perspective
                            with a community of curious minds.

                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">

                            <Button
                                as={Link}
                                to="/blogs"
                                className="
                                    rounded-full
                                    border border-[#B89B5E]
                                    bg-[#B89B5E]
                                    px-7
                                    py-2.5
                                    font-semibold
                                    text-[#2D211D]
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:border-[#D8C39A]
                                    hover:bg-[#D8C39A]
                                    hover:shadow-xl
                                    focus:ring-2
                                    focus:ring-[#D8C39A]/50
                                "
                            >
                                Explore Blogs
                            </Button>

                            <Button
                                color="light"
                                as={Link}
                                to="/admin/add-blog"
                                className="
                                    rounded-full
                                    border
                                    border-[#E8DCCB]/40
                                    bg-transparent
                                    px-7
                                    py-2.5
                                    font-semibold
                                    text-[#FCFAF6]
                                    transition-all
                                    duration-300
                                    hover:border-[#D8C39A]
                                    hover:bg-[#FCFAF6]/10
                                    hover:text-[#FCFAF6]
                                    focus:ring-2
                                    focus:ring-[#D8C39A]/40
                                "
                            >
                                Write a Blog
                            </Button>

                        </div>

                    </div>

                </div>

            </section>


            {/* INTRO */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                <div className="mx-auto max-w-3xl text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                        Why write here?
                    </p>

                    <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#5A1F2B] sm:text-5xl">
                        A space for ideas worth sharing.
                    </h2>

                    <p className="mt-5 text-base leading-8 text-[#75645B]">
                        From discovering new perspectives to publishing
                        your own stories, everything is designed to keep
                        the experience simple, beautiful and focused on
                        what matters — the content.
                    </p>

                </div>

            </section>


            {/* FEATURES */}

            <section className="border-y border-[#D8C9B8]/70 bg-[#F7F1E7]">

                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                    <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">

                        <div>

                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                                Explore
                            </p>

                            <h2 className="font-serif text-4xl font-semibold text-[#5A1F2B]">
                                Everything you need.
                            </h2>

                        </div>

                        <p className="max-w-md text-sm leading-7 text-[#75645B] md:text-right">
                            A thoughtful blogging experience built
                            around discovering, creating and managing
                            great content.
                        </p>

                    </div>


                    <div className="grid gap-6 md:grid-cols-3">

                        <Card
                            className="
                                h-full
                                rounded-2xl
                                border
                                border-[#D8C9B8]
                                bg-[#FCFAF6]
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#B89B5E]
                                hover:shadow-lg
                            "
                        >

                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#5A1F2B] text-lg text-[#D8C39A]">
                                01
                            </div>

                            <h3 className="mb-3 font-serif text-2xl font-semibold text-[#5A1F2B]">
                                Discover Blogs
                            </h3>

                            <p className="leading-7 text-[#75645B]">
                                Explore blogs across different
                                categories and topics. Find stories,
                                perspectives and ideas that spark
                                your curiosity.
                            </p>

                        </Card>


                        <Card
                            className="
                                h-full
                                rounded-2xl
                                border
                                border-[#D8C9B8]
                                bg-[#FCFAF6]
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#B89B5E]
                                hover:shadow-lg
                            "
                        >

                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#5A1F2B] text-lg text-[#D8C39A]">
                                02
                            </div>

                            <h3 className="mb-3 font-serif text-2xl font-semibold text-[#5A1F2B]">
                                Create Content
                            </h3>

                            <p className="leading-7 text-[#75645B]">
                                Turn your ideas into meaningful
                                stories and publish your own blog
                                posts with ease.
                            </p>

                        </Card>


                        <Card
                            className="
                                h-full
                                rounded-2xl
                                border
                                border-[#D8C9B8]
                                bg-[#FCFAF6]
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#B89B5E]
                                hover:shadow-lg
                            "
                        >

                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#5A1F2B] text-lg text-[#D8C39A]">
                                03
                            </div>

                            <h3 className="mb-3 font-serif text-2xl font-semibold text-[#5A1F2B]">
                                Manage Everything
                            </h3>

                            <p className="leading-7 text-[#75645B]">
                                Search, sort, edit and manage
                                your published content from
                                one simple dashboard.
                            </p>

                        </Card>

                    </div>

                </div>

            </section>


            {/* FINAL CTA */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

                <div className="rounded-3xl bg-[#2D211D] px-6 py-16 text-center sm:px-12">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#B89B5E]">
                        Your story matters
                    </p>

                    <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold text-[#FCFAF6] sm:text-5xl">
                        Have something worth saying?
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl leading-7 text-[#D8C9B8]">
                        Start writing, share your perspective and
                        become part of the conversation.
                    </p>

                    <Button
                        as={Link}
                        to="/admin/add-blog"
                        className="
                            mt-8
                            rounded-full
                            border
                            border-[#B89B5E]
                            bg-[#B89B5E]
                            px-8
                            py-2.5
                            font-semibold
                            text-[#2D211D]
                            transition-all
                            duration-300
                            hover:bg-[#D8C39A]
                            hover:border-[#D8C39A]
                            focus:ring-2
                            focus:ring-[#D8C39A]/50
                        "
                    >
                        Start Writing
                    </Button>

                </div>

            </section>

        </main>
    );
}

export default Home;