import styled from 'styled-components';
import { HOST_SERVER, IHistory } from '../../constant';
import { createTab } from '../../browser';

interface IFooter {
  history: IHistory[];
}

function Index({ history }: IFooter): JSX.Element {
  return (
    <Footer
      onClick={() =>
        createTab(
          HOST_SERVER.concat(
            history.length > 1 ? `/?id=${history[history.length - 1].id}` : ''
          )
        )
          .then(() => window.close())
          .catch(err => console.error(err))
      }
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
