import { Text, ImageSourcePropType, TextProps } from 'react-native';
import styled from 'styled-components/native';

type ButtonVariant = 'solid' | 'outline';

interface ChipStyleProps {
  variant?: ButtonVariant;
}

interface ChipProps extends ChipStyleProps, TextProps {
  icon?: ImageSourcePropType;
  loading?: boolean;
}

const Chip = styled(Text)<ChipStyleProps>`
  padding: 4px;
  padding-left: 12px;
  padding-right: 12px;
  background-color: ${({ theme, variant }) =>
    variant === 'outline' ? 'transparent' : theme.chip.primary};
  border-width: 2px;
  border-color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.chip.primary : 'transparent'};
  border-radius: ${({ theme }) => theme.radius / 2}px;
  font-family: '${({ theme }) => theme.font.body}';
  font-size: 14px;
  color: ${({ theme, variant }) =>
    variant === 'outline' ? theme.chip.primary : theme.text.primary};
`;

export default function Button(props: ChipProps) {
  const { variant, loading, ...rest } = props;

  return (
    <Chip {...rest} variant={variant}>
      {rest.children}
    </Chip>
  );
}
