import React from "react";
import usefilestore from "../../store/usefilestore";
import Editor from "./Editor";
import FileTab from "./FileTab";

function CodingEditor() {
  const { openFiles } = usefilestore();
  if (openFiles.length <= 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-xl text-white">No file is currently open.</h1>
      </div>
    );
  }

  return (
    <main
      className={"flex w-full flex-col overflow-x-auto md:h-screen"}
    >
      <FileTab />
      <Editor />
    </main>
  );
}


export default CodingEditor;
