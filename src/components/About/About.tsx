const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          Welcome to{" "}
          <span className="font-semibold text-blue-500">ByteLine</span>, your
          go-to destination for the latest and greatest in the world of
          technology. Our mission is to bring you the most relevant news,
          in-depth analysis, and thought-provoking insights about the
          ever-evolving tech industry.
        </p>
        <p className="text-gray-600 text-lg mb-4">
          At <span className="font-semibold text-blue-500">ByteLine</span>, we
          are passionate about connecting enthusiasts, professionals, and
          curious minds with the information they need to stay ahead in the
          fast-paced world of technology.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          What We Cover
        </h2>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
          <li>Breaking tech news and updates</li>
          <li>Product launches and reviews</li>
          <li>Innovations in AI, blockchain, and emerging technologies</li>
          <li>Insights into software development and engineering</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-600 text-lg">
          We believe in empowering individuals with knowledge and fostering a
          community where technology enthusiasts can share, learn, and grow
          together.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-600 text-lg">
            Our team consists of experienced journalists, developers, and tech
            enthusiasts dedicated to providing you with high-quality, reliable
            content.
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ByteLine. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
