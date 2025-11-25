import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import BirthdayBalloons from "../../components/BirthdayBalloons";
import { PiCakeBold } from "react-icons/pi";

const GreetingCard = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [todayBirthdayPerson, setTodayBirthdayPerson] = useState(null);
    console.log(todayBirthdayPerson, "todayBirthdayPerson");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 100000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        async function fetchBirthdays() {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:3006/users");
                const birthdayData = await response.json();

                const today = new Date();
                console.log(today, "today");


                const day = String(today.getDate()).padStart(2, "0");
                console.log(day, "day");


                const month = String(today.getMonth() + 1).padStart(2, "0");
                console.log(month, "month");

                const todayKey = `${day}/${month}`;
                console.log(todayKey, "todayKey");

                console.log(birthdayData, "birthdayData");

                const found = birthdayData.find((user) => {
                    const [d, m, y] = user.dob.split("/");
                    return `${d}/${m}` === todayKey;
                });

                if (found) setTodayBirthdayPerson(found.name);
            } catch (error) {
                console.error(error || "error fetching data");
            }
            setLoading(false);
        }

        fetchBirthdays();
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-400 p-6">

            {/* ballons */}
            {todayBirthdayPerson && <BirthdayBalloons />}

            {/* sparkles */}
            {todayBirthdayPerson && showConfetti && <Confetti />}

            {/* Greeting Card */}
            <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-12 text-center">
                {loading ? (
                    <h1 className="text-3xl font-bold text-gray-600">Checking Birthdays...</h1>
                ) : todayBirthdayPerson ? (
                    <>
                        <div className="flex justify-center mb-4">
                            <div className="text-7xl text-purple-400 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                                <PiCakeBold />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-purple-700">
                            {`Happy Birthday, ${todayBirthdayPerson}!`}
                        </h1>
                        <p className="text-gray-700 text-2xl mt-4">
                            Wishing you a wonderful birthday filled with success, joy, and peaceful moments.
                            May the year ahead bring you everything you are hoping for.
                        </p>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold text-purple-700">No Birthdays Today</h1>
                )}
            </div>
        </div>
    );
};

export default GreetingCard;
