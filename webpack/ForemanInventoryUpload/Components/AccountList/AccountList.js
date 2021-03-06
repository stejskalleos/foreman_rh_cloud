import React, { Component } from 'react';
import { noop } from 'foremanReact/common/helpers';
import { Accordion } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import ListItem from './Components/ListItem';
import EmptyState from './Components/EmptyState';
import ErrorState from './Components/ErrorState';
import EmptyResults from './Components/EmptyResults';
import { filterAccounts } from './AccountListHelper';
import './accountList.scss';

class AccountList extends Component {
  componentDidMount() {
    const { fetchAccountsStatus, startAccountStatusPolling } = this.props;
    fetchAccountsStatus();
    const pollingProcessID = setInterval(fetchAccountsStatus, 5000);
    startAccountStatusPolling(pollingProcessID);
  }

  componentWillUnmount() {
    const { stopAccountStatusPolling, pollingProcessID } = this.props;
    stopAccountStatusPolling(pollingProcessID);
  }

  render() {
    const { accounts, error, filterTerm } = this.props;
    const accountIds = Object.keys(accounts);
    const filteredAccountIds = filterAccounts(accounts, accountIds, filterTerm);

    if (error) {
      return <ErrorState error={error} />;
    }

    if (accountIds.length === 0) {
      return <EmptyState />;
    }

    if (filteredAccountIds.length === 0) {
      return <EmptyResults />;
    }

    const items = filteredAccountIds.map((accountID, index) => {
      const account = accounts[accountID];
      return <ListItem key={index} accountID={accountID} account={account} />;
    });
    return <Accordion className="account-list">{items}</Accordion>;
  }
}

AccountList.propTypes = {
  fetchAccountsStatus: PropTypes.func,
  startAccountStatusPolling: PropTypes.func,
  stopAccountStatusPolling: PropTypes.func,
  pollingProcessID: PropTypes.number,
  account: PropTypes.shape({
    generate_report_status: PropTypes.string,
    upload_report_status: PropTypes.string,
  }),
  accounts: PropTypes.object,
  error: PropTypes.string,
  filterTerm: PropTypes.string,
};

AccountList.defaultProps = {
  fetchAccountsStatus: noop,
  startAccountStatusPolling: noop,
  stopAccountStatusPolling: noop,
  pollingProcessID: 0,
  account: {
    generate_report_status: 'unknown',
    upload_report_status: 'unknown',
  },
  accounts: {},
  error: '',
  filterTerm: null,
};

export default AccountList;
