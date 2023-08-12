import {ICustomReport} from '@core/models/reports/custom-report.model';

export interface IExporter {
  http_method?: string;
  http_url?: string;
  body?: ICustomReport;
  name?: string;
  type?: string;
  template?: string;
}

export interface IGetExporter extends IExporter {
  status?: string; // enum
  download_link?: string;
  expiry_date?: string;
}

export interface IResponseExporter extends IExporter {
  reportId?: string;
}
