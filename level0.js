var bloxorz = require('./bloxorz.js')

var levelString = '--SG--\n'
	            + '--oo--\n'
	            + '--oo--';

var answer = bloxorz.solve(levelString);
console.log(answer);