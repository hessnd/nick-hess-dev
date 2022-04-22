export interface Job {
  name: string;
  title: string;
  startDate: string;
  endDate?: string;
  currentPosition: boolean;
}

export interface Resume {
  profile: string;
  experienceCollection: {
    items: Job[];
  };
}
