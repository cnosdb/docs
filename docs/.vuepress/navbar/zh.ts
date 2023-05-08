import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {
        text: 'CnosDB',
        link: 'CnosDB' ,
        children: [
            { text: 'latest', link: '/zh/latest/' },
            { text: 'v2.3', link: '/zh/v2.3/' },
        ]
    },
]);
