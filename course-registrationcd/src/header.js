import React, { useState } from 'react';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [profileActive, setProfileActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    return (
        <header className="header">
            <section className="flex">
                <a href="home.html" className="logo">Course Reg.</a>
                <div className="icons">
                    <div id="menu-btn" className="fas fa-bars"></div>
                    <div
                        id="search-btn"
                        className="fas fa-search"
                        onClick={() => setSearchActive(!searchActive)}
                    ></div>
                    <div
                        id="user-btn"
                        className="fas fa-user"
                        onClick={() => setProfileActive(!profileActive)}
                    ></div>
                    <div
                        id="toggle-btn"
                        className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}
                        onClick={toggleDarkMode}
                    ></div>
                </div>
                {profileActive && (
                    <div className="profile">
                        <img src="images/pic-1.jpg" className="image" alt="Profile" />
                        <h3 className="name">Pavan</h3>
                        <p className="role">Student</p>
                        <a href="profile.html" className="btn">view profile</a>
                        <div className="flex-btn">
                            <a href="login.html" className="option-btn">login</a>
                            <a href="register.html" className="option-btn">register</a>
                        </div>
                    </div>
                )}
            </section>
        </header>
    );
};

export default Header;
