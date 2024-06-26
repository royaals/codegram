import { useParams, useLocation, Link } from "react-router-dom";
import { Back } from "@/components/Back";
import { useEffect, useState } from "react";
import axios from "axios";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ConversionHistory = () => {
    const { id } = useParams();
    const location = useLocation();
    const { title } = location.state || { title: '' }; 
    const [data, setData] = useState('');
    const docsUrl = id?.replace('-new', '');
    console.log("id:", id);

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(data);
            console.log('Code copied to clipboard');
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://s3.ap-south-1.amazonaws.com/royal.codegram/${id}.json`);
                console.log("new code data", result.data);
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <>
            <Back />
            <div className="flex justify-center">
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div>
                        <div className="text-5xl font-extrabold">
                            {title ? title : 'Conversion History'}
                        </div>
                        <div className="pt-4">
                            <div className="bg-gray-900 rounded-md p-2">
                                <SyntaxHighlighter language="java" style={docco}>
                                    {data}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <button onClick={copyCode} className="rounded-md bg-blue-600 text-white px-3 py-1 mr-2 hover:bg-gray-700">
                                Copy
                            </button>
                            <Link to={`/docs/${docsUrl}`} state={{ title: title }}>
                                <button className="rounded-md bg-gray-800 text-white px-3 py-1 hover:bg-gray-700">
                                    Docs
                                </button>
                            </Link>
                            <Link to={`/debug/${id}`} state={{ title: title }}>
                                <button className="ml-3 rounded-md bg-yellow-600 text-white px-3 py-1">
                                    Debug
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConversionHistory;
