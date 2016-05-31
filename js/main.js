$( document ).ready(function(){
	
	function lsTest(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } 

    catch( e ) {
        return false;
    }

	}

	if( lsTest() === true ){
	    // available
	console.log( FrontPage.arrayOfClassrooms );

	FrontPage.closeTwitterSection();

	FrontPage.showModalCreateClass();
	FrontPage.modalMakeNewClassroom();
	FrontPage.showArrayOfClassroomsAsOptions();
	FrontPage.onAddNewStudentBtnClick();
	FrontPage.enterShortcutAddNewStudent();
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
	
	}

	else{
	    alert( "Sem is designed to work best with the Google Chrome Web Browser. You are using an OUTDATED Browser! Please upgrade your Browser to improve your experience." );
	}


});