import { Text, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

interface RootStyleProps {
  first?: boolean;
  last?: boolean;
}

const Root = styled(TouchableHighlight)<RootStyleProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme, last }) => (last ? 'transparent' : theme.background.tertiary)};
  border-top-left-radius: ${({ theme, first }) => (first ? theme.radius * 2 : 0)}px;
  border-top-right-radius: ${({ theme, first }) => (first ? theme.radius * 2 : 0)}px;
  border-bottom-left-radius: ${({ theme, last }) => (last ? theme.radius * 2 : 0)}px;
  border-bottom-right-radius: ${({ theme, last }) => (last ? theme.radius * 2 : 0)}px;
`;

const RootText = styled(Text)`
  font-family: ${({ theme }) => theme.font.button};
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
  margin-left: 10px;
`;

interface ModalButtonProps extends TouchableHighlightProps, RootStyleProps {
  text: string;
}

const NavButton = ({ text, last, ...rest }: ModalButtonProps) => {
  const theme = useTheme();
  return (
    <Root {...rest} last={last} underlayColor={theme.background.tertiary}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <RootText>{text}</RootText>
    </Root>
  );
};

export default NavButton;
