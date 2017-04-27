var expect = require('chai').expect;
var manifesto = require('../dist/server/manifesto');
var should = require('chai').should();
var manifests = require('./fixtures/manifests');
require('./shared');

var manifest, sequence, canvas;

describe('#loadsPres3PDF', function() {
    it('loads successfully', function (done) {
        manifesto.loadManifest(manifests.pres33d).then(function(data) {
            manifest = manifesto.create(data);
            done();
        });
    });
});

describe('#hasSequence', function() {
    it('has a sequence', function () {
        sequence = manifest.getSequenceByIndex(0);
        expect(sequence).to.exist;
    });
});

describe('#hasCanvas', function() {
    it('has a canvas', function () {
        canvas = sequence.getCanvases()[0];
        canvas.id.should.equal("http://tomcrane.github.io/scratch/manifests/3/canvas/3d");
    });
});

describe('#has3D', function() {
    it('canvas has 3d', function () {
        var content = canvas.getContent();
        var annotation = content[0];
        expect(annotation).to.exist;
        var body = annotation.getBody()[0];
        expect(body).to.exist;
        expect(body.id).to.equal("http://files.universalviewer.io/manifests/nelis/animal-skull/animal-skull.json");
    });
});