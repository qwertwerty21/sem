( function( global, $ ){

//constructor function for steduent 
var Student = function( studentName ){
	this.studentName = studentName;
	this.studentImg = "img/op.png";
	this.studentHW = 0;
	this.studentNotes = [];
};

global.Student = Student;
})( window, jQuery );