import { Subject } from 'rxjs';
import { ObjectDetails } from './object-details.interface';
import { TimeRange } from './time-range.interface';
import { GetProfileBody } from './get-profile-body.interfaces';

export interface ProfileInfo {
  timeRange: Subject<TimeRange>,
  profile: Subject<GetProfileBody>,
  details: Subject<ObjectDetails>,
  detailsBy: Subject<string>,
  fingerprint: Subject<string>,
  defaultColumns: string[]
}
