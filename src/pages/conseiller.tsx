import HeadSliceForm from '@components/HeadSliceForm';
import MarkdownWrapper from '@components/MarkdownWrapper';
import Simulator from '@components/Ressources/Contents/Simulator';
import MainContainer from '@components/shared/layout';
import { GlobalStyle } from '@components/shared/layout/Global.style';
import SimulateurCO2 from '@components/SimulatorCO2';
import Slice from '@components/Slice';
import WrappedText from '@components/WrappedText';
import Head from 'next/head';

const currentPage = 'conseiller';

const Conseiller = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Un réseau de chaleur est un système de distribution de chaleur produite de façon centralisée qui permet de desservir un grand nombre d’usagers (bâtiments tertiaires publics ou privés, copropriétés, logements sociaux,...). Un des atouts majeurs des réseaux de chaleur est de permettre de mobiliser les énergies renouvelables présentes sur le territoire, difficilement distribuables autrement."
        />
        <title>
          France Chaleur Urbaine : Une solution numérique qui facilite le
          raccordement à un chauffage économique et écologique
        </title>
      </Head>

      <MainContainer currentMenu={`/${currentPage}`}>
        <div>
          <GlobalStyle />

          <HeadSliceForm
            bg="/img/head-slice-bg-professionnels.svg"
            pageBody={`
Bailleurs sociaux, bureaux d’étude, syndics, conseillers France Renov...
# Avec le chauffage urbain, faites un choix d’avenir, écologique et économique`}
            formLabel="Le bâtiment pourrait-il être raccordé à un réseau de chaleur&nbsp;?"
            checkEligibility
            needGradient
            alwaysDisplayBulkForm
            withBulkEligibility
          />
          <Slice
            theme="white"
            padding={8}
            header={`## Estimer les émissions de CO2 évitées par le raccordement d’un bâtiment à un réseau de chaleur*`}
          >
            <SimulateurCO2 />
          </Slice>
          <Simulator withRedirection />
          <Slice
            padding={8}
            header={`
## La cartographie France Chaleur Urbaine

*Un outil incontournable au service de l’accélération des raccordements*
`}
          >
            <WrappedText
              textClassName="slice-carto-text"
              body={`
Visualisez sur une même carte :

::check-item[Les tracés des réseaux de chaleur actuel]
::check-item[Les bâtiments et leur mode de chauffage]
::check-item[La liste des adresses que vous avez testées]

:button-link[Voir la cartographie]{href="./carte"}
`}
              imgSrc="/img/rcu-carto.jpg"
              reverse
            />
          </Slice>
          <Slice
            id="iframe"
            padding={8}
            theme="grey"
            header={`## L’iframe France Chaleur Urbaine
            
*Offrez aux visiteurs de votre site la possibilité de vérifier immédiatement s'ils sont raccordables à un réseau de chaleur*`}
            direction="row"
          >
            <WrappedText
              textClassName="slice-carto-text"
              body={`
Nous mettons à votre disposition un iframe que vous pouvez librement reprendre pour votre site internet.
*Le champ de recherche ci-contre sera ainsi directement intégré sur votre site, permettant à vos visiteurs de vérifier s’ils sont potentiellement raccordables.*

Pour cela, il vous suffit de copier les lignes de code ci-dessous :

*\\<iframe width="900px" height="235px" title="France chaleur urbaine - Éligibilité" src="https://france-chaleur-urbaine.beta.gouv.fr/form"/>*
`}
              imgSrc="/img/iframe.svg"
              reverse
            />
          </Slice>

          <Slice theme="white" padding={8}>
            <Slice header={`## Comment se passe un raccordement&nbsp;?`} />
            <WrappedText
              center
              body={`
*Le 100 rue du Paradis est un immeuble chauffé par une chaudière collective au gaz ayant 20 ans.*

Un conseiller en rénovation ou le gestionnaire de l’immeuble cherche un chauffage *plus performant et responsable* et vérifie sur *France Chaleur Urbaine* si le bâtiment est raccordable. 

*Un réseau de chaleur passe à 15 mètres !*

Le conseiller en rénovation ou le gestionnaire de l’immeuble demande via France Chaleur Urbaine à être *mis en relation avec le gestionnaire du réseau de chaleur*, qui le recontacte pour l’informer sur les conditions de raccordement.
`}
              imgSrc="/img/user-experience-simple-1.svg"
              reverse
            />
            <WrappedText
              center
              body={`
*Les frais de raccordement s’élèvent à 105 000 €.*
*Le “Coup de pouce chauffage des bâtiments résidentiels collectifs et tertiaires” permet de réduire ce coût à 50 000 €, soit 400 € par lot.*

Les travaux durent 2 mois en tout, sans nuisance !

Depuis, l’immeuble bénéficie d’une bonne température de chauffe, d’une distribution d'eau chaude sans aucune panne, avec un budget maîtrisé sans plus se soucier de l’entretien d’une chaudière.

*Une démarche écologique et économique.*
`}
              imgSrc="/img/user-experience-simple-2.svg"
            />
            <Slice>
              <MarkdownWrapper
                value={`:button-link[Télécharger notre guide]{href="./guide-france-chaleur-urbaine" tagName="downloadLink" trackEvent="Guide FCU, ${currentPage}" target="_blank"}`}
                className="fcuSolutionForFuturFooter"
              />
            </Slice>
          </Slice>
        </div>
      </MainContainer>
    </>
  );
};

export default Conseiller;
