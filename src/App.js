import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HOST_SERVER } from './Constant';
import { MdChevronLeft } from 'react-icons/md';
import querystring from 'querystring';
import Content from './components/Content';
import Footer from './components/Footer';
import BookmarkModal from './components/BookmarkForm';
import browser from 'webextension-polyfill';
import useTrigger from './module';

function getBookmarkObject (id, title) {
    return {
        id: id,
        title: title
    };
}

function App () {
    const [bookmark, setBookmark] = useState();
    const [activateTab, setActiveTab] = useState({});
    const [history, setHistory] = useState([getBookmarkObject(1, 'Bookmarker')]);
    const [loading, setLoading] = useState(() => !bookmark);

    const [openForm, setOpenForm] = useState(false);

    const trigger = useTrigger();

    useEffect(() => setOpenForm(trigger), [trigger]);

    useEffect(() => setLoading(true), [history]);

    useEffect(() => {
        if (!loading && bookmark) return;
        let isMounted = true;
        checkExist(isMounted);
        fetch(`${HOST_SERVER}/api/get/detail/${history[history.length - 1].id}`)
            .then(res => res.json())
            .then(bookmarks => {
                if (isMounted) {
                    setBookmark(bookmarks);
                    setLoading(false);
                }
            }).catch(err => console.error(err));

        return () => {
            isMounted = false;
        };
    });

    const checkExist = (isMount) => {
        browser.tabs.query({
            active: true,
            currentWindow: true
        })
            .then(tabs => {
                const tab = tabs[0];
                fetch(`${HOST_SERVER}/api/check?${querystring.stringify({
                    title: tab.title,
                    url: tab.url
                })}`)
                    .then(res => res.json())
                    .then((result) => {
                        if (isMount) {
                            setActiveTab({
                                id: result.length > 0 && result[0][0],
                                title: tab.title,
                                url: tab.url,
                                parent: result.length > 0 && result[0][1]
                            });
                        }
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    };

    const open = async (bookmark) => {
        if (bookmark.type === 1) {
            window.open(bookmark.url, '_blank');
            window.close();
        } else {
            setHistory(history.concat(getBookmarkObject(bookmark.id, bookmark.title)));
        }
    };

    const back = async () => {
        if (openForm) {
            setOpenForm(false);
        } else {
            setHistory(history.slice(0, history.length - 1));
        }
    };

    const getFunctionName = () => {
        return activateTab.id ? 'Edit bookmark' : 'Add New Bookmark';
    };

    return (
        <Container>
            <Header>
                {
                    (history.length > 1 || openForm) &&
                    <BackButton onClick={back}><BackIcon/></BackButton>
                }
                <FolderName>
                    {
                        !openForm
                            ? history[history.length - 1].title
                            : getFunctionName()
                    }
                </FolderName>
            </Header>
            {
                (history.length <= 1 && !openForm) &&
                <Fragment>
                    <Divider/>
                    <EditButton onClick={() => setOpenForm(true)}>
                        {
                            getFunctionName()
                        }
                    </EditButton>
                </Fragment>
            }
            <Divider/>
            {
                openForm
                    ? <BookmarkModal currentTab={activateTab}/>
                    : <Fragment>
                        <Content bookmark={bookmark} open={open}/>
                        <Divider/>
                        <Footer history={history}/>
                    </Fragment>
            }
        </Container>
    );
}

const Container = styled.div`
  min-width: 250px;
  max-width: 360px;
`;

const Header = styled.div`
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
  cursor:pointer;
  background: none;
  text-decoration: none;
  outline:none;
  
  &:hover {
    color: pink;
  }
  
  &:active {
    outline:none;
  }
  
  &:focus {
    outline:none;
  }
`;

const BackIcon = styled(MdChevronLeft)`
  height: 30px;
  width: 30px;
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
  
  &:hover {
    background-color: blanchedalmond;
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid #bbb;
  border-radius: 5px;
`;

export default App;
