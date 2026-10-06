import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#4A3630] bg-[#2D211D]/95 shadow-[0_8px_30px_rgba(45,33,29,0.12)] backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-3"
                >
                    {/* Logo Box */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B89B5E] bg-[#5A1F2B] font-serif text-xl font-bold text-[#D8C39A] shadow-[inset_0_0_12px_rgba(216,195,154,0.08)] transition duration-300 group-hover:border-[#D8C39A] group-hover:scale-105">
                        B
                    </div>

                    {/* Logo Text */}
                    <div>
                        <h1 className="font-serif text-xl font-semibold tracking-wide text-[#FCFAF6] sm:text-2xl">
                            Blog
                            <span className="text-[#D8C39A]">
                                Hub
                            </span>
                        </h1>

                        <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#B7A69B] sm:text-[9px]">
                            Stories worth sharing
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 md:flex">

                    <Link
                        to="/"
                        className={`relative px-5 py-3 text-sm font-medium transition duration-200 ${
                            isActive("/")
                                ? "text-[#D8C39A]"
                                : "text-[#D0C4BC] hover:text-[#D8C39A]"
                        }`}
                    >
                        Home

                        {isActive("/") && (
                            <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-[#B89B5E]" />
                        )}
                    </Link>

                    <Link
                        to="/blogs"
                        className={`relative px-5 py-3 text-sm font-medium transition duration-200 ${
                            isActive("/blogs")
                                ? "text-[#D8C39A]"
                                : "text-[#D0C4BC] hover:text-[#D8C39A]"
                        }`}
                    >
                        Blogs

                        {isActive("/blogs") && (
                            <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-[#B89B5E]" />
                        )}
                    </Link>

                    <Link
                        to="/admin"
                        className={`relative px-5 py-3 text-sm font-medium transition duration-200 ${
                            isActive("/admin")
                                ? "text-[#D8C39A]"
                                : "text-[#D0C4BC] hover:text-[#D8C39A]"
                        }`}
                    >
                        Dashboard

                        {isActive("/admin") && (
                            <span className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-[#B89B5E]" />
                        )}
                    </Link>

                    {/* Add Blog */}
                    <Link
                        to="/admin/add-blog"
                        className="ml-4 rounded-full border border-[#B89B5E] bg-[#B89B5E] px-6 py-2.5 text-sm font-semibold text-[#2D211D] shadow-[0_6px_18px_rgba(184,155,94,0.18)] transition duration-200 hover:border-[#D8C39A] hover:bg-[#D8C39A] hover:shadow-[0_8px_22px_rgba(184,155,94,0.25)]"
                    >
                        + Add Blog
                    </Link>
                </div>

                {/* Mobile Add Button */}
                <Link
                    to="/admin/add-blog"
                    className="rounded-full border border-[#B89B5E] bg-[#B89B5E] px-5 py-2 text-sm font-semibold text-[#2D211D] shadow-sm transition duration-200 hover:bg-[#D8C39A] md:hidden"
                >
                    + Add
                </Link>
            </nav>
        </header>
    );
}

export default Header;