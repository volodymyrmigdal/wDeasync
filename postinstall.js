#!/usr/bin/env node

let cp = require('child_process');

cp.execFile( process.execPath, [ 'quick-test.js' ], function( err, stdout, stderr ) 
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

function build() 
{
	let pnd = cp.spawn( 'npm', [ 'run', 'node-pre-gyp-build' ], { stdio: 'inherit', cwd : __dirname })
	
	pnd.on( 'exit', function( exitCode ) 
	{
		if( exitCode === 0 )
		return;
		console.error( 'Build failed' );
		return process.exit( exitCode );
	});
}