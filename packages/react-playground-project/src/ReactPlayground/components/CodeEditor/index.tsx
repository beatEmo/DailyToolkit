import { EditorProps } from "@monaco-editor/react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";

const CodeEditor = () => {
  const file = {
    name: "guang.tsx",
    value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
    language: "typescript",
  };

  const onEditorChange: EditorProps["onChange"] = (code) => {
    console.log(code);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
};

export default CodeEditor;
