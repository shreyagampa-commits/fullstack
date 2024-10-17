// About.js
import React from 'react';
import './About.css'; 
import backgroundImage from './Screenshot 2024-08-22 132733.png';

function About() {
    return (     
        <div  className="about-background"style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '120vh' }}>
        <b id="about">About Us</b>
        <b id="a">Our Mission
        </b>
        <div id="b">
        <p> Jewelry design is a complex art form that combines craftmanship,aesthetics and material science.</p>
        <p>Our vision is to enhance the design process through AI-driven solution.We believe that the future</p>
        <p>of jewelry design lies in the innovative use of technology </p>
        </div>
        <div>
            <b id="c">What We Do</b>
            <div id="d">
            <p>Traditionally, creating unique jewelry patterns requires extensive expertise and creativity. </p>
            <p>Innovation in Design: Integrate advanced DL techniques to push the boundaries of traditional jewelry design.</p>
            <p>Interactive Interface: User-friendly interface for designers to interact with the AI system, </p>
            <p>view generated patterns, and make adjustments.</p>
            <p>Client-Centric Approach: We work closely with clients to understand their needs and provide </p>
            <p>ailored solutions that exceed their expectations.</p>
            </div>
        </div>
        <div>
            <b id="e">Contact Us</b>
            <div id="f">
            <p>We’d love to hear from you! Whether you’re a designer interested in our tools, a potential partner,</p>
            <p>or simply curious about our project, feel free to reach out.</p>
            </div>
        </div>
    </div>


    );
}
export default About;