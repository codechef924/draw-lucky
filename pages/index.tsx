import { useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Loader from "@/components/Loader";

import { useContract, useMetamask, useAddress } from "@thirdweb-dev/react";

const Home: NextPage = () => {
    const address = useAddress();
    const [quantity, setQuantity] = useState<number>(1);
    const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

    if (isLoading) return <Loader />;

    if (!address) return <Login />;

    return (
        <div className="bg-[#091B18] min-h-screen flex flex-col">
            <Head>
                <title>Lucky Draw</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex-1">
                <Header />
                {/* The next draw box */}
                <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
                    <div className="stats-container">
                        <h1 className="text-3xl text-white font-semibold font-poppins text-center">
                            The next draw
                        </h1>
                        <div className="flex justify-between p-2 space-x-2">
                            <div className="stats">
                                <h2 className="text-sm">Total Pool</h2>
                                <p className="text-xl">0.2 ETH</p>
                            </div>
                            <div className="stats">
                                <h2 className="text-sm">Tickets Remaining</h2>
                                <p className="text-xl">100</p>
                            </div>
                        </div>

                        {/* Countdown timer */}
                    </div>

                    {/* The price per ticket box */}
                    <div className="stats-container space-y-2">
                        <div className="stats-container">
                            <div className="flex justify-between items-center text-white font-poppins pb-2">
                                <h2>Price per ticket</h2>
                                <p>0.02 ETH</p>
                            </div>
                            <div className="flex text-white font-poppins items-center space-x-2 rounded-sm bg-[#091B18] border-[#004337] border p-4">
                                <p>Tickets</p>
                                <input
                                    className="flex w-full bg-transparent text-right outline-none"
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={quantity}
                                    onChange={e => setQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className="space-y-2 mt-5">
                                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-poppins font-bold">
                                    <p>
                                        Total cost of tickets
                                    </p>
                                    <p>
                                        0.999 ETH
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-emerald-300 text-xs italic font-poppins">
                                    <p>
                                        Service fees
                                    </p>
                                    <p>
                                        0,001 ETH
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-emerald-300 text-xs italic font-poppins">
                                    <p>
                                        Network fees
                                    </p>
                                    <p>
                                        TBC
                                    </p>
                                </div>
                            </div>


                            <button className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white font-poppins shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed">
                                Buy Tickets
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div></div>
        </div>
    );
};

export default Home;
