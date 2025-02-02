import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const IFrameBox = styled.button`
  border: solid 1px var(--bf500);
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;
`;

export const CopyInfo = styled.div`
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 0 4px;
  border-radius: 4px;
  font-size: 10px;
  position: absolute;
  color: white;
  background-color: black;
`;
