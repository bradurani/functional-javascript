//level 189493
var bloxorz = require('./bloxorz.js')

var levelString =    '--------oooo----\n'
                   + '--------oooo----\n'
                   + 'ooo-----o--oooo-\n'
                   + 'oSooooooo---ooo-\n'
                   + 'ooo----ooG--ooo-\n'
                   + 'ooo----ooo--ooo-\n'
                   + '-oo----o--------\n'
                   + '--oooooo--------\n'
                   + '----------------\n'
                   + '----------------'

var answer = bloxorz.solve(levelString);
console.log(answer);
