import { Back } from "@/components/Back";
import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { BlogSkeleton } from "@/components/BodySkeleton";
import { API_URL } from "@/lib/utils";

//@ts-ignore
const sanitizeHTML = (htmlString) => {
    return { __html: htmlString };
};

const Docs = () => {
    const { id } = useParams();
    const location = useLocation();

    const { title } = location.state || { title: '' }; 
    const [OldHtmlContent, setOldHtmlContent] = useState('');
    const [NewHtmlContent, setNewHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);

    // Extract source and target languages from the title
    const titleRegex = /from (\w+) to (\w+) -/;
    const match = title.match(titleRegex);
    const sourceLang = match ? match[1] : '';
    const targetLang = match ? match[2] : '';
    console.log(title)
    console.log(targetLang);
    console.log(sourceLang);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Nresponse = await fetch(`${API_URL}/docs/get?chatid=${id}-new&title=${targetLang}`);
                const Oresponse = await fetch(`${API_URL}/docs/get?chatid=${id}-old&title=${sourceLang}`);

                if (!Oresponse.ok && !Nresponse.ok) {
                    throw new Error('Failed to fetch HTML content');
                }
                const Nhtml = await Nresponse.text();
                const Ohtml = await Oresponse.text();
                setOldHtmlContent(Ohtml);
                setNewHtmlContent(Nhtml);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id, sourceLang, targetLang]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 bg-gray-50 p-8 w-full h-screen">
                <div className="flex w-full flex-col items-center justify-center gap-4">
                    <div>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Back />
            <div className="justify-center overflow-hidden" style={{ display: 'flex' }}>
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12" style={{ flex: 1 }}>
                    {NewHtmlContent && (
                        <iframe
                            title="Embedded HTML Content"
                            className="overflow-hidden"
                            srcDoc={sanitizeHTML(NewHtmlContent).__html}
                            width="100%"
                            height="1000px"
                        ></iframe>
                    )}
                </div>
                <div className="px-10 w-full pt-200 max-w-screen-xl pt-12" style={{ flex: 1 }}>
                    {OldHtmlContent && (
                        <iframe
                            title="Embedded HTML Content"
                            className="overflow-hidden"
                            srcDoc={sanitizeHTML(OldHtmlContent).__html}
                            width="100%"
                            height="1000px"
                        ></iframe>
                    )}
                </div>
            </div>
        </>
    );
};

export default Docs;
