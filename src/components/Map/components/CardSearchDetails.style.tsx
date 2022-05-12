import styled, { css } from 'styled-components';

const eligibleStyle = {
  color: '#18753c',
  bgColor: '#b8fec9',
};
const ineligibleStyle = {
  color: '#ce0500',
  bgColor: '#ffe9e9',
};
const transparency = 'a6'; // Equal to 70%

type MapCardType = {
  isEligible?: boolean;
  typeCard?: string;
  isClosable?: boolean;
  isClickable?: boolean;
};

export const MapCard = styled.div<MapCardType>`
  width: 100%;
  display: block;
  background-color: white;
  margin: 1em 0;
  border: 2px solid var(--bf500);
  border: 1px solid rgb(0 0 0 / 20%);

  border-radius: 0.3em;
  overflow: hidden;

  box-shadow: 1px 0 4px 1px rgb(0 0 0 / 20%);

  ${({ typeCard, isEligible }) => {
    switch (typeCard) {
      case 'search': {
        return css`
          border: 2px solid
            ${isEligible ? eligibleStyle.bgColor : ineligibleStyle.bgColor};
        `;
        break;
      }
      case 'legend': {
        return css`
          border: 2px solid #4550e5;
        `;
        break;
      }
    }
  }}

  > header {
    display: flex;
    padding: 0.5em;
    cursor: ${({ isClickable, isClosable }) =>
      isClickable || isClosable ? 'pointer' : 'default'};

    font-weight: bold;

    ${({ typeCard, isEligible }) => {
      switch (typeCard) {
        case 'search': {
          return css`
            background-color: ${isEligible
              ? eligibleStyle.bgColor
              : ineligibleStyle.bgColor};
            color: ${isEligible ? eligibleStyle.color : ineligibleStyle.color};
          `;
          break;
        }
        case 'legend': {
          return css`
            background-color: #4550e5;
            color: #ffffff;
          `;
          break;
        }
      }
    }}

    .buttonsWrapper {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding-left: 0.5rem;

      .closeButton {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 0 1px 2px 1px #33333333;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        cursor: pointer;

        ::before,
        ::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 80%;
          background-color: #333;
        }
        ::before {
          content: '';
          transform: rotate(-45deg);
        }
        ::after {
          content: '';
          transform: rotate(45deg);
        }
      }
    }
  }

  section {
    padding: 0.5em;

    ${({ isClosable }) =>
      isClosable &&
      css`
        max-height: 1000px;
        transition: max-height 0.75s ease, padding 0.5s ease 0.25s;
      `}
  }

  &.close {
    section {
      max-height: 0;
      padding: 0 0.5em;
    }

    :hover {
      section {
        max-height: 1000px;
        padding: 0.25em 0.5em;
      }
    }
  }
`;

export const EligibilityResult = styled.div<MapCardType>`
  background-color: #eeeeee;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border-left: 2px solid;

  ${({ isEligible }) =>
    css`
      border-color: ${isEligible ? eligibleStyle.color : ineligibleStyle.color}${transparency};
    `}
`;