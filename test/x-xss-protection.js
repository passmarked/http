const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked  = require('passmarked');
const testFunc    = require('../lib/rules/x-xss-protection');

describe('x-xss-protection', function() {

  it('Should not return any errors if the HAR is undefined', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, undefined, '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();
      if(!rules)
        assert.fail('No rules set with incorrect headers');

      if(rules.length > 0)
        assert.fail('Was not expecting any errors');

      done()

    });

  });

  it('Should not return any errors if the HAR is null', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, null, '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();
      if(!rules)
        assert.fail('No rules set with incorrect headers');

      if(rules.length > 0)
        assert.fail('Was not expecting any errors');

      done()

    });

  });

  it('Should not return any errors if the HAR is blank', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, {}, '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();
      if(!rules)
        assert.fail('No rules set with incorrect headers');

      if(rules.length > 0)
        assert.fail('Was not expecting any errors');

      done()

    });

  });

  it('Should return a error if the content-type is wrongly configured', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, require('../samples/headers.wrong.json'), '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();
      if(!rules)
        assert.fail('No rules set with incorrect headers');

      var rule = _.find(rules, function(rule) {

        return rule.key === 'xss.incorrect';

      });

      if(!rule)
        assert.fail('Was expecting a error');

      done()

    });

  });

  it('Should not return a error if the header is correctly configured', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, require('../samples/headers.ok.json'), '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();
      if(!rules)
        assert.fail('No rules set with incorrect headers');

      if(rules.length > 0)
        assert.fail('Was not expecting any errors');

      done()

    });

  });

  it('Should return a error if the header was missing', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, require('../samples/headers.none.json'), '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules();

      var rule = _.find(rules, function(rule) {

        return rule.key === 'xss.missing';

      });

      if(!rule)
        assert.fail('Was expecting a error');

      done()

    });

  });

});