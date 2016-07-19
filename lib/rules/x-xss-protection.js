const _ = require('underscore');

/**
*
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

      return ((item || {}).name || '').toLowerCase() === 'x-xss-protection';

    });

    // if we found the header
    if(!header) {

      // the header was not found so warn
      payload.addRule({

          message:      'X-XSS-Protection header not found',
          type:         'warning',
          key:          'xss.missing'

        }, {

          display:      'text',
          header:       'Required Secure HTTP Header',
          message:      'Need to add header $: $',
          identifiers:  [ 'X-XSS-Protection', '1; mode=block' ]

        });

    } else {

      // must have the following params
      var textBlocks  = [ '1', 'mode=block' ];
      var value       = (header.value || '').toLowerCase().replace(/\s+/gi, '');

      // the flag to track
      if(value !== textBlocks.join(';')) {

        // the header has a wrong value set - error
        payload.addRule({

            message:      'X-XSS-Protection has an incorrect value',
            type:         'error',
            key:          'xss.incorrect'
          
          }, {

            display:      'text',
            header:       'Required Secure HTTP Header',
            message:      'Need to set $ header to $',
            identifiers:  [ 'X-Content-Type-Options', textBlocks.join(';') ]
          
          });

      }

    }

    fn(null);

  });

};
