//level 189493
var bloxorz = require('./bloxorz.js')

var levelString =    '--------oooo----\n'
                   + '--------oooo----\n'
                   + 'ooo-----o--oooo-\n'
                   + 'ooooooooo---oGo-\n'
                   + 'ooo----ooS--ooo-\n'
                   + 'ooo----ooo--ooo-\n'
                   + '-ooo---o--------\n'
                   + '--oooooo--------\n'
                   + '----------------\n'
                   + '----------------'

var answer = bloxorz.solve(levelString);
console.log(answer);
