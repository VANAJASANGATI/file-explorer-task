import { useState } from "react";
import info from "./data.json";
const jsonData = info.data;
function GetFileExplorer() {
  const [isExpanded, setIsExpanded] = useState([
    { name: "Public", isExpanded: false },
    { name: "Src", isExpanded: false },
    { name: "Components", isExpanded: false },
    { name: "Test", isExpanded: false },
  ]);
  console.log("data", jsonData);
  const List = ({ data }) => {
    console.log("listdata", data);
    return (
      <>
        {data.map((node, index) => (
          <div key={index}>
            <p>
              {node.name}
              <span>{node.isFolder && "+"}</span>{" "}
            </p>
            {node.children && <List data={node.children} />}
          </div>
        ))}
      </>
    );
  };
  return (
    <div>
      <List data={jsonData} />
    </div>
  );
}

export default GetFileExplorer;
