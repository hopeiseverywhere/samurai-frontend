export const transformDataToFlow = (data, parentId = null) => {
    const nodes = [];
    const edges = [];

    const createNodeAndEdge = (person, parentId) => {
        const nodeId = person.identifier;
        nodes.push({
            id: nodeId,
            type: "default",
            data: {
                label: `${person.givenName.en} ${person.familyName.en}`,
            },
            position: { x: Math.random() * 500, y: Math.random() * 500 },
        });

        if (parentId) {
            edges.push({
                id: `e-${parentId}-${nodeId}`,
                source: parentId,
                target: nodeId,
                type: "smoothstep",
            });
        }

        if (person.offspring && person.offspring.length > 0) {
            person.offspring.forEach((child) =>
                createNodeAndEdge(child, nodeId)
            );
        }
    };

    createNodeAndEdge(data, parentId);

    return { nodes, edges };
};
