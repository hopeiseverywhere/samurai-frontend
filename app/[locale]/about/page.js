const AboutPage = ({ params }) => {
    const { locale } = params;
    return (
        <div>
            <h1>About Us</h1>
            <p>
                Welcome to our website! We are dedicated to providing you with
                the best service possible. Our team is passionate and committed
                to achieving excellence in every project we undertake. Here is a
                little more about us:
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to create innovative solutions that improve the
                lives of our customers. We strive to deliver high-quality
                products and services that exceed expectations and set new
                standards in the industry.
            </p>
            <h2>Our Values</h2>
            <ul>
                <li>
                    <strong>Integrity:</strong> We believe in doing the right
                    thing, always.
                </li>
                <li>
                    <strong>Excellence:</strong> We are committed to excellence
                    in everything we do.
                </li>
                <li>
                    <strong>Innovation:</strong> We foster a culture of
                    creativity and innovation.
                </li>
                <li>
                    <strong>Customer Focus:</strong> We put our customers at the
                    heart of everything we do.
                </li>
            </ul>
            <h2>Our Team</h2>
            <p>
                We have a diverse and talented team of professionals who are
                passionate about their work. Our team members come from various
                backgrounds and bring a wealth of knowledge and experience to
                the table.
            </p>
            <p>
                Thank you for visiting our website. We look forward to serving
                you and exceeding your expectations.
            </p>
        </div>
    );
};

export default AboutPage;
