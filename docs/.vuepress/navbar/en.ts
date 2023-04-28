import { navbar } from 'vuepress-theme-hope';

export const enNavbar = navbar([
    {
        text: 'Version',
        link: 'Version' ,
        children: [
            { text: 'latest', link: '/en/latest/' },
            { text: 'v2.3', link: '/en/v2.3/' },
        ],
    },
]);
