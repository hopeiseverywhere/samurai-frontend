import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import "../styles.css";

const NodeSidebar = ({ onDragStart, locale }) => {
    const t = useTranslations("FlowSideBar");
    const [givenName, setGivenName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [nickName, setNickName] = useState("");

    useEffect(() => {
        generateNickname();
    }, [givenName, familyName, locale]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "givenName") {
            setGivenName(value);
        } else if (name === "familyName") {
            setFamilyName(value);
        }
    };

    const generateNickname = () => {
        if (locale === "jp") {
            setNickName(`${familyName} ${givenName}`);
        } else if (locale === "en") {
            setNickName(`${givenName} ${familyName}`);
        }
    };

    const handleDragStart = (event) => {
        if (givenName && familyName) {
            const customText = {
                givenName: givenName,
                familyName: familyName,
                nickName: nickName
            };
            onDragStart(event, "default", customText);
        } else {
            
            alert(t("alert"));
        }
    };

    return (
        <>
            <h1>{t("title")}</h1>
            <div className="description">{t("instruction")}</div>
            <div>
                <label>
                    {t("enterGivenName")}:
                    <input
                        type="text"
                        name="givenName"
                        value={givenName}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    {t("enterFamilyName")}:
                    <input
                        type="text"
                        name="familyName"
                        value={familyName}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    {t("enterNickName")}:
                    <input
                        type="text"
                        name="nickName"
                        value={nickName}
                        readOnly
                    />
                </label>
            </div>
            <div className="dndnode" onDragStart={handleDragStart} draggable>
                {t("default")}
            </div>
        </>
    );
};

export default NodeSidebar;
