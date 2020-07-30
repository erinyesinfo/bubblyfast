import React from 'react';
import "./index.css";

import Header from "./Header";
import Content from "./Content";

const SideBar = () => {
    return (
        <div className="sideBar">
            {/* Header */}
            <Header />
            {/* content */}
            <Content />
        </div>
    );
};

export default SideBar;
