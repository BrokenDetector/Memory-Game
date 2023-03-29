import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { imgList } from "./imagesList";

function Main() {
    const [imageIdList, setImageIdList] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(
        JSON.parse(localStorage.getItem("BEST_SCORE"))
            ? JSON.parse(localStorage.getItem("BEST_SCORE"))
            : 0
    );
    const [randomArray, setRandomArray] = useState(imgList);

    const createNewImages = () => {
        // Create New Image List
        let newArray = randomArray;
        for (let i = imgList.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let k = imgList[i];
            newArray[i] = newArray[j];
            newArray[j] = k;
        }
        setRandomArray(newArray);
    };

    const handleClick = (event) => {
        createNewImages();

        // Change Score And Add Image Id
        if (imageIdList.includes(event.target.parentElement.id)) {
            setScore(0);
            setImageIdList([]);
        } else {
            setScore(score + 1);
            const imgId = event.target.parentElement.id;
            setImageIdList((prev) => [...prev, imgId]);
        }
    };

    useEffect(() => {
        // Change best score
        if (score >= bestScore) {
            setBestScore(score);
            localStorage.setItem("BEST_SCORE", JSON.stringify(score));
        }
    }, [score]);

    return (
        <main>
            <div className="flex gap-2 justify-center">
                <h2>Score: {score}</h2>
                <h2>Best score: {bestScore}</h2>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 px-5 my-7 min-w-[660px]">
                {randomArray.map((item) => {
                    return (
                        <div
                            className="flex flex-col justify-self-center w-fit gap-5 drop-shadow-xl hover:scale-105 text-center cursor-pointer rounded-lg border-[7px] bg-green-500 border-green-500"
                            key={uuid()}
                            id={item.id}
                            onClick={handleClick}
                        >
                            <img
                                src={item.name}
                                width="200px"
                                height="200px"
                                className="rounded-lg"
                            />
                            <h3 className="text-2xl border-b-[20px] bg-green-500 border-green-500">
                                {item.name[0].toUpperCase() +
                                    item.name
                                        .slice(0, item.name.lastIndexOf("."))
                                        .slice(1)}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}

export default Main;
