export const transformDataToFlow = (
    data,
    locale,
    parentId = null,
    xPos = 0,
    yPos = 0
) => {
    const nodes = [];
    const edges = [];
    const yIncrement = 100; // Distance between offspring nodes
    const xIncrement = 200; // Distance between sibling nodes

    const createNodeAndEdge = (person, parentId, currentXPos, currentYPos) => {
        const nodeId = person.identifier;
        nodes.push({
            id: nodeId,
            type: "humanNode",
            data: {
                label: `${person.nickName[locale]}`,
            },
            position: { x: xPos, y: yPos }, // Set position
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
            let yOffset = currentYPos + yIncrement;
            person.offspring.forEach((child) => {
                createNodeAndEdge(child, nodeId, currentXPos, yOffset);
                yOffset += yIncrement;
            });
        }

        return currentXPos + xIncrement; // Increment x position for the next sibling
    };

    let nextXPos = xPos;
    data.offspring.forEach((child) => {
        nextXPos = createNodeAndEdge(
            child,
            data.identifier,
            nextXPos,
            yPos + yIncrement
        );
    });

    createNodeAndEdge(data, parentId, xPos, yPos);

    return { nodes, edges };
};
