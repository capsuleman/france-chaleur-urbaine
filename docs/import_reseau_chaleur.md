# Mettre à jour les réseaux de chaleur
<br/>

## Première étape - en local

1. Mise à jour de la table *reseaux_de_chaleur*
    - Supprimer la table *reseaux_de_chaleur*
        - Uniquement si des colonnes ont été ajoutées ou modifiées
    - Lancer : `psql postgres://localhost:5432 -U postgres -f reseaux_de_chaleur.sql`
        - Le mot de passe est dans docker-compose.yml

2. Mise à jour de la table *reseaux_de_chaleur_tiles*
    - Vider la table (mais ne pas la supprimer)
    - Lancer le script fillTiles.ts : `export NODE_PATH=./ && ts-node --transpile-only scripts/fillTiles.ts network 0 17`
<br/><br/>

## Deuxième étape - en dev 

1. Se connecter sur Scalingo : `scalingo --region osc-fr1 --app france-chaleur-urbaine-dev db-tunnel SCALINGO_POSTGRESQL_URL`
    - Le mot de passe est dans Scalingo
    - On peut maintenant accéder à la base de dev sur 127.0.0.1:10000

2. Sur la base en local 
    - Exporter les tables *reseaux_de_chaleur* et *reseaux_de_chaleur_tiles*

3. **!!! Vérifier qu'il n'y a pas de process en cours sur Scalingo avant de continuer**
    - https://dashboard.scalingo.com/apps/osc-fr1/france-chaleur-urbaine-dev/logs

4. Sur la base de dev - mise à jour de la table *reseaux_de_chaleur*
    - Supprimer la table
        - Uniquement si des colonnes ont été ajoutées ou modifiées
    - Éventuellement créer à nouveau la table avec le schéma de celle en local
    - Importer les données avec l'export du local

5. Sur la base de dev - mise à jour de la table *reseaux_de_chaleur_tiles*
    - Vider la table sans la supprimer
    - Importer les données avec l'export du local

6. Tester
    - france-chaleur-urbaine-dev.osc-fr1.scalingo.io
    - Vérifier les adresses que Sebastien nous envoie à vérifier
<br/><br/>

## Dernière étape - mise en prod 

1. Se connecter sur Scalingo : `scalingo --region osc-fr1 --app france-chaleur-urbaine db-tunnel SCALINGO_POSTGRESQL_URL`
    - Le mot de passe est dans Scalingo
    - On peut maintenant accéder à la base de prod sur 127.0.0.1:10000

2. **!!! Vérifier qu'il n'y a pas de process en cours sur Scalingo avant de continuer**
    - https://dashboard.scalingo.com/apps/osc-fr1/france-chaleur-urbaine/logs

3. Sur la base de prod - mise à jour de la table *reseaux_de_chaleur*
    - Supprimer la table
        - Uniquement si des colonnes ont été ajoutées ou modifiées
    - Éventuellement créer à nouveau la table avec le schéma de celle en local
    - Importer les données avec l'export du local

4. Sur la base de prod - mise à jour de la table *reseaux_de_chaleur_tiles*
    - Vider la table sans la supprimer
    - Importer les données avec l'export du local

5. Tester
    - Vérifier les adresses que Sebastien nous envoie à vérifier