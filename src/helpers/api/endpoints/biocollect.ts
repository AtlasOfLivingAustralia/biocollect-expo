import axios from 'axios';
import Constants from 'expo-constants';
import { BioCollectProjectSearch } from 'types';
import { APIEnvironment } from '../provider';

export default (environment: APIEnvironment) => ({
  projectSearch: async (
    offset: number = 0,
    isUserPage: boolean = false
  ): Promise<BioCollectProjectSearch> => {
    // Retrieve the auth configuration
    const { biocollect_url } =
      Constants.manifest.extra.config[environment].biocollect;

    // Make the GET request
    const request = await axios.get<BioCollectProjectSearch>(
      `${biocollect_url}/ws/project/search`,
      {
        params: {
          fq: 'isExternal:F',
          initiator: 'biocollect',
          sort: 'nameSort',
          mobile: true,
          max: 20, // TODO: Max doesn't seem to be working
          offset,
          isUserPage,
        },
      }
    );

    return request.data;
  },
});
