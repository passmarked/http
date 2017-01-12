const _ = require('underscore');

/**
* Server header are in the form of server/version
* For this rule we need to make sure that there is no version set
**/
module.exports = exports = function(payload, fn) {

  // get the response from our payload
  payload.getResponse(function(err, response) {

    // check for a error
    if(err) {

      // output error
      payload.error('Something went wrong while trying to find the response', err);

      // finish
      return fn(null);

    }

    // sanity check
    if(!(response || {}).headers) 
      return fn(null);
    if(Array.isArray( (response || {}).headers ) === false) 
      return fn(null);

    // find the header to check
    var header = _.find(response.headers || [], function(item) {

      return ((item || {}).name || '').toLowerCase() === 'server';

    });

    // if we found the header
    if(!header)
      return fn(null);

    // create the value
    var value           = header.value || '';

    // remove any text between brackets
    var cleanedValue    = value.replace(/\(.*?\)/gi, '');

    // split the values
    var values          = value.split('/');

    // are there more sections
    if( cleanedValue.split('/').length <= 1 ) {

      // skip
      return fn(null);

    }

    // add the rule
    payload.addRule({

        message:  'Server header has versioning',
        type:     'error',
        key:      'versioning'

    }, {

      display:        'text',
      header:         'HTTP Header Server should not have versioning',
      message:        'Change $ to $',
      identifiers:    [ value, values.slice(0, values.length-1).join('/') ]
    
    });

    // finish
    fn(null);

  });

};
