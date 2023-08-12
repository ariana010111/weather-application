export interface ICustomReport {
  query: string;
  from: number;
  size: number;
  source: string[];
  formFields: IFormField[];
}

export interface IFormField {
  name: string;
  elements: string[];
}
