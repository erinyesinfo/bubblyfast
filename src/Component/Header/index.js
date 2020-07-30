import React from 'react';
import bubblyFast from '../../IMG/BubblyFast-fff.svg';
import bubblyFast_lower from '../../IMG/bubblyFast.jpg';
import './index.css';

/* helper */
import LazyLoad from '../ThirdParty-Library/LazyLoad';

const Header = () => (
    <LazyLoad image={{
        wrapperClassName: 'bubbly-logo-span',
        className: 'logo',
        src: bubblyFast,
        alt: 'bubblyFast_logo',
        placeholder: bubblyFast_lower,
        draggable: 'false'
    }}/>
);

export default Header;
