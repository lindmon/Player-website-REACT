import React from "react";
import {FaMusic} from 'react-icons/fa';

const Nav = ({setLibraryStatus, libraryStatus}) => {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library <FaMusic/>
            </button>
        </nav>
    );
}

export default Nav;
