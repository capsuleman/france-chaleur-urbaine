import { ReactNode } from 'react';
import Actors from './Contents/Actors';
import Advantages from './Contents/Advantages';
import Bill from './Contents/Bill';
import ClassedNetwork from './Contents/ClassedNetwork';
import ColdNetwork from './Contents/ColdNetwork';
import Feasability from './Contents/Feasability';
import Fundings from './Contents/Fundings';
import GreenEnergies from './Contents/GreenEnergies';
import Helps from './Contents/Helps';
import History from './Contents/History';
import Livraisons from './Contents/Livraisons';
import Network from './Contents/Network';
import Priority from './Contents/Priority';
import Role from './Contents/Role';
import State from './Contents/State';
import Strengths from './Contents/Strengths';
import Supports from './Contents/Supports';

export type Document = {
  title: string;
  altTitle?: string;
  description: ReactNode;
  content: ReactNode;
};

// Don't forget to update next-sitemap.config on updating key here

export const supports = {
  title: 'Nos supports de communication',
  description:
    'Retrouvez ici tous nos supports de communication, à partager autour de vous !',
  content: <Supports />,
};

export const issues: Record<string, Document> = {
  reseau: {
    title: 'Qu’est-ce qu’un réseau de chaleur ?',
    description: (
      <>
        Un réseau de chaleur est un{' '}
        <b>
          système de canalisations qui permettent d’acheminer vers un ensemble
          de bâtiments de la chaleur produite localement, à partir d’énergies
          renouvelables et de récupération.
        </b>
      </>
    ),
    content: <Network />,
  },
  'energies-vertes': {
    title: 'Les réseaux de chaleur : des énergies vertes',
    altTitle: 'Quelles énergies alimentent les réseaux de chaleur ?',
    description: (
      <>
        Les réseaux de chaleur français sont alimentés en moyenne à{' '}
        <b>62 % par des énergies renouvelables et de récupération locales.</b>
      </>
    ),
    content: <GreenEnergies />,
  },
  atouts: {
    title: 'Un mode de chauffage aux multiples atouts',
    description: (
      <>
        Se chauffer par un réseau de chaleur, c’est adopter un{' '}
        <b>mode de chauffage fiable</b> qui présente des bénéfices à la fois
        environnementaux, sanitaires, économiques et sociaux...
      </>
    ),
    content: <Strengths />,
  },
  livraisons: {
    title:
      'Que représentent les livraisons de chaleur par les réseaux en France ?',
    description: (
      <>
        Au niveau européen, la France ne se place qu’en 20ème position en termes
        de recours aux réseaux de chaleur,{' '}
        <b>avec environ 5 % des besoins en chaleur du pays couverts</b> par les
        réseaux.
      </>
    ),
    content: <Livraisons />,
  },
  histoire: {
    title:
      'Quand et comment le chauffage urbain s’est-il développé en France ?',
    description:
      'Les premiers réseaux de chaleur français ont vu le jour au début du 20ème siècle, où ils apparaissent  comme un moyen de lutter contre les nuisances du chauffage au charbon et au bois individuel (approvisionnement, pollution, incendies...).',
    content: <History />,
  },
  role: {
    title: 'Un rôle clé dans la transition énergétique',
    altTitle:
      'Quel est le rôle du chauffage urbain dans la transition énergétique ?',
    description: (
      <>
        Les bâtiments (résidentiels et tertiaires) sont responsables de près de
        la moitié des consommations d’énergie en France, et{' '}
        <b>de 15 % des émissions de gaz à effet de serre</b>, principalement
        dues au chauffage des bâtiments. Les réseaux de chaleur constituent un
        levier efficace pour réduire ces émissions.
      </>
    ),
    content: <Role />,
  },
};

export const understandings: Record<string, Document> = {
  faisabilite: {
    title: 'Qu’est-ce qui détermine la faisabilité du raccordement ?',
    description:
      'La faisabilité d’un raccordement dépend de certains critères techniques préalables.',
    content: <Feasability />,
  },
  avantages: {
    title:
      'Quels avantages par rapport à un chauffage collectif au gaz ou fioul ?',
    description: (
      <>
        Se raccorder à un réseau de chaleur, c’est <b>64 %</b> de réduction des
        émissions de gaz à effet de serre par rapport à un chauffage au fioul et{' '}
        <b>51 %</b> par rapport à un chauffage au gaz. Et ce n'est pas le seul
        avantage !
      </>
    ),
    content: <Advantages />,
  },
  aides: {
    title:
      'Le coup de pouce chauffage des bâtiments résidentiels collectifs et tertiaires : une aide financière conséquente pour se raccorder',
    altTitle: 'Quelles aides financières pour se raccorder ?',
    description: (
      <>
        Depuis le 1er septembre 2022, le coup de pouce{' '}
        <b>« Chauffage des bâtiments résidentiels collectifs et tertiaires »</b>{' '}
        permet de réduire significativement le coût du raccordement à un réseau
        de chaleur.
      </>
    ),
    content: <Helps />,
  },
  financement: {
    title:
      'Financer le raccordement de sa copropriété dans le cadre d’une rénovation globale',
    description:
      'Lorsque le raccordement au réseau de chaleur s’intègre dans des travaux de rénovation globale, des aides complémentaires au "Coup de pouce chauffage des bâtiments résidentiels collectifs et tertiaires" sont mobilisables.',
    content: <Fundings />,
  },
  facture: {
    title: 'Comprendre la facture de chauffage de ma copropriété',
    description: (
      <>
        En raccordant mon immeuble à un réseau de chaleur, je bénéficie d’une{' '}
        <b>facture plus stable qu’avec un autre mode de chauffage.</b>
      </>
    ),
    content: <Bill />,
  },
  'reseau-classe': {
    title: 'Qu’est-ce qu’un réseau classé ?',
    description:
      'Le classement d’un réseau instaure une obligation de raccordement pour certains bâtiments, dans une zone autour du réseau qualifiée de périmètre de développement prioritaire.',
    content: <ClassedNetwork />,
  },
  prioritaire: {
    title:
      'Mon bâtiment est situé dans le périmètre de développement prioritaire',
    description: (
      <>
        Quels bâtiments sont concernés par <b>l’obligation de raccordement ?</b>
      </>
    ),
    content: <Priority />,
  },
};

export const growths: Record<string, Document> = {
  acteurs: {
    title: 'Quels sont les principaux acteurs de la filière ?',
    description: (
      <>
        Les réseaux de chaleur sont majoritairement établis à l’initiative de{' '}
        <b>collectivités territoriales</b>, mais leur gestion est le plus
        souvent concédée à des <b>opérateurs</b>, via des délégations de service
        public.
      </>
    ),
    content: <Actors />,
  },
  etat: {
    title: 'L’État investit dans les réseaux de chaleur',
    altTitle:
      "Par quels dispositifs financiers l'État soutient-il les réseaux de chaleur ?",
    description:
      'Plusieurs dispositifs financiers sont mis en place par l’État pour accompagner le développement des réseaux de chaleur.',
    content: <State />,
  },
};

export const coldNetworks: Record<string, Document> = {
  'reseau-de-froid': {
    title: 'Découvrir les réseaux de froid',
    description:
      'Un réseau de froid est constitué de canalisations souterraines qui permettent d’acheminer du froid vers un ensemble de bâtiments, avec une efficacité énergétique supérieure aux systèmes individuels ou collectifs centraux habituels. Les réseaux de froid sont majoritairement utilisés pour la climatisation des bâtiments tertiaires.',
    content: <ColdNetwork />,
  },
};
