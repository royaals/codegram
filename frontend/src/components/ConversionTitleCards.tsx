import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogSkeleton } from "./BodySkeleton";

const ConversionTitleCards = () => {
    const [conversionTitles, setConversionTitles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userid = user.id;
        console.log('User ID:', userid);
    
        if (userid) {
            const url = `${API_URL}/chatid/get?userid=${userid}`;
            axios.get(url)
                .then(response => {
                    setConversionTitles(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error!", error);
                    setLoading(false);
                });
        }
    }, []);
    
    if (loading) {
        return (
            <div className="flex flex-col items-center gap-6 bg-gray-50 p-8 md:w-1/4">
                <div className="flex w-full max-w-md ml-28 flex-col items-start justify-center gap-4">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 bg-gray-50 p-8 md:w-1/4">
            <h2 className="text-2xl mt-20 font-bold tracking-tight sm:text-3xl">Conversion History</h2>
            <div className="flex w-full max-w-  flex-col items-start justify-center gap-4">
                {conversionTitles.length ? conversionTitles.slice().reverse().map((title, index) => (
                    <Link 
                        to={`/convert/${title[0]}-new`} 
                        key={index} 
                        state={{ title: title[1] }} // Passing title[1] as state
                        className="cursor-pointer"
                    >
                        <div className="rounded-md border border-gray-200 bg-white p-3 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">{title[1]}</h3>
                            </div>
                        </div>
                    </Link>
                )) : (
                    <div className="ml-24 pb-8 pt-5">
                        No Conversion History
                    </div>
                )}
            </div>
        </div>
    )
}

export default ConversionTitleCards;
