// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.js'],
//             refresh: true,
//         }),
//         tailwindcss(),
//     ],
// });

// import { defineConfig } from "vite";
// import laravel from "laravel-vite-plugin";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//     server: {
//         host: "127.0.0.1",
//         proxy: {
//             "/api": "http://127.0.0.1:8000",
//         },
//     },
//     plugins: [
//         laravel({
//             input: [
//                 "resources/css/app.css",
//                 "resources/js/app.jsx", // <- for React
//             ],
//             refresh: true,
//         }),
//         react(),
//     ],
// });

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        host: "127.0.0.1",
        proxy: {
            "/api": "http://127.0.0.1:8000",
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/js/app.jsx", // <- for React
            ],
            refresh: true,
        }),
        react(),
    ],
});
