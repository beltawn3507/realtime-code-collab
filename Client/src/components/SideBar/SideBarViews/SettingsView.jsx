import React, { useEffect } from "react";
import usesettingstore from "../../../store/settingstore";
import { editorFonts } from "../../../resources/font";
import { editorThemes } from "../../../resources/theme";
import { langNames } from "@uiw/codemirror-extensions-langs";

function SettingsView() {
  const fontFamily = usesettingstore((state) => state.fontFamily);
  const fontSize = usesettingstore((state) => state.fontSize);
  const language = usesettingstore((state) => state.language);
  const theme = usesettingstore((state) => state.theme);

  const { setfontFamily, setLanguage, setTheme, setFontSize } = usesettingstore();
  useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        )
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

  return (
    <div className="min-h-screen p-4 bg-gray-900 flex flex-col items-center space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Settings</h1>
      <div className="w-full max-w-3xl flex flex-col space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-300">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => setfontFamily(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {editorFonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-300">Font Size</label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {[...Array(13).keys()].map((size) => (
              <option key={size} value={size + 12}>
                {size + 12}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-300">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {langNames.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-300">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-gray-800 text-gray-100 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {Object.keys(editorThemes).map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
