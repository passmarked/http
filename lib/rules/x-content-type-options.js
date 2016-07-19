const _ = require('underscore');

/**
* Checks if the frame options where set that will stop users
* users from iframing websites is per developers preferences.
**/
module.exports = exports = function(payload, fn) {

  // get the response from our check
  payload.getResponse(function(err, response) {

    // check if it's a error
    if(err) {

      // output error
      payload.error('Something went wrong while trying to find the response', err);

      // done
      return fn(null);

    }

    // sanity check
    if(!(response || {}).headers) 
      return fn(null);
    if(Array.isArray( (response || {}).headers ) === false) 
      return fn(null);

    // find the header to check
    var header = _.find(response.headers || [], function(item) {

      return ((item || {}).name || '').toLowerCase() === 'x-content-type-options' || 
                ((item || {}).name || '').toLowerCase() === 'content-type-options';

    });

    // did we find the header ?
    if(!header) {

      payload.addRule({
        
        message:        'X-Content-Type-Options header not found',
        type:           'warning',
        key:            'contenttype.missing'

      }, {
        
        display:        'text',
        header:         'Required Sercure HTTP Header',
        message:        'Need to add header $: $',
        identifiers:    [ 'X-Content-Type-Options', 'nosniff' ]

      });

    } else {

      // allowed items we are expected
      var value       = (header.value || '').toLowerCase().replace(/\s+/gi, '');

      // the flag to track
      if(value !== 'nosniff') {

        // add the rule
        payload.addRule({

          message:      'X-Content-Type-Options has an incorrect value',
          type:         'error',
          key:          'contenttype.incorrect'

        }, {
          
          display:      'text',
          header:       'Required Secure HTTP Header',
          message:      'Need to set $ header to $',
          identifiers:  [ 'X-Content-Type-Options', 'nosniff' ]

        });

      }

    }

    // finish
    fn(null);

  });

};

