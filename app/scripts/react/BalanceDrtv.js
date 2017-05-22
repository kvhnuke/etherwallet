var angularUtils = require("./angular-utils");
var di = angularUtils.di;
var filters = di.filters;
var AddressIdenticon = require("./ui/AddressIdenticon");
var TokenBalances = require("./balance/TokenBalances");
var PropTypes = require("prop-types");

class BalanceDrtv extends React.Component {
  constructor() {
    super();
    this.state = {
      showLongBalance: false
    };
    this.toggleShowLongBalance = this.toggleShowLongBalance.bind(this);
    this.onSwap = this.onSwap.bind(this);
  }
  componentDidMount() {
    this.unregister = di.rootScope.$watch(
      () => {
        if (!this.props.wallet) {
          return false;
        }
        return {
          balance: this.props.wallet.balance,
          // FIXME we probably want all balances here
          btcBalance: this.props.wallet.btcBalance
        };
      },
      () => {
        this.forceUpdate();
      },
      true
    );
  }
  componentWillUnmount() {
    this.unregister();
  }
  render() {
    const wallet = this.props.wallet;
    if (!wallet) {
      return null;
    }

    return (
      <aside>
        <h5 translate="sidebar_AccountAddr">Account Address:</h5>
        <ul className="account-info">
          <AddressIdenticon address={wallet.getAddressString()} />
          <span className="mono wrap">{wallet.getChecksumAddressString()}</span>
        </ul>
        <hr />
        <h5 translate="sidebar_AccountBal">Account Balance:</h5>
        <ul
          className="account-info point"
          onDoubleClick={this.toggleShowLongBalance}
          title={`${wallet.balance} (Double-Click)`}
        >
          <li>
            <span className="mono wrap">
              {this.state.showLongBalance
                ? wallet.balance
                : filters.number(wallet.balance)}
            </span>
            {" "}
            {ajaxReq.type}
          </li>
        </ul>
        <TokenBalances {...this.props} />
        <hr />
        <h5 translate="sidebar_TransHistory"> Transaction History: </h5>
        <ul className="account-info">
          {ajaxReq.type != "CUS" &&
            <li>
              <a
                href={ajaxReq.blockExplorerAddr.replace(
                  "[[address]]",
                  wallet.getAddressString()
                )}
                target="_blank"
              >
                {ajaxReq.type}
                {" "}
                (
                {ajaxReq.blockExplorerTX.replace("/tx/[[txHash]]", "")}
                )
              </a>
            </li>}
          <li>
            <a
              href={`https://ethplorer.io/address/${wallet.getAddressString()}`}
              target="_blank"
            >
              Tokens (Ethplorer.io)
            </a>
          </li>
        </ul>
        <hr />
        {ajaxReq.type == "ETH" &&
          <section>
            <h5 translate="sidebar_Equiv">Equivalent Values:</h5>
            <ul className="account-info">
              <li>
                <span className="mono wrap">
                  {filters.number(wallet.btcBalance)}
                </span>
                {" "}
                BTC
              </li>
              <li>
                <span className="mono wrap">
                  {filters.number(wallet.repBalance)}
                </span>
                {" "}
                REP
              </li>
              <li>
                <span className="mono wrap">
                  {filters.currency(wallet.eurBalance, "€")}
                </span>
                {" "}
                EUR
              </li>
              <li>
                <span className="mono wrap">
                  {filters.currency(wallet.usdBalance, "$")}
                </span>
                {" "}
                USD
              </li>
              <li>
                <span className="mono wrap">
                  {filters.currency(wallet.chfBalance, " ")}
                </span>
                {" "}
                CHF
              </li>
            </ul>
            <a
              target="_blank"
              onClick={this.onSwap}
              className="btn btn-primary btn-sm"
            >
              Swap via Bity
            </a>
          </section>}
      </aside>
    );
  }

  toggleShowLongBalance(e) {
    e.preventDefault();
    this.setState(state => {
      return {
        showLongBalance: !state.showLongBalance
      };
    });
  }

  onSwap() {
    var globalService = angularUtils.findInScope(this, "globalService");
    globalService.currentTab = globalService.tabs.swap.id;
    di.rootScope.$apply();
  }
}

BalanceDrtv.propTypes = {
  wallet: PropTypes.object
};

module.exports = angularUtils.translate(BalanceDrtv);
