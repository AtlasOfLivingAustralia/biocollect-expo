import axios from 'axios';
import { AppEnvironment } from 'helpers/appenv';
import { BioCollectProject, BioCollectProjectSearch } from 'types';

const formatProjects = (search: BioCollectProjectSearch) => ({
  ...search,
  projects: search.projects.map((project) => {
    return {
      ...project,
      name: project.name.trim(),
      description: project.description,
    };
  }),
});

export default (env: AppEnvironment) => ({
  projectSearch: async (
    offset: number = 0,
    isUserPage: boolean = false
  ): Promise<BioCollectProjectSearch> => {
    // Retrieve the auth configuration
    const { biocollect_url } = env.biocollect;

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

    return formatProjects(request.data);
  },
});
