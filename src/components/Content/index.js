import React, { Fragment } from 'react';
import styled from 'styled-components';
import { MdFolder } from 'react-icons/md';
import PropTypes from 'prop-types';

const Index = ({ bookmark, open }) => {
    return (
        <Content>
            <Fragment>
                {
                    bookmark && bookmark.map(o => {
                        return (
                            <Bookmark key={o.id}
                                      title={o.title}
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
                        );
                    })
                }
            </Fragment>
        </Content>
    );
};

Index.propTypes = {
    bookmark: PropTypes.array,
    open: PropTypes.func
};

const Content = styled.ul`
  width: 100%;
  border-radius: 5px;
  list-style-type: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const Bookmark = styled.li`
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
`;

const Icon = styled.div`
    font-size:18px;
    text-align:center;
    width: 30px;
    padding-top: 5px;
`;

const Title = styled.div`
    font-size: 14px;
    width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default Index;
