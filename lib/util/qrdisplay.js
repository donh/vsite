const qrImage = require('qr-image');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.uportQRDisplay = undefined;
exports.getQRDataURI = undefined;
exports.openQr = undefined;
exports.closeQr = undefined;
function interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const qrImage2 = interopRequireDefault(qrImage);

/**  @module uport-connect/util/qrdisplay
 *  @description
 *  A set of QR utility functions and default displays to use with Connect.
 */

/**
 *  Given a string of data it returns a image URI which is a QR code. An image
 *  URI can be displayed in a img html tag by setting the src attrbiute to the
 *  the image URI.
 *
 *  @param    {String}     data      data string, typically a uPort URI
 *  @return   {String}               image URI
 */
const getQRDataURI = function getQRDataURI(data) {
  const pngBuffer = qrImage2.default.imageSync(data, { type: 'png' });
  return `data:image/png;charset=utf-8;base64, ${pngBuffer.toString('base64')}`;
};

/**
 *  A html pop over QR display template
 *
 *  @param    {Object}     args
 *  @param    {String}     args.qrImageUri    a image URI for the QR code
 *  @return   {String}     a string of html
 */
const uportQRDisplay = function uportQRDisplay(ref) {
  const qrImageUri = ref.qrImageUri;
  let style = 'position:fixed; top:0; width:100%; height:100%; z-index:100;';
  style = `${style} background-color:rgba(0,0,0,0.5); text-align:center;`;
  let str = `\n  <div id="uport-qr" style=${style}>`;
  str = `${str}\n      <img style="z-index:102;" src="${qrImageUri}" />`;
  str = `${str}\n      <p id="uport-qr-text"> Please scan with uPort app </p>`;
  str = `${str}\n      <button id="uport-qr-cancel"> Cancel </button>\n    </div>\n  </div>\n`;
  return str;
};

/**
 *  A default QR pop over display, which injects the neccessary html
 *
 *  @param    {String}     data      data which is displayed in QR code
 *  @param    {Function}   cancel    a function called when the cancel button is clicked
 */
const openQr = function openQr(data, cancel) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'uport-wrapper');
  wrapper.innerHTML = uportQRDisplay({
    qrImageUri: getQRDataURI(data),
    cancel
  });
  const cancelClick = function cancelClick() {
    document.getElementById('uport-qr-text').innerHTML = 'Cancelling';
    cancel();
  };
  document.body.appendChild(wrapper);
  document.getElementById('uport-qr-cancel').addEventListener('click', cancelClick);
};

/**
 *  Closes the default QR pop over
 */
const closeQr = function closeQr() {
  const uportWrapper = document.getElementById('uport-wrapper');
  document.body.removeChild(uportWrapper);
};

exports.closeQr = closeQr;
exports.openQr = openQr;
exports.getQRDataURI = getQRDataURI;
exports.uportQRDisplay = uportQRDisplay;
