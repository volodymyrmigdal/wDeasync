( function _QuickTest_() {
  
  let assert = require( 'assert' );
  let deasync = require('./index.js')

  let ret;
  setTimeout( () => 
  {
    ret = 'pass'
  }, 100 );
  while ( ret === undefined ) 
  deasync.sleep( 10 );
  assert.strictEqual( ret, 'pass' );
})();