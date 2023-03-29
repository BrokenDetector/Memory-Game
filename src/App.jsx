import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex flex-col justify-center items-center text-center w-full h-screen">
                    <FadeLoader color="black" loading={loading} size={10} />
                    <h1 className="font-bold text-black">Loading...</h1>
                </div>
            ) : (
                <>
                    <Header />
                    <Main />
                    <Footer />
                </>
            )}
        </>
    );
}

export default App;
