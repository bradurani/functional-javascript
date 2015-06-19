 var Immutable = require('immutable');
 var Seq = Immutable.Seq;

 module.exports.solve = function(levelString) {
 	var levelArray = buildLevelArray(levelString);
 	var startPos = findChar(levelArray, 'S');
 	var goalPos = findChar(levelArray, 'G');
 	
 	var isOnBoardFunc = isOnBoard(levelArray); 
 	var isGoalFunc = isGoal(goalPos);

 	var startBlock = block(startPos, startPos);
 	var startingMoveLists = Immutable.List([Immutable.List([move(null, startBlock)])]);

 	var sequence = flattenTreeLazy(isOnBoardFunc, startingMoveLists);
 	var solutions = sequence.filter(isGoalFunc, sequence);

 	var solution = solutions.first();

 	if(!solution){
 		throw new Error('No solution found');
 	}

 	return solution.map(function(move){ return move.direction; }).reverse();
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
		if(levelArray.length === 0 
		 || levelArray[0].count() === 0
		 || pos.row < 0
		 || pos.row >= levelArray.length
		 || pos.column < 0 
		 || pos.column >= levelArray[0].count()) {
			return false
		}
		return levelArray[pos.row].get(pos.column) != '-';
	}
}

function infiniteBoard() {
	return function(pos) { return true; }
}

function isGoal(goalPos) {
	return function(move) {
		var block = move.first().block
		result = posEquals(block.a, goalPos) && isStanding(block);
		return result;
	}
}

function posEquals(a, b) {
	return a.row === b.row && a.column === b.column;
}

function blockEquals(blockA, blockB) {
	var b = posEquals(blockA.a, blockB.a) && posEquals(blockA.b, blockB.b);
	return b; 
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
	return Immutable.List([
			move('left', moveLeft(block)),
			move('right', moveRight(block)),
			move('up', moveUp(block)),
			move('down', moveDown(block))]);
}

function legalMoves(block, isOnBoardFunc) {
	return moves(block).filter(function(move){
		return isOnBoardFunc(move.block.a) && isOnBoardFunc(move.block.b);
	});
}

function legalNewNextMovesList(moveList, isOnBoardFunc) {
	var headBlock = moveList.first().block;
	var possibleMoves = legalMoves(headBlock, isOnBoardFunc);
	var alreadyVisitedBlocks = moveList.map(function(move){ 
		return move.block; 
	});
	var newPossibleMoves = movesForBlocksThatHaventBeenVisited(possibleMoves, alreadyVisitedBlocks)
	return newPossibleMoves.map(function(move) {
		return moveList.unshift(move);
	});
}

function movesForBlocksThatHaventBeenVisited(possibleMoves, alreadyVisitedBlocks){
	return possibleMoves.filter(function(move){
		return alreadyVisitedBlocks.every(function(block) {
			return !blockEquals(move.block, block);
		});
	});
}

function flattenTreeLazy(isOnBoardFunc, moveLists){
  return moveLists.isEmpty() ? moveLists : Seq(moveLists).concat(Seq([
      moveLists.flatMap(function(node){
        console.log('flat mapping');
        return legalNewNextMovesList(node, isOnBoardFunc); 
      })
    ]).flatMap(flattenTreeLazy.bind(null, isOnBoardFunc))
  );
}


//######### SETUP ###########

 function buildLevelArray(levelString) {
 	return levelString.split(/\r?\n/).map(function(row){
 		return Immutable.List(row).filter(function(char) {
 			return char.match(/-|\w/);
 		});
 	});
 }

 function findChar(levelArray, character) {
 	function iter(rowNum, columnNum) {
 		if(rowNum >= levelArray.length) {
 			throw new Error('char not found');
 		}
 		var row = levelArray[rowNum];
 		if(columnNum >= row.count()) {
 			return iter(++rowNum, 0);
 		}
 		var s = row.get(columnNum);
 		if(s === character) {
 			return pos(rowNum, columnNum);
 		}
 		return iter(rowNum, ++columnNum);
 	}
 	return iter(0,0);
 }
