import React from 'react';

const ConsentBanner: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <>
    <link rel="stylesheet" href="/css/dsfr-theme-tac.min.css" />
    <script src="/js/tarteaucitron.js-1.9.5/tarteaucitron.js"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
            tarteaucitron.init({
                /* General */
                "privacyUrl": "",                /* Privacy policy url . Si vide, le lien Politique de confidencialité du bandeau ne s'affiche pas*/
                "hashtag": "#consentement",      /* La gestionnaire de consentement s'ouvre avec ce hashtag lorsqu'il est placé dans l'url */
                "cookieName": "tarteaucitron",   /* L'identifiant du cookie déposé sur le poste utilisateur */
                "bodyPosition": "top",           /* Position à laquelle le gestionnaire - niveau 2 -  est inséré dans la page (top ou bottom). Pour que les technologies d'assistance puisse y acceder rapidement à la navigation, 'top' est la valeur privilégiée. */
                "adblocker": false,              /* Show a Warning if an adblocker is detected */
                "highPrivacy": true,             /* Retire le consentement implicite (au scroll ou à la navigation) Activé par défaut, donc on peut le retirer de cette config */
                "handleBrowserDNTRequest": false,/* Active ou désactive la prise en compte du Do Not track Navigateur. Si le DNT est activé, aucun cookie n'est déposé */
                "useExternalCss": true,         /* Active ou non une css custom - désactive ou non la css par défaut */

                /* Bandeau d'information cookies (niveau 1)*/
                "orientation": "bottom",/* Position de la bannière de niveau 1 (middle - top - bottom). Si la position est middle, il y a un overlay derrière donc laisser à top ou bottom. */
                "DenyAllCta" : true,    /* Affiche le bouton 'Tout refuser' sur le bandeau de niveau 1 */
                "AcceptAllCta" : true,  /* Affiche le bouton 'Tout accepter' sur le bandeau de niveau 1 */
                "closePopup": false,    /* ajoute une croix de fermeture */

                /* Gestionnaire de cookies (niveau 2) */
                "removeCredit": true, /* Affiche ou non les credit TAC */
                "moreInfoLink": true,/*  Affiche ou non le liens vers les infos*/
                "readmoreLink": "/politique-de-confidentialite",/* Change the default readmore link pointing to tarteaucitron.io */
                "mandatory": true,    /* Message à propos des cookies dits fonctionnels  */

                /* Sticky d'ouverture niveau 2 */
                /* Blocs 'Gestion des cookies' */
                "showAlertSmall": false, /* 'bouton' sticky (en bas a droite) permettant d'ouvrir le gestionnaire de niveau 2*/
                // "showAlertSmall": true, /* 'bouton' sticky (en bas a droite) permettant d'ouvrir le gestionnaire de niveau 2*/
                "cookieslist": false,   /* Ajoute le nombre de services au 'block' sticky */
                /* Icone sticky */
                "showIcon": false,             /* affichage du Bouton sticky (icone citron) pour ouvrir le gestionnaire */
                // "showIcon": true,             /* affichage du Bouton sticky (icone citron) pour ouvrir le gestionnaire */
                "iconPosition": "BottomLeft", /* Position du Bouton sticky BottomRight, BottomLeft, TopRight and TopLeft */
                "groupServices": false
            });
        `,
      }}
    ></script>
    {children}
  </>
);

export default ConsentBanner;
