import React from 'react';
import './Navbar.css'; 
function Navbar(){
   return(
    <nav className="navbar">
    <div className="logo">MyWebsite</div>
    <ul className="nav-links">
        <li><a href="/">Login</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/upload">Upload</a></li>
        <li><a href="/history">History</a></li>
        <li><a href="/signup">Signup</a></li>
    </ul>
</nav>
      
   );
}
export default Navbar;