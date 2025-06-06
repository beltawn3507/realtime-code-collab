import React, { useEffect, useState } from "react";
import usebytebot from "../../store/bytebotstore";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";

function AiHelpView() {
  // file system yet not created
  const { setinput, generateCode, setmodelname } = usebytebot();
  const output = usebytebot((state) => state.output);
  const isRunning = usebytebot((state) => state.isRunning);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  //todo more features to add

  // useEffect(()=>{
  //   console.log(prompt)
  // },[prompt])

  const handleChange = (e) => {
    setModel(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim().length === 0) {
      toast.error("Enter Valid Prompt");
      return;
    }
    setinput(prompt);
    setmodelname(model);
    generateCode();
    console.log(usebytebot.getState().output);
  };

  return (
    <div className="flex max-h-full min-h-[400px] w-full flex-col gap-4 p-6 bg-[#2d2a55] text-[#f8f8f2]">
      <h1 className="text-3xl font-bold text-[#ff79c6]">ByteBot</h1>

      <textarea
        className="min-h-[120px] w-full rounded-lg border border-[#8be9fd] bg-[#3a3253] p-3 text-[#f8f8f2] placeholder-[#6272a4] outline-none focus:ring-2 focus:ring-[#bd93f9]"
        id="prompt-textarea"
        placeholder="Enter The Prompt for code you want to generate"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>

      <select
        name="model"
        id="model"
        onChange={handleChange}
        className="w-full rounded-lg border border-[#8be9fd] bg-[#3a3253] p-2 text-[#f8f8f2] outline-none focus:ring-2 focus:ring-[#bd93f9]"
      >
        <option value="openai" className="bg-[#3a3253] text-[#f8f8f2]">
          OpenAi (Reliable)
        </option>
        <option value="mistral" className="bg-[#3a3253] text-[#f8f8f2]">
          Mistral (Fast)
        </option>
      </select>

      <button
        onClick={handleSubmit}
        className="mt-2 flex w-full justify-center rounded-lg bg-gradient-to-r from-[#ff007f] to-[#8be9fd] p-3 font-bold text-[#f8f8f2] transition duration-200 hover:from-[#d6006a] hover:to-[#6272a4] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isRunning}
      >
        {isRunning ? "Generating..." : "Generate Code"}
      </button>

      <div className="h-full rounded-lg w-full overflow-y-auto p-0 bg-[#2b283d]">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "javascript"; // it finds if any language is there
              console.log(language);
              return !inline ? (
                <SyntaxHighlighter
                  style={synthwave84}
                  language={language}
                  PreTag="pre"
                  className="!m-0 !h-full !rounded-lg !bg-[#272135] !p-3"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre({ children }) {
              return <pre className="h-full">{children}</pre>;
            },
          }}
        >
          {output}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default AiHelpView;
