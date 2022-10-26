export type Job = {
  name: string;
  title: string;
  startDate: string;
  endDate?: string;
  currentPosition: boolean;
  details: string;
  jobTitlesCollection: {
    items: JobTitles[];
  };
};

export type JobTitles = {
  title: string;
  startDate: string;
  endDate?: string;
  currentPosition: boolean;
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
