import { View } from 'react-native';

interface BioCollectProject {
  projectId: string;
  aim: string;
  coverage: {
    datum: string;
    fid: string;
    other: string[];
    precision: string;
    lga: string[];
    bbox: string;
    aream2: number;
    decimalLatitude: number;
    pid: number;
    uncertainty: string;
    type: string;
    elect: string[];
    cmz: string[];
    state: string[];
    mvg: string;
    areaKmSq: number;
    nrm: string[];
    locality: string;
    decimalLongitude: number;
    centre: string[];
    mvs: string;
    name: string;
    imcra4_pb: string[];
    ibra: string[];
    layerName: string;
  };
  description: string;
  difficulty: string | null;
  endDate: string | null;
  isExternal: false;
  isSciStarter: false;
  keywords: string[] | null;
  links: string[];
  name: string;
  organisationId: string;
  organisationName: string;
  scienceType: string[];
  ecoScienceType: string[];
  startDate: string;
  urlImage: string;
  fullSizeImageUrl: string;
  urlWeb: string | null;
  plannedStartDate: string | null;
  plannedEndDate: string | null;
  projectType: string;
  isMERIT: boolean;
  tags: string[];
  noCost: boolean;
}

const ProjectCard = () => {
  return <View>Testing</View>;
};
