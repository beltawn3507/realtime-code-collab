import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const usesettingstore=create(
    persist(
        (set,get)=>({
            theme:"Dracula",
            language:"javascript",
            fontSize:18,
            fontFamily:"Space Mono",
            setTheme:(theme)=>set({theme}),
            setLanguage:(language)=>set({language}),
            setFontSize:(fontSize)=>set({fontSize}),
            setfontFamily:(fontFamily)=>set({fontFamily}),
            resetsettings:()=>{
                get().setTheme("Dracula");
                get().setLanguage("javascript"),
                get().setFontSize(18),
                get().setfontFamily("Space Mono");
            }
        }),
        {
            name:"setting"
        }
    )
);

export default usesettingstore




