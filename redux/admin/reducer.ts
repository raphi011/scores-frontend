import { ScrapeJob } from '../../types';
import * as actionNames from '../actionNames';
import { createReducer } from '../reduxHelper';

export const initialAdminState = {
  scrapeJobs: [],
};

export interface AdminStore {
  scrapeJobs: ScrapeJob[];
}

interface ReceiveScrapeJobAction {
  payload: ScrapeJob[];
}

function receiveScrapeJobs(
  _: AdminStore,
  action: ReceiveScrapeJobAction,
): AdminStore {
  return {
    scrapeJobs: action.payload,
  };
}

const reducer = createReducer(initialAdminState, {
  [actionNames.RECEIVE_SCRAPE_JOBS]: receiveScrapeJobs,
});

export default reducer;
