import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
`;

const QuestionnariePageHeader = styled.header`
  margin: 20px 0;
`;

const QuestionnariePageTitle = styled.h1``;

const QuestionnariePageContent = styled.div``;

const QuestionnariePageFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: lightgray;
`;

const QuestionnariePage: React.FC = () => {
  return (
    <PageContainer>
      <QuestionnariePageHeader>
        <QuestionnariePageTitle>Questionnarie</QuestionnariePageTitle>
      </QuestionnariePageHeader>
      <QuestionnariePageContent>Questionnarie</QuestionnariePageContent>
      <QuestionnariePageFooter>
        <Link to='/'>Link to title</Link>
      </QuestionnariePageFooter>
    </PageContainer>
  );
};

export default QuestionnariePage;
