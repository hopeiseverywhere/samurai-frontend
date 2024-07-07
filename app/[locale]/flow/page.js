"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import mockOffspringData from "./data/mockOffspringData";
import { transformDataToFlow } from "./util/dataTransform";
import { useTranslations } from "next-intl";

const DnDFlow = dynamic(() => import("./components/DnDFlow"), { ssr: false });

const FlowPage = ({ params }) => {
    const { locale } = params;
    // const t = useTranslations("Offspring");

    const [offspringData, setOffspringData] = useState(null);
    const [flowData, setFlowData] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        // Here you can fetch the data or use mock data
        const data = mockOffspringData; // Replace this with your data fetching logic
        const transformedData = transformDataToFlow(data, locale);
        console.log("Transformed Data:", transformedData);
        setFlowData(transformedData);
    }, [locale]);

    return (
        <>
            <DnDFlow
                initialNodes={flowData.nodes}
                initialEdges={flowData.edges}
            />
        </>
    );
};

export default FlowPage;
