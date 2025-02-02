import {
  themeDefBuildings,
  themeDefDemands,
  themeDefEnergy,
  themeDefHeatNetwork,
  themeDefTypeGas,
  themeDefZoneDP,
} from 'src/services/Map/businessRules';
import param from 'src/services/Map/param';
import { ENERGY_TYPE, ENERGY_USED } from 'src/types/enum/EnergyType';
import styled, { createGlobalStyle, css } from 'styled-components';
import {
  LegendDeskData,
  maxIconSize,
  minIconSize,
} from './components/LegendDesc';

const { minZoomData } = param;

export const mapControlZindex = 110;

export const mapMediumMedia = '@media (max-width: 1250px) ';

export const MapStyle: any = createGlobalStyle<{
  legendCollapsed: boolean;
  drawing: boolean;
  withTopLegend: boolean;
  withProMode: boolean;
  withHideLegendSwitch: boolean;
}>` // TODO: Wait Fix from @types/styled-component : https://github.com/styled-components/styled-components/issues/3738
    .map-wrap {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
    }

    .map, .maplibregl-map {
      position: absolute !important;
      left: ${({ legendCollapsed }) => (legendCollapsed ? '0px' : '333px')};
      ${({ withTopLegend }) => withTopLegend && 'top: 41px;'}
      width: ${({ legendCollapsed }) =>
        legendCollapsed ? '100%' : 'calc(100% - 333px) !important'};
      height: ${({ withTopLegend }) =>
        withTopLegend ? 'calc(100% - 41px) !important' : '100%'};
      ${({ withProMode, withHideLegendSwitch, legendCollapsed }) =>
        withProMode &&
        withHideLegendSwitch &&
        (legendCollapsed
          ? `@media (max-width: 600px) {
              top: 65px;
              height: calc(100% - 65px) !important;
            }`
          : `@media (max-width: 600px) {
              top: 41px;
              height: calc(100% - 41px) !important;
            }`)}

      ${({ drawing }) =>
        drawing &&
        `
      .maplibregl-canvas {
        cursor: crosshair;
      }`}
    }

    .popup-map-layer {
      z-index: ${mapControlZindex + 1};
      font-size: 14px;
      max-width: 300px !important;

      &.maplibregl-popup-anchor-left  .maplibregl-popup-tip {
        border-right-color: #4550e5;
      }
      &.maplibregl-popup-anchor-right  .maplibregl-popup-tip {
        border-left-color: #4550e5;
      }
      &.maplibregl-popup-anchor-top  .maplibregl-popup-tip {
        border-bottom-color: #4550e5;
      }
      &.maplibregl-popup-anchor-bottom  .maplibregl-popup-tip {
        border-top-color: #4550e5;
      }

      .maplibregl-popup-content{
        border: 2px solid #4550e5;
        border-radius: 0.3em;
        overflow: hidden;

        header {
          padding: 8px;
          margin: -15px -10px 10px;
          background-color: #4550e5;

          h6 {
            color: #fff;
            font-size: 15px;
            font-weight: bold;
            margin: 0;
          }
        }

        .maplibregl-popup-close-button {
          font-size: 1.5em;
          line-height: 0;
          font-weight: bold;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.25em;
          height: 1.25em;
          padding: 0 0 2px;
          margin: 3px;
          border-radius: 1em;
          transition-property: color, background-color;
          transition-duration: 0.25s;
          transition-timing-function: ease;

          &:hover {
            color: #4550e5;
            background-color: #fff;
          }
        }
      }
    }
`;

// --------------------------
// --- Tooling components ---
// --------------------------

export const MapControlWrapper = styled.div<{ legendCollapsed: boolean }>`
  position: absolute;
  z-index: ${mapControlZindex};

  max-width: calc(100vw - 333px - 40px);
  width: 1100px;
  padding: 32px;
  bottom: 0;
  left: ${({ legendCollapsed }) =>
    legendCollapsed ? '50vw' : 'calc((100vw - 333px)/2 + 333px)'};
  transform: translateX(-50%);

  ${mapMediumMedia} {
    left: 50vw;
    max-width: 100%;
  }
`;

export const Legend = styled.div<{
  legendCollapsed: boolean;
  withoutLogo?: boolean;
  withHideLegendSwitch?: boolean;
}>`
  z-index: ${mapControlZindex + 2};
  overflow: auto;
  ${({ withoutLogo }) => !withoutLogo && 'margin-bottom: 99px;'}
  ${({ legendCollapsed }) =>
    legendCollapsed &&
    css`
      display: none;
    `}
  width: 333px;
  min-width: 333px;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #dddddd;
  box-shadow:
    0px 16px 16px -16px rgba(0, 0, 0, 0.32),
    0px 8px 16px rgba(0, 0, 0, 0.1);
  ${({ withHideLegendSwitch, legendCollapsed }) =>
    withHideLegendSwitch &&
    !legendCollapsed &&
    css`
      top: 41px;
      position: absolute;
      height: 100%;
    `}
  }
`;

export const LegendSeparator = styled.div`
  width: 100%;
  border: 1px solid #e1e1e1;
  margin: 16px 0;
`;

export const CollapseLegend = styled.button<{ legendCollapsed: boolean }>`
  position: absolute;
  padding: 0 0 0 22px;
  z-index: ${mapControlZindex + 1};
  left: ${({ legendCollapsed }) => (legendCollapsed ? '-23px' : '310px')};
  top: 50%;
  border-radius: 10px;
  background-color: white;
  border: solid 1px #dddddd;
  height: 60px;
  width: 51px;
  overflow: visible;
  // ugly hack => hover create issue in mobile
  @media (min-width: 520px) {
    &:hover {
      & > .hover-info {
        display: block;
      }
    }
  }
`;

// --------------------
// --- Heat Network ---
// --------------------

export const outlineCenterLayerStyle = {
  type: 'circle',
  paint: {
    'circle-stroke-color': [
      'case',
      ['boolean', ['get', 'reseaux classes']],
      themeDefHeatNetwork.classed.color,
      themeDefHeatNetwork.outline.color,
    ],
    'circle-stroke-width': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      2,
      8,
      2,
      9,
      3,
      15,
      4,
    ],
    'circle-color': '#fff',
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      5,
      0,
      8,
      0,
      9,
      4,
      15,
      10,
    ],
  },
};

export const outlineLayerStyle = {
  type: 'line',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': [
      'case',
      ['boolean', ['get', 'reseaux classes']],
      themeDefHeatNetwork.classed.color,
      themeDefHeatNetwork.outline.color,
    ],
    'line-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      3,
      2,
    ],
    'line-opacity': ['interpolate', ['linear'], ['zoom'], 11, 0.75, 15, 1],
  },
};

export const coldOutlineLayerStyle = {
  ...outlineLayerStyle,
  paint: {
    ...outlineLayerStyle.paint,
    'line-color': themeDefHeatNetwork.cold.color,
  },
};

export const futurOutlineLayerStyle = {
  ...outlineLayerStyle,
  paint: {
    ...outlineLayerStyle.paint,
    'line-color': themeDefHeatNetwork.futur.color,
  },
};

export const futurZoneLayerStyle = {
  type: 'fill',
  paint: {
    'fill-color': themeDefHeatNetwork.futur.color,
    'fill-opacity': 0.47,
  },
};

// --------------
// --- Energy ---
// --------------

const NB_LOT = 'nb_logements';
const TYPE_ENERGY = 'energie_utilisee';
export const typeEnergy: Record<ENERGY_USED, ENERGY_TYPE> = {
  [ENERGY_USED.Fioul]: ENERGY_TYPE.Fuel,
  [ENERGY_USED.FioulDomestique]: ENERGY_TYPE.Fuel,
  [ENERGY_USED.Gaz]: ENERGY_TYPE.Gas,
  [ENERGY_USED.GazNaturel]: ENERGY_TYPE.Gas,
  [ENERGY_USED.GazCollectif]: ENERGY_TYPE.Gas,
  [ENERGY_USED.GazPropaneButane]: ENERGY_TYPE.Gas,
  [ENERGY_USED.Charbon]: ENERGY_TYPE.Wood,
  [ENERGY_USED.BoisDeChauffage]: ENERGY_TYPE.Wood,
  [ENERGY_USED.Electricite]: ENERGY_TYPE.Electric,
  [ENERGY_USED.EnergieAutre]: ENERGY_TYPE.Unknown,
  [ENERGY_USED.SansObjet]: ENERGY_TYPE.Unknown,
  [ENERGY_USED.Default]: ENERGY_TYPE.Unknown,
};
export const objTypeEnergy = Object.entries(typeEnergy).reduce(
  (acc: any, [key, value]: [string, string]) => {
    return {
      ...acc,
      [value]: [...(acc[value] || []), key],
    };
  },
  {}
);
const arrColorFromDefEnergy = [
  ...Object.entries(themeDefEnergy).flatMap(
    ([energyName, styleObject]: [string, any]) => [
      objTypeEnergy[energyName],
      styleObject.color,
    ]
  ),
  themeDefEnergy.unknow.color,
];

const iconSize = 31;
const maxDisplaySize = 29;
const iconRatio = 1 / (iconSize / maxDisplaySize);
const getSymbolRatio: (size: number) => number = (size) =>
  iconRatio * (size / maxDisplaySize);
export const energyLayerStyle = {
  type: 'symbol',
  layout: {
    'icon-image': 'energy-picto',
    'icon-overlap': 'always',
    'symbol-sort-key': ['-', ['coalesce', ['get', NB_LOT], 0]],
    'icon-size': [
      'case',
      ['<', ['get', NB_LOT], LegendDeskData.energy.min],
      getSymbolRatio(minIconSize),
      ['<', ['get', NB_LOT], LegendDeskData.energy.max],
      [
        'interpolate',
        ['linear'],
        ['get', NB_LOT],
        LegendDeskData.energy.min,
        getSymbolRatio(minIconSize),
        LegendDeskData.energy.max,
        getSymbolRatio(maxIconSize),
      ],
      getSymbolRatio(maxIconSize),
    ],
  },
  paint: {
    'icon-color': ['match', ['get', TYPE_ENERGY], ...arrColorFromDefEnergy],
    'icon-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      minZoomData + 0.2,
      0,
      minZoomData + 0.5 + 1,
      0.65,
    ],
  },
};

// -----------------
// --- Gas Usage ---
// -----------------
const CONSO = 'conso_nb';
const TYPE_GAS = 'code_grand';
const arrColorFromDefTypeGas = [
  ...Object.entries(themeDefTypeGas).flatMap(
    ([TypeGasName, styleObject]: [string, any]) => [
      TypeGasName,
      styleObject.color,
    ]
  ),
  themeDefTypeGas.unknow.color,
];

export const gasUsageLayerStyle = {
  type: 'circle',
  layout: {
    'circle-sort-key': ['-', ['coalesce', ['get', CONSO], 0]],
  },
  paint: {
    'circle-color': ['match', ['get', TYPE_GAS], ...arrColorFromDefTypeGas],
    'circle-radius': [
      'case',
      ['<', ['get', CONSO], LegendDeskData.gasUsage.min],
      minIconSize / 2,
      ['<', ['get', CONSO], LegendDeskData.gasUsage.max],
      [
        'interpolate',
        ['linear'],
        ['get', CONSO],
        LegendDeskData.gasUsage.min,
        minIconSize / 2,
        LegendDeskData.gasUsage.max,
        maxIconSize / 2,
      ],
      maxIconSize / 2,
    ],
    'circle-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      minZoomData + 0.2,
      0,
      minZoomData + 0.2 + 1,
      0.55,
    ],
    'circle-stroke-opacity': 0,
  },
};

export const demandsLayerStyle = {
  type: 'circle',
  paint: {
    'circle-color': themeDefDemands.fill.color,
    'circle-stroke-color': themeDefDemands.stroke.color,
    'circle-radius': themeDefDemands.fill.size,
    'circle-stroke-width': themeDefDemands.stroke.size,
  },
};

export const raccordementsLayerStyle = {
  type: 'symbol',
  layout: {
    'icon-image': 'energy-picto',
    'icon-overlap': 'always',
    'icon-size': 0.5,
  },
  paint: {
    'icon-color': themeDefHeatNetwork.classed.color,
    'icon-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      minZoomData + 0.2,
      0,
      minZoomData + 0.5 + 1,
      0.65,
    ],
  },
};

export const zoneDPLayerStyle = {
  type: 'fill',
  paint: {
    'fill-color': themeDefZoneDP.fill.color,
    'fill-opacity': themeDefZoneDP.fill.opacity,
  },
};

const DPE_ENERGY = 'dpe_energie';
const arrColorFromDefBuildingsDpeEnergy = [
  ...Object.entries(themeDefBuildings.colors).flatMap(
    ([dpeCode, dpeStyleDef]: [string, any]) => [dpeCode, dpeStyleDef.color]
  ),
  themeDefBuildings.colors.unknow.color,
];

export const buildingsLayerStyle = {
  type: 'fill',
  paint: {
    'fill-color': [
      'match',
      ['downcase', ['coalesce', ['get', DPE_ENERGY], 'N']],
      ...arrColorFromDefBuildingsDpeEnergy,
    ],
    'fill-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      minZoomData + 0.2,
      0,
      minZoomData + 0.2 + 1,
      themeDefBuildings.opacity,
    ],
  },
};

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const LegendLogoList = styled.div<{
  legendCollapsed: boolean;
}>`
  width: 332px;
  position: absolute;
  bottom: 4px;
  z-index: 9999;
  background: #ffffff;
  ${({ legendCollapsed }) => legendCollapsed && 'display: none;'}
  height:100px;
`;

export const LegendLogoLink = styled.a`
  width: 166px;
  background-color: white;
  img {
    width: 100%;
    vertical-align: middle;
  }
  display: inline-block;

  &::after {
    display: none !important;
  }
`;

export const LegendLogo = styled.div`
  width: 166px;
  background-color: white;
  img {
    width: 100%;
    vertical-align: middle;
  }
  display: inline-block;
`;

export const TopLegend = styled.div<{
  legendCollapsed: boolean;
}>`
  background-color: white;
  width: ${({ legendCollapsed }) =>
    legendCollapsed ? '100%' : 'calc(100% - 333px)'};
  @media (max-width: 600px) {
    width: 100%;
    display: block;
  }
  @media (max-width: 1251px) {
    display: flex;
  }
  height: fit-content;
  border-bottom: solid 1px #dddddd;

  .fr-toggle {
    width: fit-content;
    padding: 8px 16px;
  }

  .fr-toggle__label {
    color: var(--bf500);
    font-weight: bold;

    &::before {
      margin-top: 0;
      content: '' !important;
    }

    &::after {
      top: 8px;
      right: 32px !important;
    }
  }
`;

export const TopLegendSwitch = styled.div<{
  legendCollapsed?: boolean;
  isProMode?: boolean;
}>`
  margin-left: 24px;
  @media (max-width: 600px) {
    width: 100%;
    display: block;
  }
  .fr-toggle__label {
    color: var(--blue-france-113);
  }
  ${({ legendCollapsed, isProMode }) =>
    !legendCollapsed &&
    isProMode &&
    `@media (max-width: 600px) {
      display: none;
    }`}
`;
