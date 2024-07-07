"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
    Background,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Panel,
} from "reactflow";
import Dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import HumanNode from "./HumanNode";
import NodeSidebar from "./NodeSidebar";
import "../styles.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

const dagreGraph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
    dagreGraph.setGraph({ rankdir: direction });

    edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 172, height: 36 }); // set width and height of nodes
    });

    Dagre.layout(dagreGraph);

    return {
        nodes: nodes.map((node) => {
            const position = dagreGraph.node(node.id);
            const x = position.x - 86; // 172/2 = 86
            const y = position.y - 18; // 36/2 = 18
            return { ...node, position: { x, y } };
        }),
        edges,
    };
};

const nodeTypes = {
    humanNode: (props) => <HumanNode {...props} layoutDirection={props.layoutDirection} />,
};

const DnDFlow = ({ initialNodes, initialEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { fitView, screenToFlowPosition } = useReactFlow();
    const [layoutDirection, setLayoutDirection] = useState("TB");

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(initialNodes, initialEdges);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type: "humanNode",
                position,
                data: { label: `${type} node`, layoutDirection }, // Pass layoutDirection
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes, layoutDirection]
    );

    const onLayout = useCallback(
        (direction) => {
            setLayoutDirection(direction);
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements(nodes, edges, direction);
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges, setNodes, setEdges, fitView]
    );

    return (
        <>
            <div className="sidebar">
                <NodeSidebar />
            </div>
            <div className="reactflow-wrapper">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    nodeTypes={nodeTypes}
                >
                    <Background />
                    <Controls />
                    <Panel position="top-right">
                        <button className="btn" onClick={() => onLayout("TB")}>
                            Vertical
                        </button>
                        <button className="btn" onClick={() => onLayout("LR")}>
                            Horizontal
                        </button>
                    </Panel>
                </ReactFlow>
            </div>
        </>
    );
};

export default ({ initialNodes, initialEdges }) => (
    <div className="providerflow">
        <ReactFlowProvider>
            <DnDFlow initialNodes={initialNodes} initialEdges={initialEdges} />
        </ReactFlowProvider>
    </div>
);
