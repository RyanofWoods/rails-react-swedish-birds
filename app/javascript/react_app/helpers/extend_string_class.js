/* eslint-disable no-extend-native */

String.prototype.capitalize = function stringCapitalize() {
  switch (this.length) {
    case 0:
      return '';
    case 1:
      return this[0].toUpperCase();
    default:
      return this[0].toUpperCase() + this.slice(1).toLowerCase();
  }
};

String.prototype.dashify = function stringDashify() {
  return this.toLowerCase().replace(/ /, '-');
};

String.prototype.hashify = function stringHashify() {
  return `#${this.dashify()}`;
};
