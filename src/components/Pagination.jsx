import { Button } from "flowbite-react";

function Pagination({
    currentPage,
    totalPages,
    setCurrentPage
}) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button
                size="sm"
                color="light"
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage(currentPage - 1)
                }
                className="
                    border border-[#D8C9B8]
                    bg-[#F7F1E7]
                    text-[#5A1F2B]
                    font-medium
                    transition-all duration-200
                    hover:border-[#B89B5E]
                    hover:bg-[#E8DCCB]
                    focus:ring-2
                    focus:ring-[#B89B5E]/40
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                Previous
            </Button>

            {Array.from(
                { length: totalPages },
                (_, index) => {
                    const page = index + 1;

                    return (
                        <Button
                            key={page}
                            size="sm"
                            color="light"
                            onClick={() =>
                                setCurrentPage(page)
                            }
                            className={
                                currentPage === page
                                    ? `
                                        min-w-9
                                        border border-[#5A1F2B]
                                        bg-[#5A1F2B]
                                        text-[#FCFAF6]
                                        font-semibold
                                        shadow-sm
                                        hover:bg-[#722F3E]
                                        hover:border-[#722F3E]
                                        focus:ring-2
                                        focus:ring-[#B89B5E]/40
                                      `
                                    : `
                                        min-w-9
                                        border border-[#D8C9B8]
                                        bg-[#FCFAF6]
                                        text-[#5A1F2B]
                                        font-medium
                                        hover:border-[#B89B5E]
                                        hover:bg-[#F7F1E7]
                                        focus:ring-2
                                        focus:ring-[#B89B5E]/40
                                      `
                            }
                        >
                            {page}
                        </Button>
                    );
                }
            )}

            <Button
                size="sm"
                color="light"
                disabled={currentPage === totalPages}
                onClick={() =>
                    setCurrentPage(currentPage + 1)
                }
                className="
                    border border-[#D8C9B8]
                    bg-[#F7F1E7]
                    text-[#5A1F2B]
                    font-medium
                    transition-all duration-200
                    hover:border-[#B89B5E]
                    hover:bg-[#E8DCCB]
                    focus:ring-2
                    focus:ring-[#B89B5E]/40
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;