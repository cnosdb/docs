import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
    {
        text: 'CnosDB',
        link: 'CnosDB',
        children: [
            { text: 'latest', link: '/en/latest/' },
            { text: 'v2.3', link: '/en/v2.3/' },
        ],
    },

    {
        text: 'Cloud',
        link: '/en/cloud/' ,
    },
]);
