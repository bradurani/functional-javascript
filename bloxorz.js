 var _ = require('mori');

 function solve(levelString) {
 	var levelArray = buildLevelArray(levelString);
 	var startPos = findChar(levelArray, 'S');
 	var goalPos = findChar(levelArray, 'G');
 	
 	var isOnBoardFunc = isOnBoard(levelArray); 
 	var isGoalFunc = isGoal(goalPos);

 	var startBlock = block(startPos, startPos);
 	var startingMoveList = _.list(_.list(move(null, startBlock)));

 	console.log(legalNewNextMovesList(startingMoveList, isOnBoardFunc));
 }

//######## DATA TYPES ######
function pos(row, column){
	return { row: row, column: column };
}

function block(posA, posB){
	return { a: posA, b: posB };
}

function move(direction, newBlock) {
	return { direction: direction, block: newBlock };
}

//######### Board Functions ########

function isOnBoard(levelArray) {
	return function(pos) {
		if(_.count(levelArray) === 0 
		 || _.count(_.first(levelArray)) === 0
		 || pos.row < 0
		 || pos.row >= _.count(levelArray)
		 || pos.column < 0 
		 || pos.column >= _.count(_.first(levelArray))) {
			return false
		}
		return _.nth(_.nth(levelArray, pos.row), pos.column) != '-';
	}
}

function infiniteBoard() {
	return function(pos) { return true; }
}

function isGoal(goalPos) {
	return function(block) {
		return posEquals(block.a, goalPos) && isStanding(block);
	}
}

function posEquals(a, b) {
	return a.row === b.row && a.column === b.column;
}

function left(p) {
	return pos(p.row, p.column - 1);
}

function right(p) {
	return pos(p.row, p.column + 1);
}

function up(p) {
	return pos(p.row - 1, p.column);
}

function down(p) {
	return pos(p.row + 1, p.column);
}

//######## BLOCK FUNCTIONS ######

function isStanding(b) {
	return posEquals(b.a, b.b);
}

function isLyingVertically(b) {
	return b.a.row < b.b.row
}

function isLyingHorizontally(b) {
	return b.a.column < b.b.column; 
}

function moveLeft(b) {
	if(isLyingHorizontally(b)) {
		return block( left(b.a), left(left(b.b)) );
	} else if (isLyingVertically(b)) {
		return block( left(b.a), left(b.b) );
	} else if (isStanding(b)) {
		return block( left(left(b.a)), left(b.b) );
	}
}

function moveRight(b) {
	if(isLyingHorizontally(b)) {
		return block( right(right(b.a)), right(b.b) );
	} else if (isLyingVertically(b)) {
		return block( right(b.a), right(b.b) );
	} else if (isStanding(b)) {
		return block( right(b.a), right(right(b.b)) );
	}
}

function moveUp(b) {
	if(isLyingHorizontally(b)) {
		return block( up(b.a), up(b.b) );
	} else if (isLyingVertically(b)) {
		return block( up(b.a), up(up(b.b)) );
	} else if (isStanding(b)) {
		return block( up(up(b.a)), up(b.b) );
	}
}

function moveDown(b) {
	if(isLyingHorizontally(b)) {
		return block( down(b.a), down(b.b) );
	} else if (isLyingVertically(b)) {
		return block( down(down(b.a)), down(b.b) );
	} else if (isStanding(b)) {
		return block( down(b.a), down(down(b.b)) );
	}
}

//######### SOLVER ########
function moves(block) {
	return _.list(
			move('left', moveLeft(block)),
			move('right', moveRight(block)),
			move('up', moveUp(block)),
			move('down', moveDown(block)));
}

function legalMoves(block, isOnBoardFunc) {
	return _.filter(function(move){
		return isOnBoardFunc(move.block.a) && isOnBoardFunc(move.block.b);
	},moves(block))
}

function legalNewNextMovesList(moveList, isOnBoardFunc) {
	var possibleMoves = legalMoves(_.first(moveList).block, isOnBoardFunc);
	var alreadyVisitedBlocks = _.map(function(move){ 
		return move.block; 
	}, moveList);
	var newPossibleMoves = _.filter(function(move){
		return _.some(function(block) {
			return _.equals(move.block, block);
		}, alreadyVisitedBlocks);
	}, possibleMoves);
	return _.map(function(move) {
		return _.cons(move, moveList);
	}, newPossibleMoves);
}





//######### SETUP ###########

 function buildLevelArray(levelString) {
 	return _.map(function(row){
 		return _.filter(function(char) {
 			return char.match(/-|\w/);
 		}, _.seq(row));
 	}, levelString.split(/\r?\n/));
 }

 function findChar(levelArray, character) {
 	function iter(rowNum, columnNum) {
 		if(rowNum >= _.count(levelArray)) {
 			throw new Error('char not found');
 		}
 		var row = _.nth(levelArray, rowNum)
 		if(columnNum >= _.count(row)) {
 			return findChar(++rowNum, 0);
 		}
 		var s = _.nth(row, columnNum);
 		if(s === character) {
 			return pos(rowNum, columnNum);
 		}
 		return iter(rowNum, ++columnNum);

 	}
 	return iter(0,0);
 }


levelString =  '--SG--\n'
	         + '--oo--\n'
	         + '--oo--';

solve(levelString);

