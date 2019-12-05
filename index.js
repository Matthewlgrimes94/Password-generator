//intialize variables, and grab DOM elements
var output = document.getElementById("passwordOutput");
var length = document.getElementById("length");
var useArr = [];
var includeLower = document.getElementById("lowerCheck");
var includeUpper = document.getElementById("upperCheck");
var includeNumber = document.getElementById("numbersCheck");
var includeSymbol = document.getElementById("symbolsCheck");
var generate = document.getElementById("generate");
var clip = document.getElementById("clipboard");
var useLower = true;
var useUpper = true;
var useNumber = true;
var useSymbol = true;

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
// I used an array for symbols, because the character set has some blank spaces that i didnt want to include
function genSymbol () {
    var symbolsArray = ["!","@","#","$","%","^","&","*","/","-","+",".",";",":"];
    return symbolsArray[Math.floor(Math.random()*14)];
}

// Listens for a click on the Generate button
generate.addEventListener("click", () => {
	// Checks to see which boxes have been checked
	var useLower = includeLower.checked;
	var useUpper = includeUpper.checked;
	var useNumber = includeNumber.checked;
	var useSymbol = includeSymbol.checked;
	var lengthValue = length.value;
	//logs which have been checked
	//console.log(useLower, useUpper, useNumber, useSymbol);
	//Places the boolean value of the checkboxes into an array, and filters out any that are "false"
	var useArr = [useLower, useUpper, useNumber, useSymbol].filter(Boolean);
	//Adds up true values to use in the password generator
	var charactersAdded = (useArr.length);
	//An array to hold the generated characters
	var passwordArr = [];

	generatePassword();
	// A for loop, that places characters into the password array, based on which boxes have been checked
	// It uses charactersAdded to determine how many characters are being added to the the new array
	function generatePassword() {
		for (i = 0; i < lengthValue; i += charactersAdded) {
			if (useLower === true) {
				passwordArr.push(genLower());
			} if (useUpper === true) {
				passwordArr.push(genUpper());
			} if (useNumber === true) {
				passwordArr.push(genNumber());
			} if (useSymbol === true) {
				passwordArr.push(genSymbol());
			//Checks to see if no options were selected, so your computer wont explode in that case
			//(tried that once, can't recommend)
			} if (useLower === false && useUpper === false && useNumber === false && useSymbol === false) {
				return;
			}
		}
	} 	//we can see what the password looks like before it is scrambled
		//console.log(passwordArr);
		// Shuffle the generated array
		var pswrdShuffle = shuffle(passwordArr);
		// If desired password length is less that 4, slice the array to the correct size
		var pswrdSlice = pswrdShuffle.slice(0,lengthValue);
		// convert the array to a single string
		var password = pswrdSlice.join("");
		console.log(password);
		output.innerText = password;

});
// Listens for clipboard click, and runs clipboard function
clip.addEventListener("click", () => {
	clipboard();
 });

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

//copy to clipboard
function clipboard () {
	var text = output.innerText;
	var temp = document.createElement('textarea');
	document.body.appendChild(temp);
	temp.value = text;
	temp.select();
	document.execCommand('copy');
	document.body.removeChild(temp);
};