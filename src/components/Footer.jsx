function Footer() {
    return (
        <footer className="mt-16 border-t border-[#4A3630] bg-[#2D211D]">
            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Top Section */}
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#FCFAF6]">
                            Blog
                            <span className="text-[#D8C39A]">
                                Hub
                            </span>
                        </h2>

                        <p className="mt-2 text-xs tracking-[0.12em] text-[#B7A69B]">
                            Stories worth sharing.
                        </p>
                    </div>

                    {/* Decorative Element */}
                    <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-[#B89B5E]" />

                        <span className="text-sm text-[#D8C39A]">
                            ✦
                        </span>

                        <span className="h-px w-12 bg-[#B89B5E]" />
                    </div>

                    {/* Copyright */}
                    <p className="text-xs tracking-[0.08em] text-[#B7A69B]">
                        © 2026 Blog Management System
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;