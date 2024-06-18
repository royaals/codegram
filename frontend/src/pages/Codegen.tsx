import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Navigate } from 'react-router-dom';
import { API_URL } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { useState, ChangeEvent } from "react";
import axios from 'axios';
import { Spinner } from "@/components/Spinner";
import ConversionTitleCards from "@/components/ConversionTitleCards";
import { Link } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Codegen() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userid = user?.id;

  const [convertedCode, setConvertedCode] = useState<string>('');
  const [conId, setConId] = useState<string>('');
  const [conTitle, setConTitle] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const isAuthenticated = localStorage.getItem('user') !== null;
  const [dropInputs, setDropInputs] = useState<{
    from: string;
    to: string;
    file: File | null;
    userid: string;
    fileName?: string;
  }>({
    from: "",
    to: "",
    file: null,
    userid: userid,
  });

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(convertedCode);
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  function getFileExtension() {
    switch (dropInputs.to) {
      case "java":
        return "java";
      case "python":
        return "py";
      case "csharp":
        return "cs";
      default:
        return "";
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      setDropInputs(prevState => ({
        ...prevState,
        file: file,
        fileName: fileNameWithoutExtension,
      }));
    }
  };

  const handleConvert = async () => {
    setIsConverting(true);
    console.log('Convert button clicked');
    const { from, to, file, userid } = dropInputs;
    console.log('Inputs:', { from, to, file, userid });
    if (file && from && to) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('from', from);
      formData.append('to', to);
      formData.append('userid', userid);
      console.log('FormData:', formData);
      try {
        console.log('Making API request...');
        const response = await axios.post(API_URL + "/convert", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response);
        if (response.status === 200) {
          setIsConverting(false);
          setConvertedCode(response.data.code);
          setConId(response.data.id);
          setConTitle(response.data.title);
        } else {
          console.error('Conversion failed with status:', response.status);
          setIsConverting(false);
        }
      } catch (error) {
        console.error('API request failed with error:', error);
        setIsConverting(false);
      }
    } else {
      console.error('Missing input(s):', { from, to, file, userid });
      setIsConverting(false);
    }
  };

  console.log('ConId:', conId);

  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full">
        <div className="flex flex-col items-center gap-6 bg-gray-100 p-8 w-full md:w-3/4 overflow-y-auto">
          <h1 className="text-3xl font-bold tracking-tight mt-20 sm:text-4xl">Legacy to Modern Code Converter</h1>
          <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="file-upload" className="w-full">Upload Legacy Code</Label>
              <Input accept=".pas,.dfm,.cob,.cbl,.vb,.vbs" id="file-upload" required type="file" onChange={handleFileChange} className="w-full" />
            </div>
            <div className="grid w-full gap-2">
              <label htmlFor="from-language" className="py-1 pr-2 text-sm font-semibold w-full">Legacy code</label>
              <select
                id="from-language"
                onChange={(e) => setDropInputs(prevState => ({ ...prevState, from: e.target.value }))}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select legacy language</option>
                <option value="cobol">Cobol</option>
                <option value="vb">Visual Basic</option>
                <option value="delphi">Delphi</option>
              </select>
            </div>
            <div className="grid w-full gap-2">
              <label htmlFor="to-language" className="py-1.5 pr-2 text-sm font-semibold w-full">Convert to</label>
              <select
                id="to-language"
                onChange={(e) => setDropInputs(prevState => ({ ...prevState, to: e.target.value }))}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select target language</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="csharp">C#</option>
              </select>
            </div>
            <Button onClick={handleConvert} className="w-full">Convert</Button>
            {isConverting && <Spinner />}
            {convertedCode && (
             
              <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm w-full max-w-3xl">
                <h3 className="text-lg font-semibold mb-4">Converted Code</h3>
                <div className=" rounded-md p-4 mb-4">
                  <pre className="whitespace-pre-wrap break-words font-mono text-sm text-gray-900">
                  <SyntaxHighlighter language={dropInputs.to} style={docco}>
                  {convertedCode}
                </SyntaxHighlighter>
                    
                  </pre>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="rounded-md bg-blue-600 text-white px-4 py-2 hover:bg-blue-500 transition duration-300"
                  >
                    Copy
                  </button>
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(convertedCode)}`}
                    download={`${dropInputs.fileName}.${getFileExtension()}`}
                    className="rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-500 transition duration-300"
                  >
                    Download
                  </a>
                  <Link to={`/docs/${conId}`} state={{ title: conTitle }} className="rounded-md bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 transition duration-300">
                    Docs
                  </Link>
                  <Link to={`/debug/${conId}-new`} state={{ title: conTitle }}  className="rounded-md bg-yellow-600 text-white px-4 py-2 hover:bg-yellow-500 transition duration-300">
                    Debug
                  </Link>
                 
                </div>
              </div>
            )}
          </div>
        </div>
        <ConversionTitleCards />
      </div>
    </>
  );
}
