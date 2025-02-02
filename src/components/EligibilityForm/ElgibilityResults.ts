import { AvailableHeating } from 'src/types/AddressData';
import { HeatNetworksResponse } from 'src/types/HeatNetworksResponse';

// 3 rue du petit bois 78370 Plaisir
const closeCollectif = {
  eligibility: true,
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null,
    city: string
  ) => `
### Bonne nouvelle !

::arrow-item[**Un réseau de chaleur passe à proximité** immédiate de votre adresse ${
    distance ? `(${distance})` : ''
  }.]
${
  inZDP
    ? '::arrow-item[**Vous êtes dans le périmètre de développement prioritaire** du réseau. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]'
    : ''
}
::arrow-item[Avec un chauffage collectif, **votre immeuble dispose déjà des équipements nécessaires :** il s’agit du cas le plus favorable pour un raccordement !]
${
  gestionnaire
    ? `::arrow-item[Le gestionnaire du réseau le plus proche est **${gestionnaire}**.${
        tauxENRR
          ? ` Le taux d’énergies renouvelables et de récupération du réseau est de **${tauxENRR}%**.`
          : ''
      }]`
    : ''
}
${
  city === 'Paris'
    ? '::small[A noter: sur Paris, la puissance souscrite doit être d’au moins 100 kW.]'
    : ''
}
`,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche de chez vous **afin de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
`,
};

// 3 rue du petit bois 78370 Plaisir
const closeIndividual = {
  body: (distance: number) => `
::arrow-item[**Votre immeuble est situé à proximité** immédiate d’un réseau de chaleur ${
    distance ? `(${distance})` : ''
  }.]
::arrow-item[Toutefois au vu de votre chauffage actuel, **le raccordement de votre immeuble nécessiterait des travaux conséquents** et coûteux, avec notamment la création d’un réseau interne de distribution au sein de l’immeuble.]
::arrow-item[**L’amélioration de l’isolation thermique de votre immeuble** constitue un autre levier pour réduire votre facture énergétique et limiter votre impact écologique. Pour être accompagné dans vos projets de rénovation énergétique, rendez-vous sur [**France Rénov’**](https://france-renov.gouv.fr/).]
::arrow-item[Découvrez également d’autres solutions de chauffage **[ici](https://france-renov.gouv.fr/renovation/chauffage)**.]
  `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet de découvrir **instantanément** si un réseau passe près de chez vous
Votre situation n’est pas favorable **pour un raccordement, mais si vous souhaitez tout de même en savoir plus ou faire connaître votre demande**, laissez-nous vos coordonnées pour que nous les transmettions à votre collectivité ou au **gestionnaire du réseau le plus proche.**
  `,
};

// 1 rue du berry 78370 Plaisir
const intermediateCollectif = {
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null,
    city: string
  ) => `
::arrow-item[**Il n’existe pour le moment pas de réseau de chaleur** à proximité immédiate de votre adresse, toutefois, le réseau n’est pas très loin ${
    distance ? `(${distance})` : ''
  }.]
${
  inZDP
    ? '::arrow-item[De plus, **vous êtes dans le périmètre de développement prioritaire** du réseau le plus proche. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]'
    : ''
}
::arrow-item[Avec un chauffage collectif, **votre immeuble dispose déjà des équipements nécessaires** : il s’agit du cas le plus favorable pour un raccordement !]
${
  gestionnaire
    ? `::arrow-item[Le gestionnaire du réseau le plus proche est **${gestionnaire}**.${
        tauxENRR
          ? ` Le taux d’énergies renouvelables et de récupération du réseau est de **${tauxENRR}%**.`
          : ''
      }]`
    : ''
}
${
  city === 'Paris'
    ? '::small[A noter: sur Paris, la puissance souscrite doit être d’au moins 100 kW.]'
    : ''
}
  `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche **afin de vérifier la faisabilité du raccordement et de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
  `,
};

// 1 rue du berry 78370 Plaisir
const farIndividual = {
  body: (distance: number) => `
::arrow-item[**Votre immeuble n'est pas situé à proximité** immédiate d’un réseau de chaleur ${
    distance ? `(${distance})` : ''
  }.]
::arrow-item[Au vu de votre chauffage actuel, **le raccordement de votre immeuble nécessiterait des travaux conséquents** et coûteux, avec notamment la création d’un réseau interne de distribution au sein de l’immeuble.]
::arrow-item[**L’amélioration de l’isolation thermique de votre immeuble** constitue un autre levier pour réduire votre facture énergétique et limiter votre impact écologique. Pour être accompagné dans vos projets de rénovation énergétique, rendez-vous sur [**France Rénov’**](https://france-renov.gouv.fr/).]
::arrow-item[Découvrez également d’autres solutions de chauffage **[ici](https://france-renov.gouv.fr/renovation/chauffage)**.]
    `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet de découvrir **instantanément** si un réseau passe près de chez vous
Votre situation n’est pas favorable **pour un raccordement, mais si vous souhaitez tout de même en savoir plus ou faire connaître votre demande**, laissez-nous vos coordonnées pour que nous les transmettions à votre collectivité ou au **gestionnaire du réseau le plus proche.**
    `,
};

// Limours
const farCollectifOutZdp = {
  body: () => `
::arrow-item[**Il n’existe pour le moment pas de réseau de chaleur** à proximité de votre adresse. Toutefois les réseaux de chaleur se développent !]
::arrow-item[Sans attendre, pour réduire votre facture énergétique et limiter votre impact écologique, **pensez à améliorer l’isolation thermique de votre immeuble**. Pour être accompagné dans vos projets de rénovation énergétique, rendez-vous sur [**France Rénov’**](https://france-renov.gouv.fr/).]
::arrow-item[Découvrez également d’autres solutions de chauffage **[ici](https://france-renov.gouv.fr/renovation/chauffage)**.]
`,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet de découvrir **instantanément** si un réseau passe près de chez vous
**Contribuez au développement des réseaux de chaleur en faisant connaître votre souhait de vous raccorder !** Laissez-nous vos coordonnées pour être tenu informé par le gestionnaire du réseau le plus proche ou par votre collectivité des projets d’extension de réseau ou de création de réseau dans votre quartier.
`,
};

// Rue pablo neruda 76610 Le havre
const closeFuturCollectif = {
  eligibility: true,
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null,
    city: string
  ) => `
### Bonne nouvelle !


::arrow-item[**Un réseau de chaleur passera bientôt à proximité** immédiate de votre adresse ${
    distance ? `(${distance})` : ''
  } (réseau prévu ou en construction).]
${
  inZDP
    ? '::arrow-item[**Vous êtes dans le périmètre de développement prioritaire** du réseau. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]'
    : ''
}
::arrow-item[Avec un chauffage collectif, **votre immeuble dispose déjà des équipements nécessaires :** il s’agit du cas le plus favorable pour un raccordement !]
${
  gestionnaire
    ? `::arrow-item[Le gestionnaire du futur réseau le plus proche est **${gestionnaire}**.${
        tauxENRR
          ? ` Le taux d’énergies renouvelables et de récupération du réseau sera de **${tauxENRR}%**.`
          : ''
      }]`
    : ''
}
${
  city === 'Paris'
    ? '::small[A noter: sur Paris, la puissance souscrite doit être d’au moins 100 kW.]'
    : ''
}
`,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche de chez vous **afin de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
`,
};

// 2 rue hardenberg 92220 Bagneux
const farCollectifInZdp = {
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null
  ) => `
::arrow-item[**Il n’existe pour le moment pas de réseau de chaleur** à proximité de votre adresse.]
::arrow-item[Toutefois, les réseaux de chaleur se développent et **vous êtes dans le périmètre de développement prioritaire du réseau** le plus proche. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]
${
  gestionnaire
    ? `::arrow-item[Le gestionnaire du réseau le plus proche est **${gestionnaire}**.${
        tauxENRR
          ? ` Le taux d’énergies renouvelables et de récupération du réseau est de **${tauxENRR}%**.`
          : ''
      }]`
    : ''
}
  `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche de chez vous **afin d’en savoir plus et de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
`,
};

// rue des hirondelles 76610 le havre
const intermediateFuturCollectif = {
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null,
    city: string
  ) => `
::arrow-item[**Votre immeuble n’est pas à proximité immédiate d’un réseau de chaleur, toutefois un réseau passera prochainement dans les environs** ${
    distance ? `(${distance})` : ''
  } (réseau prévu ou en construction).]
${
  inZDP
    ? '::arrow-item[De plus, vous êtes dans le périmètre de développement prioritaire du réseau le plus proche. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]'
    : ''
}
::arrow-item[Avec un chauffage collectif, **votre immeuble dispose déjà des équipements nécessaires** : il s’agit du cas le plus favorable pour un raccordement !]
${
  gestionnaire
    ? `::arrow-item[Le gestionnaire du futur réseau le plus proche est **${gestionnaire}**.${
        tauxENRR
          ? ` Le taux d’énergies renouvelables et de récupération du réseau sera de **${tauxENRR}%**.`
          : ''
      }]`
    : ''
}
${
  city === 'Paris'
    ? '::small[A noter: sur Paris, la puissance souscrite doit être d’au moins 100 kW.]'
    : ''
}
  `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche **afin de vérifier la faisabilité du raccordement et de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
  `,
};

// Metz
const irisCollectif = {
  eligibility: true,
  body: (
    distance: number,
    inZDP: boolean,
    gestionnaire: string | null,
    tauxENRR: number | null,
    city: string
  ) => `
### Bonne nouvelle !


::arrow-item[**Un réseau de chaleur passe à proximité** de votre adresse (tracé non encore disponible sur France Chaleur Urbaine).]
${
  inZDP
    ? '::arrow-item[**Vous êtes dans le périmètre de développement prioritaire** du réseau. Une obligation de raccordement peut s’appliquer (<a href="/ressources/prioritaire#contenu" target="_blank">en savoir plus</a>).]'
    : ''
}
::arrow-item[Avec un chauffage collectif, **votre immeuble dispose déjà des équipements nécessaires :** il s’agit du cas le plus favorable pour un raccordement !]
${
  city === 'Paris'
    ? '::small[A noter: sur Paris, la puissance souscrite doit être d’au moins 100 kW.]'
    : ''
}
`,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet d’être **mis en relation avec le gestionnaire** du réseau le plus proche de chez vous **afin de bénéficier d’une première estimation tarifaire gratuite et sans engagement.**
**Il vous suffit pour cela de déposer vos coordonnées ci-dessous.**
`,
};

// rue des hirondelles 76610 le havre
const closeFuturIndividual = {
  body: (distance: number) => `
::arrow-item[**Votre immeuble est situé à proximité** immédiate d’un réseau de chaleur en projet ou en construction ${
    distance ? `(${distance})` : ''
  }.]
::arrow-item[Toutefois au vu de votre chauffage actuel, **le raccordement de votre immeuble nécessiterait des travaux conséquents** et coûteux, avec notamment la création d’un réseau interne de distribution au sein de l’immeuble.]
::arrow-item[**L’amélioration de l’isolation thermique de votre immeuble** constitue un autre levier pour réduire votre facture énergétique et limiter votre impact écologique. Pour être accompagné dans vos projets de rénovation énergétique, rendez-vous sur [**France Rénov’**](https://france-renov.gouv.fr/).]
::arrow-item[Découvrez également d’autres solutions de chauffage **[ici](https://france-renov.gouv.fr/renovation/chauffage)**.]
  `,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet de découvrir **instantanément** si un réseau passe près de chez vous
Votre situation n’est pas favorable **pour un raccordement, mais si vous souhaitez tout de même en savoir plus ou faire connaître votre demande**, laissez-nous vos coordonnées pour que nous les transmettions à votre collectivité ou au **gestionnaire du réseau le plus proche.**
  `,
};

// Metz
const irisIndividual = {
  body: () => `
::arrow-item[**Votre immeuble est situé à proximité** d’un réseau de chaleur (tracé non encore disponible sur France Chaleur Urbaine).]
::arrow-item[Toutefois au vu de votre chauffage actuel, **le raccordement de votre immeuble nécessiterait des travaux conséquents** et coûteux, avec notamment la création d’un réseau interne de distribution au sein de l’immeuble.]
::arrow-item[**L’amélioration de l’isolation thermique de votre immeuble** constitue un autre levier pour réduire votre facture énergétique et limiter votre impact écologique. Pour être accompagné dans vos projets de rénovation énergétique, rendez-vous sur [**France Rénov’**](https://france-renov.gouv.fr/).]
::arrow-item[Découvrez également d’autres solutions de chauffage **[ici](https://france-renov.gouv.fr/renovation/chauffage)**.]
`,
  text: `
**France Chaleur Urbaine** est un service gratuit du Ministère de la transition énergétique qui vous permet de découvrir **instantanément** si un réseau passe près de chez vous
Votre situation n’est pas favorable **pour un raccordement, mais si vous souhaitez tout de même en savoir plus ou faire connaître votre demande**, laissez-nous vos coordonnées pour que nous les transmettions à votre collectivité ou au **gestionnaire du réseau le plus proche.**
`,
};

export const getEligibilityResult = (
  heatingType: AvailableHeating,
  eligibility?: HeatNetworksResponse
) => {
  if (eligibility && heatingType) {
    const futurNetwork = eligibility.futurNetwork;
    if (eligibility.isEligible) {
      if (eligibility.isBasedOnIris) {
        return heatingType === 'collectif' ? irisCollectif : irisIndividual;
      }
      if (
        eligibility.distance !== null &&
        eligibility.veryEligibleDistance !== null
      ) {
        if (eligibility.distance <= eligibility.veryEligibleDistance) {
          if (heatingType === 'collectif') {
            return futurNetwork ? closeFuturCollectif : closeCollectif;
          }
          return futurNetwork ? closeFuturIndividual : closeIndividual;
        }
        if (heatingType === 'collectif') {
          return futurNetwork
            ? intermediateFuturCollectif
            : intermediateCollectif;
        }
        return farIndividual;
      }
      if (eligibility.distance === null && futurNetwork) {
        return heatingType === 'collectif'
          ? closeFuturCollectif
          : closeFuturIndividual;
      }
    }

    return heatingType === 'collectif'
      ? eligibility.inZDP
        ? farCollectifInZdp
        : farCollectifOutZdp
      : farIndividual;
  }

  return {};
};

export const bordeauxMetropoleCityCodes = [
  '33003',
  '33004',
  '33013',
  '33032',
  '33039',
  '33056',
  '33063',
  '33065',
  '33069',
  '33075',
  '33096',
  '33119',
  '33162',
  '33167',
  '33192',
  '33200',
  '33249',
  '33273',
  '33281',
  '33312',
  '33318',
  '33376',
  '33434',
  '33449',
  '33487',
  '33519',
  '33522',
  '33550',
];
