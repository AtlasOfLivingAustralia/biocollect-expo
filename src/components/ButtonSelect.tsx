import { useState } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Body from './Body';

interface ButtonSelectProps extends ViewProps {
  options: string[];
  initial?: string;
  onSelect?: (option: string) => void;
}

const Root = styled(View)`
  display: flex;
  align-items: center;
`;

const ButtonSelectRoot = styled(View)`
  display: flex;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.radius}px;
  background-color: ${({ theme }) => theme.background.primary};
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 3px;
  padding-right: 3px;
  shadow-opacity: 0.25;
  shadow-radius: 2px;
  shadow-color: black;
  shadow-offset: 0px 0px;
  elevation: 4;
`;

interface ButtonSelectButtonStyleProps {
  active: boolean;
  last: boolean;
}

const ButtonSelectButton = styled(TouchableOpacity)<ButtonSelectButtonStyleProps>`
  background-color: ${({ theme, active }) => (active ? theme.colour.primary : 'transparent')};
  border-radius: ${({ theme }) => theme.radius / 2}px;
  padding: 6px;
  margin-left: 3px;
  margin-right: 3px;
`;

const ButtonSelect = ({ options, initial, onSelect, ...rest }: ButtonSelectProps) => {
  const [current, setCurrent] = useState<string>(initial || options[0]);
  const theme = useTheme();

  // Event handler for button selection
  const handleButtonSelect = (option: string) => {
    setCurrent(option);
    if (onSelect) onSelect(option);
  };

  return (
    <Root {...rest}>
      <ButtonSelectRoot>
        {options.map((option, index) => {
          const active = option === current;
          return (
            <ButtonSelectButton
              key={option}
              last={index === options.length - 1}
              activeOpacity={1}
              active={active}
              onPress={() => handleButtonSelect(option)}>
              <Body bold={active} style={{ color: active ? 'white' : theme.text.secondary }}>
                {option}
              </Body>
            </ButtonSelectButton>
          );
        })}
      </ButtonSelectRoot>
    </Root>
  );
};

export default ButtonSelect;
