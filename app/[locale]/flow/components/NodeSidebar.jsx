import React from "react";
import "../styles.css";
export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <>
            <h1>Drag and drop</h1>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            <div
                className="dndnode input"
                onDragStart={(event) => onDragStart(event, "input")}
                draggable
            >
                Input Node
            </div>
            <div
                className="dndnode"
                onDragStart={(event) => onDragStart(event, "default")}
                draggable
            >
                Default Node
            </div>
            <div
                className="dndnode output"
                onDragStart={(event) => onDragStart(event, "output")}
                draggable
            >
                Output Node
            </div>
        </>
    );
};
