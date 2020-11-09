#!/usr/bin/env node
( function _postinstall_() {
  
  'use strict';
  
  let ChildProcess = require( 'child_process' );

  ChildProcess.execFile( process.execPath, [ 'quick-test.js' ], ( err, stdout, stderr ) =>
  {
    if ( err || stderr ) 
    {
      console.log( 'Problem with the binary; manual build incoming' );
      console.log( 'stdout=' + stdout );
      console.log( 'err=' + err );
      build();
    }
    else 
    {
      console.log( 'Binary is fine; exiting' );
    }
  });
  
  /* */

  function build() 
  {
    let o = 
    { 
      stdio: 'inherit', 
      cwd : __dirname 
    }
    
    let pnd = ChildProcess.spawn( 'npm', [ 'run', 'node-pre-gyp-build' ], o )
    
    pnd.on( 'exit', function( exitCode ) 
    {
      if( exitCode === 0 )
      return;
      console.error( 'Build failed' );
      return process.exit( exitCode );
    });
  }
})();
