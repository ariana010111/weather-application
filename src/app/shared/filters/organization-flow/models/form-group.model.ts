
export interface IBusinessControl {
  businessType?: string;
  businessId?: string[];
}

export interface ISeasonControl {
  businessType?: string;
  businessId?: string[];
  semester?: string;
  year?: string | number;
  season?: string[];
  seasonId?: string[];
  yearView?: boolean;
}

export interface IProgramControl {
  program: string[];
  programId: string[];
}
