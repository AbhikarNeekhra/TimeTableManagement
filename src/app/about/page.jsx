const About = () => {

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 bg-gray-100">
                <div className="container mx-auto py-12">
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
                        <h1 className="text-4xl font-bold mb-4">About Us</h1>
                        <p className="text-gray-700 mb-6">
                            Welcome to our website! We are currently working hard to bring you exciting content and features. Stay tuned for updates!
                        </p>
                        <div className="bg-yellow-200 p-4 rounded-md">
                            <p className="text-yellow-800 font-semibold">This project is under construction.</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default About;
