'use strict';

var _value, _value2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var pt = require('prop-types');

var Dial = function (_React$Component) {
  _inherits(Dial, _React$Component);

  function Dial() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dial);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dial.__proto__ || Object.getPrototypeOf(Dial)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'handleChange', {
      enumerable: true,
      writable: true,
      value: function value(e) {
        var value = unUnits(e.target.value); // strip any formatting from the value and convert it to a number
      }
    }), Object.defineProperty(_this, 'handleKeyDown', {
      enumerable: true,
      writable: true,
      value: function value(e) {

        var key = e.key;
        var newValue = unUnits(_this.props.value);

        if (key === 'ArrowUp') _this.triggerUpdate(newValue + 1);else if (key === 'ArrowDown') _this.triggerUpdate(newValue - 1);
      }
    }), Object.defineProperty(_this, 'triggerUpdate', {
      enumerable: true,
      writable: true,
      value: function value(newValue) {
        //common hook for all sources of change to send new values to
        if (newValue >= _this.props.min && newValue <= _this.props.max) {
          _this.props.onChange(newValue);
        }
      }
    }), Object.defineProperty(_this, 'updateCanvas', {
      enumerable: true,
      writable: true,
      value: function value() {

        // get a reference to the canvas context
        var canvas = _this.refs.canvas.getContext('2d');

        // calculate values we'll need later
        var lineWidth = _this.props.width * _this.props.thickness / 10;
        var centerxy = _this.props.width / 2;
        var radius = _this.props.width / 2 - lineWidth / 2;
        var anticlockwise = _this.props.rotation !== 'clockwise';

        // calculate arc angles
        var offset = _this.props.angleOffset;
        var arc = _this.props.angleArc;
        var scale = _this.props.max - _this.props.min; //max value normalized to be starting-value agnostic
        var value = unUnits(_this.props.value) - _this.props.min; // normalized current value
        var fillFraction = value / scale;

        var startAngle = radians(offset);
        var endAngle = radians(offset + arc);
        var readingAngle = radians(offset + arc * fillFraction);

        // canvas settings
        canvas.lineWidth = lineWidth;
        canvas.lineCap = _this.props.lineCap;

        // clear the canvas
        canvas.clearRect(0, 0, _this.props.width, _this.props.width);

        // render the dial background (grey arc)
        if (_this.props.bgColor !== "none") {
          canvas.beginPath();
          canvas.strokeStyle = _this.props.bgColor;
          canvas.arc(centerxy, centerxy, radius, startAngle, endAngle, anticlockwise);
          canvas.stroke();
        }

        canvas.beginPath();
        canvas.strokeStyle = _this.props.fgColor;
        canvas.arc(centerxy, centerxy, radius, startAngle, readingAngle, anticlockwise);
        canvas.stroke();
      }
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dial, [{
    key: 'render',


    // return the dom structure
    value: function render() {

      // "smart defaults"
      var fontSize = this.props.fontSize || this.props.width * 0.3;
      var textColor = this.props.textColor || this.props.fgColor || "#0fb6ff";

      var divStyles = {
        position: 'relative', // relative positioning to support absolutely positioned children
        width: '' + this.props.width,
        height: '' + this.props.width, // always square
        display: 'flex' // allow for textbox to be easily centered
      };

      var canvasStyles = {
        position: 'absolute' // remove canvas from "flow" so input can be centered
      };

      var inputStyles = {
        margin: 'auto',
        textAlign: 'center',
        zIndex: '1', // allow textbox to get focus
        fontFamily: this.props.font, // pass through font settings
        fontWeight: this.props.fontWeight,
        borderStyle: 'none', // "invisible text box"
        fontSize: fontSize,
        width: String(this.props.value).length + 'ch',
        color: textColor,
        backgroundColor: 'transparent'
      };

      return React.createElement(
        'div',
        { style: divStyles, onKeyDown: this.handleKeyDown },
        React.createElement('canvas', { style: canvasStyles, width: this.props.width, height: this.props.width, ref: 'canvas' }),
        React.createElement('input', { style: inputStyles, value: this.props.value, onChange: this.handleChange, readOnly: this.props.readOnly })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateCanvas();
    }
  }]);

  return Dial;
}(React.Component);

Object.defineProperty(Dial, 'propTypes', {
  enumerable: true,
  writable: true,
  value: (_value = {
    min: pt.number,
    max: pt.number,
    value: pt.oneOfType([pt.string, pt.number]), // value may be a string containing units
    angleOffset: pt.number,
    angleArc: pt.number,
    readOnly: pt.bool,
    rotation: pt.string,
    thickness: pt.number,
    lineCap: pt.string,
    width: pt.number,
    fgColor: pt.string,
    bgColor: pt.string,
    inputColor: pt.string,
    fontFamily: pt.string,
    fontWeight: pt.oneOfType([pt.string, pt.number]),
    fontSize: pt.oneOfType([pt.string, pt.number])
  }, _defineProperty(_value, 'readOnly', pt.bool), _defineProperty(_value, 'textColor', pt.string), _defineProperty(_value, 'onChange', pt.func), _value)
});
Object.defineProperty(Dial, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: (_value2 = {
    min: 0,
    max: 100,
    value: 0,
    angleOffset: 0,
    angleArc: 360,
    readOnly: false,
    rotation: 'clockwise',
    thickness: 1,
    lineCap: 'butt',
    width: 200,
    fgColor: "#0fb6ff",
    bgColor: "#eee",
    inputColor: "#0fb6ff",
    font: 'Sans-Serif',
    fontWeight: '400',
    fontSize: null }, _defineProperty(_value2, 'readOnly', false), _defineProperty(_value2, 'textColor', null), _defineProperty(_value2, 'onChange', function onChange(v) {}), _value2)
});


module.exports = Dial;

function radians(degrees) {
  return degrees * Math.PI / 180;
}

function degrees(radians) {
  return radians * 180 / Math.PI;
}

function unUnits(s) {
  // possible inputs: 0, 1, "0", "1", undefined, NaN
  if (s) return parseFloat(s); // handle first four cases
  else return 0; // return 0 for falsey inputs
}