import { FC } from "react";
import MonacoEditor, { EditorProps, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { createATA } from "./ata";

interface FileTypes {
  name: string;
  value: string;
  language: string;
}

interface Props {
  file: FileTypes;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

const Editor: FC<Props> = (props) => {
  const { file, onChange, options } = props;

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });
    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height="100%"
      path={file.name}
      language={file.language}
      value={file.value}
      onMount={handleEditorMount}
      onChange={onChange}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        ...options,
      }}
    />
  );
};

export default Editor;
