import React, { useEffect } from "react";
import userunstore from "../../../store/runstore";
import { LuCopy } from "react-icons/lu";
import { PiCaretDownBold } from "react-icons/pi";

const RunView = () => {
  const availableLangauges = userunstore((state) => state.availableLanguage);
  const isRunning = userunstore((state) => state.isRunning);
  const output = userunstore((state) => state.output);
  const selectedLanguage = userunstore((state) => state.selectedLanguage);

  useEffect(() => {
    // console.log(selectedLanguage);
    // console.log(output);
  }, [output]);

  const { setselectedLanguage, setinput, runCode } = userunstore();

  const handleChangeLanguage = (e) => {
    const lang = JSON.parse(e.target.value);
    setselectedLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 text-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Run Code</h1>
      <div className="flex flex-col w-full max-w-4xl flex-1 space-y-4">
        <div className="relative">
          <select
            className="w-full rounded-lg bg-gray-700 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChangeLanguage}
            value={JSON.stringify(selectedLanguage)}
          >
            {availableLangauges.data?.sort((a, b) => (a.language > b.language ? 1 : -1)).map((lang, i) => (
              <option key={i} value={JSON.stringify(lang)}>
                {lang.language + (lang.version ? ` (${lang.version})` : ``)}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="w-full flex-none rounded-lg bg-gray-700 p-4 placeholder-gray-400 focus:ring-2 focus:ring-primary resize-none"
          style={{ minHeight: '150px' }}
          placeholder="Write your input here..."
          onChange={(e) => setinput(e.target.value)}
        />

        <button
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run'}
        </button>

        <label className="flex w-full justify-between items-center font-medium">
          <span>Output:</span>
          <button title="Copy Output">
            <LuCopy size={20} className="hover:text-primary transition-colors" />
          </button>
        </label>

        <div className="w-full flex-1 overflow-y-auto rounded-lg bg-gray-700 p-4 font-mono whitespace-pre-wrap">
          {output}
        </div>
      </div>
    </div>
  );
};

export default RunView;
