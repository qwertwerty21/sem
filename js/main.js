$( document ).ready(function(){
	
	

	console.log( FrontPage.arrayOfClassrooms );

	FrontPage.closeTwitterSection();

	FrontPage.showModalCreateClass();
	FrontPage.modalMakeNewClassroom();
	FrontPage.showArrayOfClassroomsAsOptions();
	FrontPage.addNewStudent();
	FrontPage.loadExistClassroom();
	FrontPage.registerCurrentStudent();
	
	FrontPage.addMinusHWPoints();
	FrontPage.showModalStudentNotes();
	FrontPage.addNewStudentNote();
	FrontPage.deleteStudentNote();
	FrontPage.modalChangeStudentName();
	FrontPage.changeStudentName();
	FrontPage.removeStudentFromClassroom();
	FrontPage.randomStudentImg();

	FrontPage.shakeShowClassAsWholeImg();
	FrontPage.resetHWPoints();
	FrontPage.chooseVolunteer();
	FrontPage.chooseVolunteerOP();
	FrontPage.addMinusClassLevel();
	FrontPage.resetClassLevel();
	FrontPage.showModalClassReflection();
	FrontPage.addNewClassReflection();
	FrontPage.deleteClassReflection();
	FrontPage.deleteClassroom();
});