import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FormInput from '@/renderer/components/FormInput';
import FormSubmitButton from '@/renderer/components/FormSubmitButton';
import { Config } from '@/renderer/config';
import { useBackgroundVideo } from '@/renderer/contexts/Background';
import { useConfig } from '@/renderer/contexts/Config';

const PageContainer = styled.div`
  width: 75vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  position: relative;
`;

const Form = styled.form`
  margin-top: 30px;
`;

const Input = styled(FormInput)`
  margin: 8px 0px;
`;

const Submit = styled(FormSubmitButton)`
  margin: 8px 0px;
`;

const isInitialized = async (config: Config): Promise<boolean> => {
  const settings = await Promise.all([
    window.TraPCollectionAPI.invoke.getProductKey(),
  ]);

  return settings.every((v) => v !== undefined);
};

const LoadingPage: React.FC = () => {
  useBackgroundVideo();
  const config = useConfig();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    isInitialized(config).then((b) => {
      if (b) {
        navigate('/loading');
      } else {
        setLoading(false);
      }
    });
  }, [navigate, config]);

  if (loading) {
    return null;
  }

  return (
    <PageContainer>
      <h1>Please input a product key and seat IDs.</h1>
      <Form onSubmit={() => navigate('/loading')}>
        <Input
          label='Product key'
          name='productKey'
          placeholder='Product Key'
        />
        <Submit outlined value='Submit' />
      </Form>
    </PageContainer>
  );
};

export default LoadingPage;