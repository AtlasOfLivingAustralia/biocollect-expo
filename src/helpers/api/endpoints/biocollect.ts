import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AppEnvironment, AppEnvironmentType } from 'helpers/appenv';
import { BioCollectProjectSearch, BioCollectSurvey } from 'types';

const formatProjects = async (
  search: BioCollectProjectSearch,
  isUserPage,
  type: AppEnvironmentType
) => ({
  ...search,
  projects: [
    ...search.projects.map((project) => ({
      ...project,
      name: project.name.trim(),
      description: project.description,
    })),
    ...(isUserPage
      ? JSON.parse((await AsyncStorage.getItem(`@biocollect_explored_${type}`)) || '[]')
      : []),
  ],
});

export default (env: AppEnvironment, type: AppEnvironmentType) => ({
  projectSearch: async (
    offset = 0,
    max = 20,
    isUserPage = false,
    search?: string,
    geoSearchJSON?: object
  ): Promise<BioCollectProjectSearch> => {
    // Retrieve the auth configuration
    const { biocollect_url } = env.biocollect;

    // Define basic query parameters
    const params = {
      fq: 'isExternal:F',
      initiator: 'biocollect',
      sort: 'nameSort',
      mobile: true,
      max,
      offset,
      isUserPage,
    };

    // Append user search
    if (search && search.length > 0) {
      params['q'] = search;
    }

    // Append GeoJSON search
    if (geoSearchJSON) {
      params['geoSearchJSON'] = JSON.stringify(geoSearchJSON);
    }

    // Make the GET request
    const request = await axios.get<BioCollectProjectSearch>(
      `${biocollect_url}/ws/project/search`,
      { params }
    );

    return await formatProjects(request.data, isUserPage, type);
  },
  listSurveys: async (projectId: string): Promise<BioCollectSurvey[]> => {
    // Retrieve the auth configuration
    const { biocollect_url } = env.biocollect;

    // Make the GET request
    const request = await axios.get<BioCollectSurvey[]>(
      `${biocollect_url}/ws/survey/list/${projectId}`
    );

    return request.data;
  },
});
