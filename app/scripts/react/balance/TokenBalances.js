var angularUtils = require("../angular-utils");
var di = angularUtils.di;
var TokenRow = require("./TokenRow");
var AddCustomTokenForm = require("./AddCustomTokenForm");
var PropTypes = require("prop-types");

class TokenBalances extends React.Component {
  constructor() {
    super();
    this.state = {
      showAllTokens: false,
      showCustomTokenForm: false
    };

    this.toggleShowAllTokens = this.toggleShowAllTokens.bind(this);
    this.toggleShowCustomTokenForm = this.toggleShowCustomTokenForm.bind(this);
    this.addCustomToken = this.addCustomToken.bind(this);
    this.removeCustomToken = this.removeCustomToken.bind(this);
  }
  componentDidMount() {
    // we could probably achieve reference eq checks with immutable, but why bother
    this.unregister = di.rootScope.$watch(
      () => {
        if (!this.props.wallet) {
          return false;
        }
        return {
          tokenBalances: this.props.wallet.tokenObjs.map(token => {
            return {
              symbol: token.symbol,
              balance: token.balance
            };
          })
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
    return (
      <section className="token-balances">
        <h5 translate="sidebar_TokenBal">Token Balances:</h5>
        <table className="account-info">
          <tbody>
            {wallet.tokenObjs
              .filter(
                token =>
                  (token.balance != 0 && token.balance !== "loading") ||
                  token.type !== "default" ||
                  this.state.showAllTokens
              )
              .map(token => (
                <TokenRow
                  key={`${token.getSymbol()}-${token.type}`}
                  balance={token.getBalance()}
                  symbol={token.getSymbol()}
                  type={token.type}
                  onRemove={this.removeCustomToken}
                />
              ))}
          </tbody>
        </table>
        {!this.state.showAllTokens &&
          <a
            className="btn btn-default btn-sm"
            onClick={this.toggleShowAllTokens}
          >
            Show All Tokens
          </a>}
        {this.state.showAllTokens &&
          <a
            className="btn btn-default btn-sm"
            onClick={this.toggleShowAllTokens}
          >
            Hide Tokens
          </a>}
        {" "}
        <a
          className="btn btn-default btn-sm"
          onClick={this.toggleShowCustomTokenForm}
        >
          <span translate="SEND_custom" translate="SEND_custom">
            Add Custom Token
          </span>
        </a>
        {this.state.showCustomTokenForm &&
          <AddCustomTokenForm onSave={this.addCustomToken} />}
      </section>
    );
  }

  toggleShowAllTokens() {
    this.setState(state => {
      return {
        showAllTokens: !state.showAllTokens
      };
    });
  }

  toggleShowCustomTokenForm() {
    this.setState(state => {
      return {
        showCustomTokenForm: !state.showCustomTokenForm
      };
    });
  }

  addCustomToken(data) {
    var token = Object.assign({}, data, { type: "custom" });
    globalFuncs.saveTokenToLocal(token, data => {
      if (!data.error) {
        this.props.wallet.setTokens();
        this.setState({ showCustomTokenForm: false });
      } else {
        // FIXME could never happen
        angularUtils.findInScope(this, "notifier").danger(data.msg);
      }
    });
    di.rootScope.$apply();
  }

  removeCustomToken(symbol) {
    globalFuncs.removeTokenFromLocal(symbol, this.props.wallet.tokenObjs);
    di.rootScope.$apply();
  }
}

TokenBalances.propTypes = {
  wallet: PropTypes.object
};

module.exports = angularUtils.translate(TokenBalances);
