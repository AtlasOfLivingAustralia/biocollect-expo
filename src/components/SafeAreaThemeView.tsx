import styled from 'styled-components/native';

export default styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.background.primary};
`;
