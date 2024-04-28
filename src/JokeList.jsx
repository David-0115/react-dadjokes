import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke-Class";
import "./JokeList.css";


/** List of jokes. */

const JokeList = ({ numJokes = 5 }) => {
    const [jokes, setJokes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchData, setFetchData] = useState(true)

    const generateNewJokes = () => {
        setJokes([]);
        setIsLoading(true)
        setFetchData(fData => !fData)
    };

    useEffect((numJokes) => {
        const getJokes = async () => {
            try {
                // load jokes one at a time, adding not-yet-seen jokes
                let seenJokes = new Set();

                while (jokes.length < numJokes) {
                    let res = await axios.get("https://icanhazdadjoke.com", {
                        headers: { Accept: "application/json" }
                    });
                    let { ...joke } = res.data;

                    if (!seenJokes.has(joke.id)) {
                        seenJokes.add(joke.id);
                        setJokes({ ...jokes, ...joke, votes: 0 });
                    } else {
                        console.log("duplicate found!");
                    }
                }

                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
    }, [fetchData])

    const vote = (id, num) => {
        const joke = jokes.find(joke => joke.id === id)
        joke.votes += num
        const newJokes = [...jokes]
        setJokes(newJokes)
    }

    return (
        <>
            {isLoading ? <div className="loading"><i className="fas fa-4x fa-spinner fa-spin" /></div>
                :
                <div className="JokeList">
                    <button
                        className="JokeList-getmore"
                        onClick={generateNewJokes}
                    >
                        Get New Jokes
                    </button>

                    {jokes.map(j => (
                        <Joke
                            text={j.joke}
                            key={j.id}
                            id={j.id}
                            votes={j.votes}
                            vote={vote}
                        />
                    )).sort((a, b => b.votes - a.votes))}
                </div>}
        </>
    )

}

export default JokeList;
