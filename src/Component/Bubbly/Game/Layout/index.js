import React from 'react';
import "./index.css";

import Balls from './Balls/index';
import SideBar from './SideBar/index';

const Layout = () => {
    return (
        <div className="layout">
            <Balls />
            {/* bars of highest players */}
            <SideBar />
        </div>
    );
};

export default Layout;
