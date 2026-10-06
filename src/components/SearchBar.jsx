import { TextInput } from "flowbite-react";

function SearchBar({ search, setSearch }) {
    return (
        <TextInput
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
    );
}

export default SearchBar;