import "highlight.js/styles/hybrid.css";

import hljs, { HighlightResult } from "highlight.js";
import { FC, memo, useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineCopy, AiOutlineDownload } from "react-icons/ai";

import { generateRandomString, programmingLanguages } from "@/utils/app/codeblock";

interface Props {
    language: string;
    value: string;
}

const CodeBlock: FC<Props> = memo(
    ({ language, value }) => {
        const languageRef = useRef<string>("");
        if (language === "AUTO_DETECT") {
            language = "";
        }
        useEffect(() => {
            languageRef.current = language;
        }, [language]);

        const [isCopied, setIsCopied] = useState<boolean>(false);

        const copyToClipboard = () => {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                return;
            }
            navigator.clipboard.writeText(value).then(() => {
                setIsCopied(true);

                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            });
        };

        let highlighted: HighlightResult;
        if (languageRef.current === "") {
            highlighted = hljs.highlightAuto(value);
            languageRef.current = highlighted.language!;
            if (value.length < 2000) {
                setTimeout(() => {
                    languageRef.current = "";
                }, 500);
            }
        } else {
            highlighted = hljs.highlight(value, { language: languageRef.current, ignoreIllegals: true });
        }

        const downloadAsFile = () => {
            const fileExtension = programmingLanguages[language] || ".file";
            const suggestedFileName = `file-${generateRandomString(3, true)}${fileExtension}`;
            const fileName = window.prompt("Enter file name" || "", suggestedFileName);

            if (!fileName) {
                // user pressed cancel on prompt
                return;
            }

            const blob = new Blob([value], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = fileName;
            link.href = url;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        };

        return (
            <div className="codeblock relative font-sans text-[16px]">
                <div className="flex items-center justify-between px-4 py-1.5">
                    <span className="text-xs lowercase text-white">{languageRef.current}</span>

                    <div className="flex items-center">
                        <button
                            type="button"
                            className="flex items-center rounded bg-none p-1 text-xs text-white"
                            onClick={downloadAsFile}
                        >
                            <AiOutlineDownload size={18} />
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 rounded bg-none p-1 text-xs text-white"
                            onClick={copyToClipboard}
                        >
                            {isCopied ? <AiOutlineCheck size={18} /> : <AiOutlineCopy size={18} />}
                        </button>
                    </div>
                </div>
                <code className="hljs whitespace-pre p-1" dangerouslySetInnerHTML={{ __html: highlighted.value }} />
            </div>
        );
    },
    (prevProps, nextProps) => {
        const ev = prevProps.language === nextProps.language && prevProps.value === nextProps.value;
        return ev;
    }
);

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
