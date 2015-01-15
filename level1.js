var bloxorz = require('./bloxorz.js')

var levelString = '--------ooooooo---\n'
                + '--oooo--ooo--oo---\n'
                + '--ooooooooo--oooo-\n'
                + '--oSoo-------ooGo-\n'
                + '--oooo-------oooo-\n'
                + '--------------ooo-';
var answer = bloxorz.solve(levelString);
console.log(answer);