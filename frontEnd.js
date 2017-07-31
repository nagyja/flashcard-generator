var inquirer = require("inquirer");
var BasicCards = require("./BasicCards.js");
var ClozeCards = require("./ClozeCards.js");

var basicQuestions = [
	{
		front: "In 1867 the United States purchased Alaska from who?",
		back: "Russia"
	},
	{
		front: "The inventor Nikola Tesla was born on July 10th 1856 in what country?",
		back: "Serbia"
	},
	{
		front: "Who was vice president of the United States when Lincoln was assassinated.",
		back: "Andrew Johnson"
	},
	{
		front: "What was the name of the U.S. research and development project to create nuclear weapons in WWII",
		back: "The Manhattan Project"
	}
]

// Variable that holds the cloze-deleted questions list
var clozeQuest = [
	{
		text: "In 1867 the United States purchased Alaska from Russia.",
		cloze: "Alaska"
	},
	{
		text: "The inventor Nikola Tesla was born on July 10th 1856 in Serbia.",
		cloze: "Nikola Tesla"
	},
	{
		text: "Andrew Johnson was vice president of the United States when Lincoln was assassinated.",
		cloze: "vice president"
	},
	{
		text: "The Manhattan Project was the U.S. research and development project to create nuclear weapons in WWII",
		cloze: "nuclear weapons"
	}
]


// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].text, questions[i].cloze);
	clozeQuest.push(q);
}

// Index of the current question
var questIndex = 0;
// Counter of correct answers
var correctAns = 0;
// Counter of wrong answers
var wrongAns = 0;

// asker prompts the user to answer a given cloze-deleted question
function asker() {
	inquirer.prompt([
		{
			type: "input",
			message: clozeQuest[questIndex].partial + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {
		console.log("\n");

		// Check players answer
		if (answers.userGuess.toLowerCase() === clozeQuest[questIndex].cloze.toLowerCase()) {
			console.log("Correct!");
			correctAns++;
		} else {
			console.log("Incorrect!");
			wrongAns++;
		}

		// Show the correct answer
		console.log(clozeQuest[questIndex].text);
		console.log("\n");

		// Iterate through questions
		if (questIndex < clozeQuest.length - 1) {
			questIndex++;
			asker();
		} else {
			console.log("Game Over!");
			console.log("You got " + correctAns + " correct answers.");
			console.log("You got " + wrongAns + " answers wrong.");

			console.log("\n");

			// Prompt to replay the game
			inquirer.prompt([
				{
					type: "confirm",
					message: "Replay?",
					name: "replay"
				}
			]).then(function (answers) {
				if (answers.replay) {
					questIndex = 0;
					correctAns = 0;
					wrongAns = 0;
					asker();
				} else {
					console.log("Game over");
				}
			})
		}
	})
}

// Begin asking the questions!
asker();