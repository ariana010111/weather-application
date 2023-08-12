import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import {environment} from "../../../environments/environment";


export interface AppState {


}

export const AppReducers: ActionReducerMap<AppState> = {


};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
