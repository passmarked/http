const assert      = require('assert');
const _           = require('underscore');
const fs          = require('fs');
const passmarked  = require('passmarked');
const testFunc    = require('../lib/rules/x-aspnet-version');

describe('x-aspnet-version', function() {

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

  it('should set an error if the header is present', function(done) {

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

        return rule.key === 'aspnet';

      });

      if(!rule)
        assert.fail('No error is set when server header has versioning');

      done()

    });

  });

  it('should not set anything if the header is absent', function(done) {

    var payload = passmarked.createPayload({

      url: 'http://example.com'

    }, require('../samples/headers.none.json'), '<p>test</p>');

    testFunc(payload, function(err) {

      if(err)
        assert.fail('Error loading rule function');

      var rules = payload.getRules()

      if(rules.length > 0)
        assert.fail('No rules should be set when the header is absent');

      done()

    });

  });

});