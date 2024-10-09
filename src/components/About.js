import React from 'react';
import './css/About.css'; // استيراد ملف التنسيق

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>ABOUT US</h1>
            
            <p>
                Welcome to cafeShop, your ultimate destination for delicious desserts and refreshing beverages. 
                Our passion for quality and flavor is reflected in every treat we serve. 
                Whether you're looking for a cozy spot to unwind or a place to enjoy time with friends, 
                cafeShop offers a warm and inviting atmosphere. 
                Join us and indulge in a delightful experience where every bite and sip brings joy!
            </p>
            <img src="https://th.bing.com/th/id/OIP.ZEVsrE-mRdDfN1wpiraLOAHaJ4?rs=1&pid=ImgDetMain" alt="CafeShop" />
        </div>
    );
};

export default AboutUs;