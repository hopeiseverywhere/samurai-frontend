// app/[locale]/offspring/[identifier]/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import ReactFlowComponent from "@components/ReactFlowComponent";
import { transformDataToFlow } from "@util/dataTransform";
import "reactflow/dist/style.css";
import mockOffspringData from "../../../../public/mockOffspringData.json";
const USE_MOCK_DATA = true; // Toggle this to true to use mock data

async function fetchOffspringData(identifier) {
    if (!identifier) return null;
    const res = await fetch(
        `http://localhost:8080/api/v1/samurai/offspring/${identifier}`
    );
    if (!res.ok) {
        throw new Error("Failed to fetch offspring data");
    }
    return await res.json();
}

const Offspring = ({ params }) => {
    const { locale, identifier } = params;
    const t = useTranslations("Offspring");

    const [offspringData, setOffspringData] = useState(null);
    const [flowData, setFlowData] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        const getOffspringData = async () => {
            try {
                let data;
                if (USE_MOCK_DATA) {
                    data = mockOffspringData;
                } else {
                    data = await fetchOffspringData(identifier);
                }
                setOffspringData(data);

                const transformedData = transformDataToFlow(data);
                console.log(transformedData);
                setFlowData(transformedData);
            } catch (error) {
                console.error("Error fetching offspring data:", error);
            }
        };

        if (identifier || USE_MOCK_DATA) {
            getOffspringData();
        }
    }, [identifier]);

    if (!offspringData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="window-container">
            <ReactFlowComponent flowData={flowData} />
        </div>
    );
};

export default Offspring;
