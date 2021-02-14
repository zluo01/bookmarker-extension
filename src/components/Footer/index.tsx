import styled from 'styled-components';
import React from 'react';
import { HOST_SERVER, IHistory } from '../../constant';

interface IFooter {
  history: IHistory[];
}

function Index({ history }: IFooter): JSX.Element {
  return (
    <Footer
      onClick={() => {
        window.open(
          HOST_SERVER.concat(
            history.length > 1 ? `/?id=${history[history.length - 1].id}` : ''
          ),
          '_blank'
        );
        window.close();
      }}
    >
      Show All Bookmarks
    </Footer>
  );
}

const Footer = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  outline: none;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => props.theme.button.backgroundColor};

  &:hover {
    background-color: ${props => props.theme.button.hoverColor};
  }
`;

export default Index;
