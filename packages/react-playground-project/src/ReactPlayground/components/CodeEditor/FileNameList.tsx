import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../PlaygroundContext";
import styles from "./index.module.scss";
import FileNameItem from "./FileNameItem";

const FileNameList = () => {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <FileNameItem
          value={tab}
          actived={selectedFileName === tab}
          onClick={() => {
            setSelectedFileName(tab);
          }}
        />
      ))}
    </div>
  );
};

export default FileNameList;
