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

      return ((item || {}).name || '').toLowerCase() === 'x-frame-options'
              || ((item || {}).name || '').toLowerCase() === 'frame-options';

    });

    // did we find the header ?
    if(!header) {

      payload.addRule({

        message:      'X-Frame-Options header not found',
        type:         'warning',
        key:          'frameoptions.missing'

      }, {
        
        display:        'text',
        header:         'Required Secure HTTP Header',
        message:        'Need to add header $: $',
        identifiers:    [ 'X-Frame-Options', 'DENY or SAMEORIGIN or ALLOW-FROM' ]

      });

    } else {

      // allowed items we are expected
      var allowedContentTypes = [ 'deny', 'sameorigin', 'allow-from' ];
      var value       = (header.value || '').toLowerCase().replace(/\s+/gi, '');

      // the flag to track
      if(allowedContentTypes.indexOf(value) === -1) {

        // add the rule
        payload.addRule({
          
          message:      'X-Frame-Options has an incorrect value',
          type:         'error',
          key:          'frameoptions.incorrect'

        }, {
          
          display:      'text',
          header:       'Required Secure HTTP Header',
          message:      'Need to set $ header to $',
          identifiers:  [ 'X-Frame-Options', 'DENY or SAMEORIGIN or ALLOW-FROM' ]

        });

      }

    }

    // finish
    fn(null);

  });

};
