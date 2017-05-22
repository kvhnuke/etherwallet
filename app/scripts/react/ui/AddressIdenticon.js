"use strict";
var PropTypes = require("prop-types");

function AddressIdenticon(props) {
  let style = {};
  if (Validator.isValidAddress(props.address)) {
    style.backgroundImage = `url(${globalFuncs.getBlockie(props.address)})`;
  }
  return (
    <div
      className="addressIdenticon med float"
      style={style}
      title="Address Indenticon"
    />
  );
}

AddressIdenticon.propTypes = {
  address: PropTypes.string.isRequired
};

module.exports = AddressIdenticon;
