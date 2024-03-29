import { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

import Header from 'components/Header/Header';
import ThemeView from 'components/ThemeView';

// API / Auth
import { AuthContext } from 'helpers/auth';
import TextInput from 'components/Input';
import AllProjects from './components/AllProjects';
import ButtonSelect from 'components/ButtonSelect';
import Body from 'components/Body';
import NavButton from 'components/NavButton';
import HeaderView from 'components/HeaderView';

const SearchView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-right: ${({ theme }) => theme.defaults.viewPadding}px;
  padding-bottom: ${({ theme }) => theme.defaults.viewPadding}px;
`;

export default function Projects(props: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  const [search, setSearch] = useState<string>('');
  const [isUserPage, setIsUserPage] = useState<boolean>(false);
  const [focusTrigger, setFocusTrigger] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    return props.navigation.addListener('focus', () => {
      setFocusTrigger(!focusTrigger);
    });
  }, [props.navigation, focusTrigger]);

  useEffect(() => {
    if (!auth.authenticated) {
      setSearch('');
      setIsUserPage(false);
    }
  }, [auth.authenticated]);

  return (
    <>
      <ThemeView>
        <SafeAreaView>
          <HeaderView>
            <Header>Projects</Header>
            <NavButton
              icon="arrow-left"
              text="GO BACK"
              onPress={() => props.navigation.navigate('Home')}
            />
          </HeaderView>
          <SearchView>
            <TextInput
              value={search}
              onChangeText={setSearch}
              onEndEditing={() => setRefreshTrigger(!refreshTrigger)}
              style={{ flexGrow: 1 }}
              placeholder="Search"
              clearButtonMode="always"
            />
            <ButtonSelect
              options={['all', 'my']}
              onSelect={(option) => {
                const newUserPage = option === 'my';
                if (newUserPage !== isUserPage) {
                  setIsUserPage(newUserPage);
                  setRefreshTrigger(!refreshTrigger);
                }
              }}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
            <Body>projects</Body>
          </SearchView>
        </SafeAreaView>
        <AllProjects
          search={search}
          focusTrigger={focusTrigger}
          refreshTrigger={refreshTrigger}
          isUserPage={isUserPage}
          onProjectSelect={(project) => props.navigation.navigate('Project', project)}
        />
      </ThemeView>
    </>
  );
}
