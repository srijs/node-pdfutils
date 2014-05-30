var Stream = require('stream').Stream;
var util = require('util');
var fs = require('fs');

var bindings;
try {
	bindings = require('../build/Debug/pdfutils');
} catch (e) { try {
	bindings = require('../build/Release/pdfutils');
} catch (e1) {
	throw e1;
}}



/* PDFDocument*/
util.inherits(bindings.PDFDocument, Array);

module.exports = function pdfutils(source, cb) {
	return new bindings.PDFDocument(source, cb);
};
module.exports.PDFDocument = bindings.PDFDocument;
module.exports.pdfutils = module.exports;
