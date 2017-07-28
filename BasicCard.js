var BasicCard = function(front, back){
//this.card will hold all our card objects
	this.card = [];

	this.addCard = function(f, b){
		this.front.push(new Card(f,b));
	};
};

//Exports the Basic flash card constructor.
module.exports = BasicCard;