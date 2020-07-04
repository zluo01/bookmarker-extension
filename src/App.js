import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {MdChevronLeft, MdFolder} from "react-icons/md";
import './App.css';

function App() {
    const [bookmark, setBookmark] = useState()
    const [bookmarkId, setBookmarkId] = useState([1])
    const [title, setTitle] = useState(["Bookmarker"])
    const [loading, setLoading] = useState(() => !bookmark)

    useEffect(() => setLoading(true), [bookmarkId])

    useEffect(() => {
        if (!loading && bookmark) return
        let isMounted = true;
        fetch(`http://localhost:8080/api/get/detail/${bookmarkId[bookmarkId.length - 1]}`)
            .then(res => res.json())
            .then(bookmarks => {
                console.log(bookmarks)
                if (isMounted) {
                    setBookmark(bookmarks)
                    setLoading(false)
                }
            }).catch(err => console.error(err))

        return () => {
            isMounted = false
        }
    })

    const open = async (bookmark) => {
        if (bookmark.type === 1)
            window.open(bookmark.url, "_blank")
        else {
            setBookmarkId(bookmarkId.concat([bookmark.id]))
            setTitle(title.concat([bookmark.title]))
        }
    }

    const back = async () => {
        setBookmarkId(bookmarkId.slice(0, bookmarkId.length - 1))
        setTitle(title.slice(0, title.length - 1))
    }

    return (
        <div className="App">
            <Header>
                {
                    bookmarkId.length > 1 &&
                    <BackButton onClick={back}><BackIcon/></BackButton>
                }
                {
                    <FolderName>{title[title.length - 1]}</FolderName>
                }
            </Header>
            <Divider/>
            <Content>
                {
                    bookmark && bookmark.map(o => {
                        return (
                            <Bookmark title={o.title}
                                      onClick={() => open(o)}>
                                <Icon>
                                    {
                                        o.type === 1
                                            ? <img height="16"
                                                   width="16"
                                                   src={`https://icons.duckduckgo.com/ip3/${(new URL(o.url)).hostname}.ico`}
                                                   alt={''}/>
                                            : <MdFolder/>
                                    }
                                </Icon>
                                <Title>{o.title}</Title>
                            </Bookmark>
                        )
                    })
                }
            </Content>
            <Divider/>
            <Footer onClick={() => window.open('http://localhost:8080', "_blank")}>
                Show All Bookmarks
            </Footer>
        </div>
    );
}

const Header = styled.div`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  align-items: center;
  padding-top: 10px;
`

const BackButton = styled.button`
  height: 35px;
  width: 35px;
  text-align:center;
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
`

const BackIcon = styled(MdChevronLeft)`
  height: 30px;
  width: 30px;
`
const FolderName = styled.div`
  max-width: calc(100% - 70px);
  font-size: 24px;
  text-align: center;
  margin: auto;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 5px;
  cursor: pointer;
`

const Bookmark = styled.div`
  width: inherit;
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  
  &:hover {
    background-color: pink;
    color: red;
    border-radius: 5px;
  }
`

const Icon = styled.div`
    font-size:18px;
    text-align:center;
    width: 30px;
    padding-top: 5px;
`

const Title = styled.div`
    font-size: 14px;
    width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Footer = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  outline: none;
  border: none;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: blanchedalmond;
  }
`

export const Divider = styled.hr`
  border-top: 1px solid #bbb;
  border-radius: 5px;
`

export default App;
