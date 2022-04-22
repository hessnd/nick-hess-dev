export type Job = {
  name: string;
  title: string;
  startDate: string;
  endDate?: string;
  currentPosition: boolean;
  details: string;
};

export type Resume = {
  profile: string;
  experienceCollection: {
    items: Job[];
  };
  skills: {
    name: string;
  };
};
