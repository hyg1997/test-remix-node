import type { Config } from "tailwindcss";

export default {
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {},
   },
   plugins: [],
} satisfies Config;
