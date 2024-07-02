import React from "react";
import ReactFlow, { Controls, MiniMap, Background } from "reactflow";
import "reactflow/dist/style.css";
const defaultStyles = {
    background: "white",
    width: "100%",
    height: 200,
};
const PositionLoggerNode = ({ xPos, yPos, data }) => {
    const x = `${Math.round(xPos)}px`;
    const y = `${Math.round(yPos)}px`;

    return (
        <div className="react-flow__node-default">
            {data.label && <div>{data.label}</div>}
            <div>
                {x} {y}
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

const ReactFlowComponent = ({ flowData, styles = defaultStyles }) => {
    return (
        <div className="reactflow-wrapper" style={{ height: styles.height }}>
            <ReactFlow
                nodes={flowData.nodes}
                edges={flowData.edges}
                fitView
                style={styles}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default ReactFlowComponent;
