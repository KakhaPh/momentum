import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'fredoka': ['FredokaOne', 'sans-serif'],
                'firago': ['FiraGO', 'sans-serif'],
            },
            colors: {
                whitetext: "#FFFFFF",
                darktext: "#212529",
                purpletext: "#8338EC",
                purplebg: "#DDD2FF",
                yellowbg: "#F7BC30",
                yellowtext: "#FFBE0B",
                orangebg: "#FB5607",
                orangetext: "#FD9A6A",
                pinkbg: "#FF006E",
                pinktext: "#FF66A8",
                redtext: "#FA4D4D",
                bluebg: "#3A86FF",
                bluetext: "#89B6FF",
            },
        },
    },
    plugins: [],
}

export default config;