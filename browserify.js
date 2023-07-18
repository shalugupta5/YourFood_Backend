// const browserify = require('browserify');

// // Resolve 'child_process' dependency
// browserify().require('child_process');

// // Resolve 'fs' dependency
// browserify().require('fs');

// // Resolve 'dns' dependency
// browserify().require('dns');

// // Resolve 'net' dependency
// browserify().require('net');

// // Resolve 'tls' dependency
// browserify().require('tls');


const process = {
    env: { DEBUG: undefined },
  };
  
  module.exports = process;
  