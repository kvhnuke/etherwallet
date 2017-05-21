var filters = require("../angular-utils").di.filters;

module.exports = class TokenRow extends React.Component {
  constructor() {
    super();
    this.state = {
      showLongBalance: false
    };
    this.toggleShowLongBalance = this.toggleShowLongBalance.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  render() {
    var balance = this.props.balance;
    var symbol = this.props.symbol;
    var type = this.props.type;
    return (
      <tr>
        <td
          className="mono wrap point"
          title={`${balance} (Double-Click)`}
          onDoubleClick={this.toggleShowLongBalance}
        >
          {type !== "default"
            ? <img
                src="images/icon-remove.svg"
                className="token-remove"
                title="Remove Token"
                onClick={this.onRemove}
              />
            : null}
          <span>
            {this.state.showLongBalance ? balance : filters.number(balance)}
          </span>
        </td>
        <td>{symbol}</td>
      </tr>
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

  onRemove() {
    this.props.onRemove(this.props.symbol);
  }
};
