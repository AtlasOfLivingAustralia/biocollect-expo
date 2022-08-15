import axios from 'axios';
import Constants from 'expo-constants';
import { BioCollectProjectSearch } from 'types';

const projectSearch = async (
  offset: number = 0
): Promise<BioCollectProjectSearch> => {
  // Retrieve the auth configuration
  const { biocollect_url } = Constants.manifest.extra.config.biocollect;

  const request = await axios.get<BioCollectProjectSearch>(
    `${biocollect_url}/ws/project/search`,
    {
      params: {
        fq: 'isExternal:F',
        initiator: 'biocollect',
        sort: 'nameSort',
        mobile: true,
        isUserPage: false,
        max: 20, // TODO: Max doesn't seem to be working
        offset,
      },
    }
  );

  return request.data;
};

export { projectSearch };
