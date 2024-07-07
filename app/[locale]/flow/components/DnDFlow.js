"use client";
import React, { useCallback, useEffect } from "react";
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
import dagre from "dagre";
import "reactflow/dist/style.css";
import HumanNode from "./HumanNode";
import NodeSidebar from "./NodeSidebar";
import "../styles.css";

let id = 0;
const getId = () => `dndnode_${id++}`;

// Initialize Dagre graph
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 172;
const nodeHeight = 36;

// Function to layout nodes and edges using Dagre
const getLayoutedElements = (nodes, edges, direction = "TB") => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
    nodes.forEach((node) => {
        // set width and height of nodes
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? "left" : "top";
        node.sourcePosition = isHorizontal ? "right" : "bottom";

        // Shift the node position to match React Flow's top-left anchor point
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });
    return { nodes, edges };
};

// Define custom node types
const nodeTypes = {
    humanNode: HumanNode,
};
// Main component for the drag-and-drop flow
const DnDFlow = ({ initialNodes = [], initialEdges = [] }) => {
    // State management for nodes and edges
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { fitView, screenToFlowPosition } = useReactFlow();

    // Layout nodes and edges on initial load
    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(initialNodes, initialEdges);
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        window.requestAnimationFrame(() => {
            fitView();
        });
    }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

    // Callback for connecting nodes
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
        [setEdges]
    );

    // Callback for handling drag over event
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // Callback for handling drop event to add new nodes
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
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes]
    );

    // Callback for re-layouting nodes and edges
    const onLayout = useCallback(
        (direction) => {
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

export default ({ initialNodes = [], initialEdges = [] }) => (
    <div className="providerflow">
        <ReactFlowProvider>
            <DnDFlow initialNodes={initialNodes} initialEdges={initialEdges} />
        </ReactFlowProvider>
    </div>
);
