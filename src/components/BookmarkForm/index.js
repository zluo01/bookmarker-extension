import React, { Fragment, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import querystring from 'querystring';
import { HOST_SERVER } from '../../constant';
import PropTypes from 'prop-types';

const Index = ({ currentTab }) => {
    const [folder, setFolder] = useState();

    useEffect(() => {
        fetch(`${HOST_SERVER}/api/get/folder`)
            .then(res => res.json())
            .then(folders => setFolder(folders))
            .catch(error => console.error(error));
    }, [folder]);

    const closePopup = async () => {
        if (currentTab.id) {
            await fetch(`${HOST_SERVER}/api/delete/bookmark/${currentTab.id}`);
        }
        window.close();
    };

    const handleSubmit = ({ Name, Folder }) => {
        let request;
        if (!currentTab.id) { // new bookmark
            request = fetch(`${HOST_SERVER}/api/add/bookmark?${querystring.stringify({
                id: Folder,
                name: Name,
                url: currentTab.url
            })}`);
        } else { // update old bookmark
            request = fetch(`${HOST_SERVER}/api/extension/update?${querystring.stringify({
                bookmarkId: currentTab.id,
                newFolderId: Folder,
                newBookmarkName: Name
            })}`);
        }
        request.then(() => closePopup()).catch(err => console.error(err));
    };

    return (
        <Fragment>
            {
                folder && <Formik
                    initialValues={{
                        Name: currentTab.title,
                        Folder: currentTab.parent ? folder.filter(o => o.id === currentTab.parent)[0].id : folder[0].id
                    }}
                    onSubmit={async (values) => handleSubmit(values)}
                    validationSchema={Yup.object().shape({
                        Name: Yup.string().required('Required'),
                        Folder: Yup.string().required('Required!')
                    })}
                >
                    {({ handleChange, isSubmitting }) => {
                        return (
                            <StyledForm>
                                <StyledInput>
                                    <InputFiled>
                                        <InputLabel>Name</InputLabel>
                                        <StyledField type="text" name="Name"/>
                                    </InputFiled>
                                    <StyledError name="Name" component="div"/>
                                </StyledInput>
                                <StyledInput>
                                    <InputFiled>
                                        <InputLabel>Folder</InputLabel>
                                        <StyledSelect as="select"
                                                      name="Folder"
                                                      onChange={handleChange}
                                        >
                                            {
                                                folder.map(o => <option key={o.id}
                                                                        value={o.id}
                                                                        label={o.title}
                                                                        selected={o.id === currentTab.parent}/>)
                                            }
                                        </StyledSelect>
                                    </InputFiled>
                                    <StyledError name="Folder" component="div"/>
                                </StyledInput>
                                <ButtonGroup>
                                    <CancelButton type="button" disabled={isSubmitting} onClick={closePopup}>
                                        {
                                            !currentTab.id ? 'Cancel' : 'Remove'
                                        }
                                    </CancelButton>
                                    <SubmitButton type="submit" disabled={isSubmitting}>
                                        Submit
                                    </SubmitButton>
                                </ButtonGroup>
                            </StyledForm>
                        );
                    }}
                </Formik>
            }
        </Fragment>
    );
};

Index.propTypes = {
    currentTab: PropTypes.object
};

const StyledForm = styled(Form)`
  width: 320px;
  min-height: 175px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
`;

const StyledInput = styled.div`
  width: inherit;
  height: 50px;
  display: flex;
  flex-flow: column nowrap;
`;

const InputLabel = styled.span`
  font-size: 16px;
  width:50px;
`;

const InputFiled = styled.div`
  width: inherit;
  height: 55px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const StyledField = styled(Field)`
  height: 28px;
  padding: .2rem;
  font-size: 16px;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  
  :focus {
    border-color: #007eff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(0, 126, 255, 0.1);
    outline: none;
  }
  
  .error {
    border-color: red;
  }
`;

const StyledSelect = styled(StyledField)`
  width: 220px;
  height: 36px;
`;

const StyledError = styled(ErrorMessage)`
  color: red;
  margin-top: .25rem;
`;

const ButtonGroup = styled.div`
  height: 45px;
  width: 310px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  margin: auto;
`;

const SubmitButton = styled.button`
  max-width: 150px;
  padding: 8px 16px;
  border-style: none;
  border-radius: 5px;
  background-color: #08c;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  
  :disabled {
    opacity: .5;
    cursor: not-allowed !important;
  }

  .outline {
    background-color: #eee;
    border: 1px solid #aaa;
    color: #555;
  }
`;

const CancelButton = styled(SubmitButton)`
  background-color: gray;
  margin-right: .5rem;
`;

export default Index;
