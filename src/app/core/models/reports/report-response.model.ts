import {IPartner} from '@features/reports/models/core/partner.model';
import {IProvider} from '@features/reports/models/core/provider.model';
import {IInstructor} from '@features/reports/models/core/instructor.model';
import {ISeason} from '@features/reports/models/core/season.model';
import {IRestriction} from '@features/reports/models/core/restriction.model';
import {IDay} from '@features/reports/models/core/day.model';
import {IForm} from '@features/reports/models/forms/form-report.model';

export interface IReportResponse {
  took: number;
  timeOut: boolean;
  total: ITotal;
  result: IReportResult[];
}

export interface ITotal {
  value: number;
  relation: string;
}

export interface IGroup {
  categoryId?: number;
  categoryName?: string;
  subCategoryId?: number;
  subCategoryName?: string;
  instructor?: IInstructor[];
}

export interface IReportResult {
  id?: number;
  createDate?: string;
  modifiedDate?: string;
  registrationDate?: string;
  desiredStartDate?: string;
  cancelDate?: string;
  cancellationEffectiveDate: string;
  transferEffectiveDate?: string;
  transferDate?: string;
  confirmation?: string;
  placedBy?: string;
  type?: string;
  orderMode?: string;
  status?: string;
  transferredIn?: boolean;
  locationType?: string;
  paymentPlanType?: string;
  paymentMode?: string;
  checkoutPaymentMethod?: string;
  totalAmount?: number;
  paidAmount?: number;
  balance?: number;
  pastDueBalance?: number;
  balanceStatus?: string;
  dayOfWeek?: string[];
  group?: IGroup[];
  business?: IBusiness;
  partner?: IPartner;
  provider?: IProvider;
  season?: ISeason;
  program?: IProgram;
  breakdownAndInstallment?: IBreakdownAndInstallment[];
  transaction?: ITransaction[];
  participant?: IParticipant;
  form?: IForm[];
  waiver?: IWaiver[];
  session?: ISessionReport[];
}

export interface IBusiness {
  id: number;
  createDate: Date;
  modifiedDate: Date;
  registrationDate: Date;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  pastDueBalance: number;
  locationType: string;
  balanceStatus: string;
  dayOfWeek: any[];
  group: any[];
  placedBy: string;
  orderMode: string;
  type: string;
  name: string;
  domain: string;
  logo: string;
  website: string;
  districtName: string;
  timeZone: string;
  currency: string;
  culture: string;
}

export interface ICharge {
  id: number;
  category: string;
  amount: number;
  name: string;
}

export interface IBreakdownAndInstallment {
  regularScheduleId: number;
  startDate: Date;
  endDate: Date;
  installment: IInstallment[];
  charge: ICharge[];
  discount: any[];
  beforeAfterScheduleId?: any;
  dueDate?: any;

}


export interface ICategory {
  category: string;
  subCategory: string[];
}
export interface IInPerson {
  id: number;
  name: string;
  address: string;
}

export interface IOnline {
  id: number;
  application: string;
}

export interface ILocation {
  inPerson: IInPerson;
  online: IOnline;
}

export interface IInitialTuitionLabelSettings {
  id: number;
  name: string;
  price: number;
}

export interface ISchedule {
  Id: number;
  title: string;
  startDate: string;
  endDate: string;
  minimumCapacity: number;
  maximumCapacity: number;
  day: IDay[];
  restriction: IRestriction;
  initialTuitionLabelSettings: IInitialTuitionLabelSettings;
}

export interface IProgram {
  id: string;
  internalId: number;
  name: string;
  type: string;
  status: string;
  glCode: string;
  room: string;
  additionalInfo: string;
  externalId: string;
  category: ICategory[];
  location: ILocation;
  instructor: IInstructor[];
  schedule: ISchedule;
}

export interface IInstallment {
  id: number;
  type: string;
  date: Date;
  amount: number;
  paidAmount: number;
  balance: number;
  pastDueBalance: number;
  status: string;
  balanceStatus: string;
  lastPaymentTransactionDate: Date;
  isSuspend: boolean;
  suspendedDate: Date;
  unsuspendedDate: Date;
  autoChargeAttempt: number;
}

export interface ICharge {
  id: number;
  chargeId: number;
  category: string;
  amount: number;
  name: string;
}

export interface IDiscount {
  id: number;
  discountId: number;
  category: string;
  amount: number;
  name: string;
}


export interface ICard {
  brand: string;
  name: string;
  last4: string;
}

export interface ITransaction {
  id: number;
  paymentId: number;
  amount: number;
  date: Date;
  type: string;
  category: string;
  status: string;
  isManual: boolean;
  paymentMethod: string;
  transactionId: string;
  processorTransactionId: string;
  note: string;
  errorMessage: string;
  card: ICard;
}


export interface IElement {
  name: string;
  title: string;
  type: string;
  value: string;
  phone: string;
}

export interface ISection {
  name: string;
  title: string;
  element: IElement[];
}

export interface IParticipant {
  id?: number;
  userId?: number;
  internalId?: number;
  familyId?: string;
  familyExternalId?: string;
  familyCustom1?: string;
  internalUserId?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  custom1?: string;
  custom2?: string;
  externalId?: string;
}

export interface IElement {
  name: string;
  value: string;
  title: string;
  type: string;
}

export interface IWaiver {
  id?: number;
  name?: string;
  confirmationType?: string;
  status?: string;
}
export interface ISessionReport{
  sessionId?: number;
  programSessionId?: number;
  sessionStartDate?: string;
  sessionEndDate?: string;
  attendanceDate?: string;
  attendanceStatus?: string;
  authorizedPickupId?: string;
  checkInDateTime?: string;
  checkOutDateTime?: string;
  checkinCheckoutStatus?: string;
  checkinFirstName?: string;
  checkinLastName?: string;
  pickupFirstName?: string;
  pickupLastName?: string;
  dismissalFromEnrichment?: string;
}
