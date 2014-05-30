var assert = require("should")

var pdfutils = require("../lib/pdfutils.js");
var PDFDocument = pdfutils.PDFDocument;
var PDFPage = pdfutils.PDFPage;
var simpleTextPath = __dirname + "/simpleText.pdf"

describe('PDF Utils', function(){
	it('should be a function', function(){
		pdfutils.should.be.a.Function;
		pdfutils.pdfutils.should.equal(pdfutils);
		pdfutils.PDFDocument.should.be.a.Function;
	});
	it('should create PDFDocument', function() {
		pdfutils().should.be.instanceof(PDFDocument);
	});
	it('should load PDF synchronous by factory', function() {
		var doc = pdfutils(simpleTextPath);
		doc.should.be.instanceof(PDFDocument);
	});
	it('should load PDF asynchronous by factory', function(done) {
		var doc2 = pdfutils(simpleTextPath, function(err, doc) {
			assert.equal(null, err);
			assert.equal(doc2, doc);
			doc.should.be.instanceof(PDFDocument);
			done();
		});
	});
});

describe('PDFDocument', function(){
	it('synchronous', function() {
		var doc = new PDFDocument(simpleTextPath);
		doc.should.be.instanceof(PDFDocument);
	});
	it('asynchronous', function(done) {
		var doc2 = new PDFDocument(simpleTextPath, function(err, doc) {
			assert.equal(null, err);
			assert.equal(doc2, doc);
			doc.should.be.instanceof(PDFDocument);
			done();
		});
	});
	it('#length', function() {
		var doc = new PDFDocument(simpleTextPath);
		assert.equal(1, doc.length);
	});
	it('#author', function() {
		var doc = new PDFDocument(simpleTextPath);
		doc.should.have.property("author");
	});
	it('#creationDate', function() {
		var doc = new PDFDocument(simpleTextPath);
		doc.should.have.property("creationDate");
		doc.creationDate.should.be.a.Number;
	});
	it('#push', function() {
		var doc = new PDFDocument(simpleTextPath);
		doc.push.should.be.a.Function;
		doc.push(doc[0]);
		assert.equal(2, doc.length);
	});
});

describe('PDFPage', function() {
	var page = new PDFDocument(simpleTextPath)[0];
	it('should be PDFPage', function() {
		page.should.be.instanceof(PDFPage);
	})
	it('#index', function() {
		page.should.have.property('index', 0);
	})
})
