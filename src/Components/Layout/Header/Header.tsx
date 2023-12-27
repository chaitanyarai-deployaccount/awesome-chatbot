import Image from "next/image";
import { AiOutlineGithub } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import useSideBarState from "@/Store/GlobalStore";
import { SideBarState } from "@/types/globalTypes";

const Header = () => {
    const [leftSidebarOpen, toggleLeftSidebar] = useSideBarState((state: SideBarState) => [
        state.leftSidebarOpen,
        state.toggleLeftSidebar,
    ]);
    const [rightSidebarOpen, toggleRightSidebar] = useSideBarState((state: SideBarState) => [
        state.rightSidebarOpen,
        state.toggleRightSidebar,
    ]);

    return (
        <header className="header-main" role="banner">
            <div className="flex items-center gap-4">
                <button className="button-core rounded-lg border-brand/30" onClick={toggleLeftSidebar}>
                    {leftSidebarOpen ? <FiChevronLeft className="text-xl" /> : <FiChevronRight className="text-xl" />}
                </button>
                <div className="flex text-lg font-bold">
                    <Image src="/logo.svg" alt="Logo" width={50} height={50} className="mr-2 fill-brand text-brand" />
                    <span className="pt-2">Code Llama on Akash</span>
                </div>
            </div>
            <div className="flex items-center gap-4 ">
                <b>Current Model:</b> <a href="https://huggingface.co/codellama/CodeLlama-34b-Instruct-hf" target="_blank">
                    <span className="">codellama/CodeLlama-34b-Instruct-hf</span>
                </a>
                <a href="" target="_blank">
                   
                </a>
                <button className="button-core rounded-lg border-brand/30" onClick={toggleRightSidebar}>
                    {rightSidebarOpen ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
                </button>
            </div>
        </header>
    );
};

export default Header;
