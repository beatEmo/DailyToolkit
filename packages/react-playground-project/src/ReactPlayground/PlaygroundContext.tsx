import { createContext, PropsWithChildren, useState } from "react";
import { fileName2Language } from "./utils";
import { initFiles } from "./files";

export interface File {
  name: string;
  value: string;
  language: string;
}

export interface Files {
  [k: string]: File;
}

export interface PlaygroundContext {
  files: Files;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFile: (oldFileName: string, newFileName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: "App.tsx",
} as PlaygroundContext);

const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState<string>("App.tsx");

  const addFile = (fileName: string) => {
    if (!files[fileName]) return false;
    files[fileName] = {
      name: fileName,
      language: fileName2Language(fileName),
      value: "",
    };
    setFiles({ ...files });
    return true;
  };
  const removeFile = (fileName: string) => {
    Reflect.deleteProperty(files, fileName);
    setFiles({ ...files });
  };
  const updateFile = (oldFileName: string, newFileName: string) => {
    if (!files[oldFileName] || !oldFileName || !newFileName) return false;
    const { [oldFileName]: value, ...rest } = files;
    const newFile = {
      [newFileName]: {
        name: newFileName,
        language: fileName2Language(newFileName),
        value: value.value,
      },
    };
    setFiles({ ...rest, ...newFile });
  };

  return (
    <>
      <PlaygroundContext.Provider
        value={{
          files,
          selectedFileName,
          setSelectedFileName,
          setFiles,
          addFile,
          removeFile,
          updateFile,
        }}
      >
        {children}
      </PlaygroundContext.Provider>
    </>
  );
};

export default PlaygroundProvider;
