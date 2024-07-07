import React from "react";
import { Handle, Position } from "reactflow";
import "../styles.css";

const HumanNode = ({ data, isHorizontal }) => {
    return (
        <div className="custom-node">
            <Handle type="target" position={isHorizontal ? "left" : "top"} />
            <div>{data.label}</div>
            <Handle
                type="source"
                position={isHorizontal ? "right" : "bottom"}
            />
        </div>
    );
};

export default HumanNode;
