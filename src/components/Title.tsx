import styled from 'styled-components/native';

export default styled.Text`
  font-family: '${({ theme }) => theme.font.header}';
  font-size: 36px;
  color: ${({ theme }) => theme.text.primary};
`;
