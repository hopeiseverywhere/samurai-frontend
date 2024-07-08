import React, { useState, useEffect } from "react";
import { Handle } from "reactflow";
import "../styles.css";

const HumanNode = ({ data, isHorizontal, isNew }) => {
    const [formData, setFormData] = useState({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        data.firstName = formData.firstName;
        data.lastName = formData.lastName;
    }, [formData, data]);

    return (
        <div className="custom-node">
            <Handle type="target" position={isHorizontal ? "left" : "top"} />
            {isNew ? (
                
                <form>
                    <h1>Sup</h1>
                    <div>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                </form>
            ) : (
                <div>{data.label}</div>
            )}
            <Handle
                type="source"
                position={isHorizontal ? "right" : "bottom"}
            />
        </div>
    );
};

export default HumanNode;
