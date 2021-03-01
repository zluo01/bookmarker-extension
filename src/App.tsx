import { Fragment, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles';
import { lightTheme, darkTheme, DARK, LIGHT } from './styles/Themes';
import { HOST_SERVER, IBookmark, IHistory, ITab } from './constant';
import { MdChevronLeft } from 'react-icons/md';
import Content from './components/Content';
import Footer from './components/Footer';
import BookmarkModal from './components/BookmarkForm';
import useTrigger from './module';
import { checkBookmarkExist } from './helper';
import { createTab, getCurrentTabInfo } from './browser';

const defaultHistory: IHistory = {
  id: 1,
  title: 'Bookmarker',
};

const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function App(): JSX.Element {
  const [bookmark, setBookmark] = useState<IBookmark[]>();
  const [activateTab, setActiveTab] = useState<ITab>();
  const [history, setHistory] = useState<IHistory[]>([defaultHistory]);

  const [openForm, setOpenForm] = useState(false);

  const [theme, setTheme] = useState(darkModeQuery.matches ? DARK : LIGHT);

  const trigger = useTrigger();

  useEffect(() => setOpenForm(trigger), [trigger]);

  useEffect(() => {
    checkExist();
    fetch(`${HOST_SERVER}/api/get/detail/${history[history.length - 1].id}`)
      .then<IBookmark[]>(res => res.json())
      .then(bookmarks => setBookmark(bookmarks))
      .catch(err => console.error(err));
  }, [history]);

  // set up a listener to respond to future changes of system theme
  useEffect(() => {
    darkModeQuery.addEventListener('change', event => {
      setTheme(event.matches ? DARK : LIGHT);
    });
  });

  function checkExist() {
    getCurrentTabInfo()
      .then(tab => {
        checkBookmarkExist(tab.title, tab.url)
          .then(res => res.json())
          .then(result =>
            setActiveTab({
              id: result.length > 0 && result[0][0],
              title: tab.title,
              url: tab.url,
              parent: result.length > 0 && result[0][1],
            })
          )
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  async function open(bookmark: IBookmark) {
    if (bookmark.type === 1) {
      createTab(bookmark.url)
        .then(() => window.close())
        .catch(err => console.error(err));
    } else {
      setHistory(history.concat({ id: bookmark.id, title: bookmark.title }));
    }
  }

  async function back() {
    if (openForm) {
      setOpenForm(false);
    } else {
      setHistory(history.slice(0, history.length - 1));
    }
  }

  const getFunctionName = activateTab?.id
    ? 'Edit bookmark'
    : 'Add New Bookmark';

  return (
    <ThemeProvider theme={theme === LIGHT ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Container>
          <Header>
            {(history.length > 1 || openForm) && (
              <BackButton onClick={back}>
                <BackIcon />
              </BackButton>
            )}
            <FolderName>
              {!openForm ? history[history.length - 1].title : getFunctionName}
            </FolderName>
          </Header>
          {history.length <= 1 && !openForm && (
            <Fragment>
              <Divider />
              <EditButton onClick={() => setOpenForm(true)}>
                {getFunctionName}
              </EditButton>
            </Fragment>
          )}
          <Divider />
          {openForm ? (
            <BookmarkModal currentTab={activateTab} />
          ) : (
            <Fragment>
              <Content bookmark={bookmark} open={open} />
              <Divider />
              <Footer history={history} />
            </Fragment>
          )}
        </Container>
      </>
    </ThemeProvider>
  );
}

const Container = styled.div`
  min-width: 250px;
  max-width: 360px;
`;

const Header = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${props => props.theme.body};
  width: 100%;
  height: 35px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

const BackButton = styled.button`
  height: 35px;
  width: 35px;
  border: none;
  position: absolute;
  cursor: pointer;
  background: none;
  text-decoration: none;
  outline: none;

  &:hover {
    color: pink;
  }

  &:active {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

const BackIcon = styled(MdChevronLeft)`
  height: 30px;
  width: 30px;
  color: ${props => props.theme.text};
`;

const FolderName = styled.div`
  max-width: calc(100% - 70px);
  font-size: 20px;
  text-align: center;
  margin: auto;
`;

const EditButton = styled.button`
  width: 100%;
  height: 35px;
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

export const Divider = styled.hr`
  border-top: 1px solid #bbb;
  border-radius: 5px;
`;

export default App;
