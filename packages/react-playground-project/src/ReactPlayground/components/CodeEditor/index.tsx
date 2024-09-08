import { useContext } from "react";
import { EditorProps } from "@monaco-editor/react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";
import { debounce } from "lodash-es";

const CodeEditor = () => {
  const {
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName,
    addFile,
    removeFile,
  } = useContext(PlaygroundContext);

  const file = files[selectedFileName];
  console.log("render");

  const onEditorChange: EditorProps["onChange"] = (code) => {
    files[file.name].value = code!;
    setFiles({ ...files });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  );
};

export default CodeEditor;
