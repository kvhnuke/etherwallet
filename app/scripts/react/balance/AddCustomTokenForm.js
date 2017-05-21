var angularUtils = require("../angular-utils");

class AddCustomTokenForm extends React.Component {
  constructor() {
    super();
    this.state = {
      contractAdd: "",
      symbol: "",
      decimals: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  render() {
    return (
      <div className="custom-token-fields">
        <label translate="TOKEN_Addr">Address:</label>
        <input
          className={
            "form-control input-sm " +
              (Validator.isValidAddress(this.state.contractAdd)
                ? "is-valid"
                : "is-invalid")
          }
          type="text"
          name="contractAdd"
          value={this.state.contractAdd}
          onChange={this.onFieldChange}
        />
        <label translate="TOKEN_Symbol">Token Symbol:</label>
        <input
          className={
            "form-control input-sm " +
              (this.state.symbol !== "" ? "is-valid" : "is-invalid")
          }
          type="text"
          name="symbol"
          value={this.state.symbol}
          onChange={this.onFieldChange}
        />
        <label translate="TOKEN_Dec">Decimals:</label>
        <input
          className={
            "form-control input-sm " +
              (Validator.isPositiveNumber(this.state.decimals)
                ? "is-valid"
                : "is-invalid")
          }
          type="text"
          name="decimals"
          value={this.state.decimals}
          onChange={this.onFieldChange}
        />
        <div
          className="btn btn-primary btn-sm"
          onClick={this.onSave}
          translate="x_Save"
        >
          Save
        </div>
      </div>
    );
  }

  onFieldChange(e) {
    var name = e.target.name;
    var value = e.target.value;
    this.setState(state => {
      var newState = Object.assign({}, state);
      newState[name] = value;
      return newState;
    });
  }

  onSave() {
    this.props.onSave(this.state);
  }
}

module.exports = angularUtils.translate(AddCustomTokenForm);
