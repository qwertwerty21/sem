( function( global, $ ){

var Classroom = function( classroomName, classroomGrade, classroomYear ){
	
	this.classroomName = classroomName;
	this.classroomGrade = classroomGrade;
	this.classroomYear = classroomYear;
	
	this.class = {
		classImg: "img/classlevel1.jpeg",
		classLevel: 1,
		nextEvoLevel: 2,
		classReflections: []
	};

	this.students = [];
	console.log( classroomName + " " + classroomGrade + " " + classroomYear + 'hi form CLassroom ' + this.students);
};






	
global.Classroom = Classroom;
})( window, jQuery );