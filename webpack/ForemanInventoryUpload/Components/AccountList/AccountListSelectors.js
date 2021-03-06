import { selectForemanInventoryUpload } from '../../../ForemanRhCloudSelectors';

export const selectAccountsList = state =>
  selectForemanInventoryUpload(state).accountsList;

export const selectAccounts = state => selectAccountsList(state).accounts;

export const selectPollingProcessID = state =>
  selectAccountsList(state).pollingProcessID;

export const selectError = state => selectAccountsList(state).error;

export const selectAutoUploadEnabled = state =>
  selectAccountsList(state).autoUploadEnabled;

export const selectHostObfuscationEnabled = state =>
  selectAccountsList(state).hostObfuscationEnabled;

export const selectIpsObfuscationEnabled = state =>
  selectAccountsList(state).ipsObfuscationEnabled;

export const selectCloudToken = state => selectAccountsList(state).cloudToken;

export const selectExcludePackages = state =>
  selectAccountsList(state).excludePackages;
