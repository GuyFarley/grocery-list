'use strict';

let base64 = require('base-64');

// what we want:  Basic asndfglabsdjldfvasdfj
// those characters specifically are our encoded username:password

let encodedAuthStr = `Basic ${base64.encode('testerEditor2:newpassword2')}`;

console.log('encodedAuthStr:', encodedAuthStr);