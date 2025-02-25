import { useState } from "react";
import info from "./data.json";
const jsonData = info.data;
function GetFileExplorer() {
  const [folderInfo, setFolderInfo] = useState(jsonData);
  console.log("folderInfo", folderInfo);
  const [isExpanded, setIsExpanded] = useState({
    Public: false,
    Src: false,
    Components: false,
    Test: false,
    New: false,
  });
  function addNewNode(parentId) {
    const name = prompt("enter name");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: {
              id: Date.now().toString(),
              name: name,
              isFolder: true,
              children: [],
            },
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };
    setFolderInfo((prev) => updateTree(prev));
  }
  console.log("isExpanded", isExpanded);
  console.log("data", jsonData);
  const List = ({ folderData, addNewNode }) => {
    return (
      <>
        {folderData.map((node, index) => (
          <div key={index} className="children">
            <p className="container">
              <span
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name]: !isExpanded[node.name],
                  }))
                }
              >
                {node.isFolder && (isExpanded[node.name] ? "-" : "+")}
              </span>
              {node.name}
              <button onClick={() => addNewNode(node.id)}>Add</button>
              <button>Delete</button>
            </p>
            {isExpanded[node.name] && node.children && (
              <List data={node.children} />
            )}
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <List folderData={folderInfo} addNewNode={addNewNode} />
    </div>
  );
}

export default GetFileExplorer;
