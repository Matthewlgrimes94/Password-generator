var length = 20;
var pswrdArr = [];

// Generation using the UTF-8 character set, and an array for symbols //
function genLower () {
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function genUpper () {
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
}

function genNumber () {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function genSymbol () {
    var symbolsArray = ["!","@","#","$","%","^","&","*"];
    return symbolsArray[Math.floor(Math.random()*8)];
}
// Push randomly generated values into the password array
for (var i = 0; i < (length/4); i++) {
    pswrdArr.push(genLower());
    pswrdArr.push(genUpper());
    pswrdArr.push(genNumber());
    pswrdArr.push(genSymbol());
}

// Fisher-Yates Shuffle Algorithm
var shuffle = function (array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

// Shuffle the generated array
var pswrdShuffle = shuffle(pswrdArr);
// If desired password length is less that 4, slice the array to the correct size
var pswrdSlice = pswrdShuffle.slice(0,length);
// convert the array to a single string
var pswrdprimer = pswrdSlice.join("");


console.log(pswrdprimer);