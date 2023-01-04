import Hoverable from '@components/Hoverable';
import { Button, Icon, Tab, Tabs } from '@dataesr/react-dsfr';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import turfArea from '@turf/area';
import { LineString, Polygon } from 'geojson';
import { Map } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useServices } from 'src/services';
import { EXPORT_FORMAT } from 'src/types/enum/ExportFormat';
import { Summary } from 'src/types/Summary';
import { Densite } from 'src/types/Summary/Densite';
import { GasSummary } from 'src/types/Summary/Gas';
import {
  CollapseZone,
  Container,
  DrawButton,
  Explanation,
  Export,
  InfoIcon,
  ZoneInfos,
  ZoneInfosWrapper,
} from './SummaryBoxes.style';
import ZoneInfo from './ZoneInfo';

const getConso = (consos: GasSummary[]) => {
  const sum = consos.reduce((acc, current) => acc + current.conso_nb, 0);
  if (sum > 1000) {
    return `${(sum / 1000).toFixed(2)} GWh`;
  }

  return `${sum.toFixed(2)} MWh`;
};

const getDensite = (size: number, densite: GasSummary[]) => {
  if (densite.length === 0) {
    return '0 MWh/m';
  }
  const value =
    densite.reduce((acc, value) => acc + value.conso_nb, 0) / (size * 1000);
  if (value > 1000) {
    return `${(value / 1000).toFixed(2)} GWh/m`;
  }

  return `${value.toFixed(2)} MWh/m`;
};

const SummaryBoxes = ({ map, draw }: { map: Map; draw: MapboxDraw }) => {
  const { heatNetworkService } = useServices();

  const zoneIndex = useRef(0);
  const lineIndex = useRef(0);
  const [tabIndex, setTabIndex] = useState(0);
  const [zoneCollapsed, setZoneCollapsed] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [drawing, setDrawing] = useState('');
  const [size, setSize] = useState<number>();
  const [bounds, setBounds] = useState<number[][]>();
  const [lines, setLines] = useState<number[][]>();
  const [summary, setSummary] = useState<Summary>();
  const [densite, setDensite] = useState<Densite>();

  useEffect(() => {
    setZoneCollapsed(window.innerWidth < 1251);
  }, []);

  useEffect(() => {
    setSummary(undefined);
    if (bounds && size && size < 5) {
      zoneIndex.current += 1;
      const currentZoneIndex = zoneIndex.current;
      heatNetworkService.summary(bounds).then((result) => {
        if (currentZoneIndex === zoneIndex.current) {
          setSummary(result);
        }
      });
    }
  }, [heatNetworkService, bounds, size]);

  useEffect(() => {
    setDensite(undefined);
    if (lines) {
      lineIndex.current += 1;
      const currentLineIndex = lineIndex.current;
      heatNetworkService.densite(lines).then((result) => {
        if (currentLineIndex === lineIndex.current) {
          setDensite(result);
        }
      });
    }
  }, [heatNetworkService, lines]);

  const exportData = async (bounds: number[][]) => {
    if (bounds) {
      setExporting(true);
      await heatNetworkService.downloadSummary(bounds, EXPORT_FORMAT.CSV);
      setExporting(false);
    }
  };

  useEffect(() => {
    if (map && draw) {
      map.on('draw.create', () => {
        const data = draw.getAll();
        if (data.features[0].geometry.type === 'Polygon') {
          const geometry = data.features[0].geometry as Polygon;
          setBounds(geometry.coordinates[0]);
          setSize(turfArea(data) / 1000_000);
        } else if (data.features[0].geometry.type === 'LineString') {
          const geometry = data.features[0].geometry as LineString;
          setLines(geometry.coordinates);
        }
      });

      map.on('draw.update', () => {
        const data = draw.getAll();
        if (data.features[0].geometry.type === 'Polygon') {
          const geometry = data.features[0].geometry as Polygon;
          setBounds(geometry.coordinates[0]);
          setSize(turfArea(data) / 1000_000);
        } else if (data.features[0].geometry.type === 'LineString') {
          const geometry = data.features[0].geometry as LineString;
          setLines(geometry.coordinates);
        }
      });

      map.on('draw.modechange', ({ mode }) => {
        if (mode === 'simple_select') {
          setDrawing('');
        }
      });
    }
  }, [map, draw, setDrawing]);

  return (
    <>
      <CollapseZone
        zoneCollapsed={zoneCollapsed}
        onClick={() => setZoneCollapsed(!zoneCollapsed)}
      >
        <Hoverable position="top-centered">
          {zoneCollapsed ? 'Afficher le panneau' : 'Masquer le panneau'}
        </Hoverable>
        <Icon
          size="2x"
          name={zoneCollapsed ? 'ri-arrow-up-s-fill' : 'ri-arrow-down-s-fill'}
        />
      </CollapseZone>
      {!zoneCollapsed && (
        <>
          <Container customCursor={!!drawing}>
            <ZoneInfosWrapper>
              <Tabs
                onChange={(index) => {
                  setTabIndex(index);
                }}
              >
                {/* 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                @ts-ignore: to fix in react-dsfr */}
                <Tab label="Extraire des données sur les bâtiments">
                  {size && size > 5 ? (
                    <Explanation>
                      <span>
                        La zone définie est trop grande ({size.toFixed(2)} km²),
                        veuillez réduire la taille de recherche (maximum 5
                        km²).Si vous avez besoin de statistiques sur une zone
                        élargie ou plus précise, n'hésitez pas à{' '}
                        <a
                          href="mailto:france-chaleur-urbaine@developpement-durable.gouv.fr"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          nous contacter
                        </a>
                      </span>
                    </Explanation>
                  ) : bounds && !summary ? (
                    <Explanation>
                      <span>
                        Extraction des données correspondant à la zone définie
                        en cours...
                      </span>
                    </Explanation>
                  ) : !summary ? (
                    <Explanation>
                      <span>
                        Pour afficher et exporter des données sur une zone
                        (consommation de gaz, adresse des bâtiments chauffés au
                        gaz ou fioul collectif,...), cliquez sur au moins trois
                        points puis validez cette zone en rejoignant le premier
                        point.
                      </span>
                    </Explanation>
                  ) : (
                    <ZoneInfos>
                      <ZoneInfo
                        color="blue"
                        title="Bâtiments à chauffage collectif fioul"
                        icon="fioul"
                        withBackground
                        values={[
                          {
                            label: 'Total',
                            value: summary.energy.filter(
                              ({ energie_utilisee }) =>
                                energie_utilisee === 'fioul'
                            ).length,
                          },
                          {
                            label: 'Proche réseau (<50 m)',
                            value: summary.energy
                              .filter((energy) => energy.is_close)
                              .filter(
                                ({ energie_utilisee }) =>
                                  energie_utilisee === 'fioul'
                              ).length,
                          },
                        ]}
                      />
                      <ZoneInfo
                        color="blue"
                        title="Bâtiments à chauffage collectif gaz"
                        icon="gaz"
                        withBackground
                        values={[
                          {
                            label: 'Total',
                            value: summary.energy.filter(
                              ({ energie_utilisee }) =>
                                energie_utilisee === 'gaz'
                            ).length,
                          },
                          {
                            label: 'Proche réseau (<50 m)',
                            value: summary.energy
                              .filter((energy) => energy.is_close)
                              .filter(
                                ({ energie_utilisee }) =>
                                  energie_utilisee === 'gaz'
                              ).length,
                          },
                        ]}
                      />
                      <ZoneInfo
                        color="blue"
                        title="Consommations de gaz"
                        values={[
                          {
                            label: 'Total',
                            value: getConso(summary.gas),
                          },
                          {
                            label: 'Proche réseau (<50 m)',
                            value: getConso(
                              summary.gas.filter((gas) => gas.is_close)
                            ),
                          },
                        ]}
                      />
                      <ZoneInfo
                        color="green"
                        alignTop
                        title="Réseaux de chaleur"
                        icon="traces"
                        values={[
                          {
                            label: 'Km',
                            value: (
                              summary.network.reduce(
                                (acc, current) => acc + current.length,
                                0
                              ) / 1000
                            ).toFixed(2),
                          },
                        ]}
                      />
                      <Export>
                        {exporting ? (
                          <Oval height={40} width={40} />
                        ) : (
                          <Button
                            size="sm"
                            icon={'ri-download-2-line'}
                            onClick={() => bounds && exportData(bounds)}
                            disabled={!summary}
                          >
                            Exporter
                          </Button>
                        )}
                      </Export>
                    </ZoneInfos>
                  )}
                </Tab>
                {/* 
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                @ts-ignore: to fix in react-dsfr */}
                <Tab label="Calculer une densité thermique linéaire">
                  {lines && !densite ? (
                    <Explanation>
                      <span>
                        Extraction des données correspondant au tracé défini en
                        cours...
                      </span>
                    </Explanation>
                  ) : !densite ? (
                    <Explanation>
                      <span>
                        Pour calculer une distance et la densité thermique
                        linéaire associée, définissez un tracé en cliquant sur
                        au moins deux points puis validez en cliquant sur
                        entrée.
                      </span>
                    </Explanation>
                  ) : (
                    <ZoneInfos>
                      <ZoneInfo
                        color="green"
                        title="Distance"
                        values={[
                          {
                            label: 'Km',
                            value: densite.size.toFixed(2),
                          },
                        ]}
                      />
                      <ZoneInfo
                        color="blue"
                        alignTop
                        title="Consommations de gaz"
                        values={[
                          {
                            label: 'à 10m',
                            value: getConso(densite.data[10]),
                          },
                          {
                            label: 'à 50m',
                            value: getConso(densite.data[50]),
                          },
                        ]}
                      />
                      <ZoneInfo
                        color="blue"
                        alignTop
                        title={
                          <>
                            Densité thermique linéaire
                            <InfoIcon>
                              <Icon size="lg" name="ri-information-fill" />
                              <Hoverable>
                                Densité thermique calculée sur la base des
                                consommations de gaz à l'adresse situées à une
                                distance de 10 ou 50 m du tracé défini
                              </Hoverable>
                            </InfoIcon>
                          </>
                        }
                        values={[
                          {
                            label: 'à 10m',
                            value: getDensite(densite.size, densite.data[10]),
                          },
                          {
                            label: 'à 50m',
                            value: getDensite(densite.size, densite.data[50]),
                          },
                        ]}
                      />
                    </ZoneInfos>
                  )}
                </Tab>
              </Tabs>
              {((size && size > 5) ||
                (tabIndex === 0 && (!bounds || summary)) ||
                (tabIndex === 1 && (!lines || densite))) && (
                <DrawButton
                  size="sm"
                  icon="ri-edit-2-line"
                  onClick={() => {
                    draw.deleteAll();
                    setBounds(undefined);
                    setLines(undefined);
                    if (tabIndex === 0) {
                      setDrawing('polygon');
                      draw.changeMode('draw_polygon');
                    } else {
                      setDrawing('line');
                      draw.changeMode('draw_line_string');
                    }
                  }}
                >
                  {tabIndex === 0 ? 'Définir une zone' : 'Définir un tracé'}
                </DrawButton>
              )}
            </ZoneInfosWrapper>
          </Container>
        </>
      )}
    </>
  );
};

export default SummaryBoxes;