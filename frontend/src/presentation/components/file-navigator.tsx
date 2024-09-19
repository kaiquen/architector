import React, { useState } from "react";


export type FileStructure = {
    [key: string]: string | FileStructure;
}

export type ProjectStructure = {
    name: string;
    files: FileStructure;
}

type IProps = {
    files: FileStructure;
    onSelect(filePath: string):void;
}

export const FileNavigator:React.FC<IProps> = ({files, onSelect}) => {
    const [openDirs, setOpenDirs] = useState<string[]>([]);

    const toggleDir = (dir: string) => {
        setOpenDirs((prev) =>
          prev.includes(dir) ? prev.filter((d) => d !== dir) : [...prev, dir]
        );
    };

    const renderFiles = (files: FileStructure, path: string = ''): React.JSX.Element[] => {
        return Object.keys(files).map((fileName) => {
            const fullPath = path ? `${path}/${fileName}` : fileName;

            if(typeof files[fileName] === "string") {
                return (
                    <li key={fullPath} onClick={() => onSelect(fullPath)}>
                        {fileName}
                    </li>
                )
            } else {
                return (
                    <li key={fullPath}>
                      <span onClick={() => toggleDir(fullPath)} style={{ cursor: 'pointer' }}>
                        {fileName}/
                      </span>
                      {openDirs.includes(fullPath) && (
                        <ul style={{ paddingLeft: '20px' }}>
                          {renderFiles(files[fileName] as FileStructure, fullPath)}
                        </ul>
                      )}
                    </li>
                  );
            }
        })
    }
    return (
        <ul>
            {renderFiles(files)}
        </ul>
    );
}