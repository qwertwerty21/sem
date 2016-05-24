( function( global, $ ){


	var FrontPage = {

		currentClassroomIdNum : 0,

		currentStudent: "",

		arrayOfClassrooms: JSON.parse( localStorage.getItem( "Sem arrayOfClassrooms" )) || [],

		randomStudentImgArray: [
			"img/op.png",
			"img/coward2.jpg",
			"img/ppval.png",
			"img/piglord.png",
			"img/mumen.png",
			"img/crab.jpg",
			"img/vaccine.jpeg",
			"img/sonic.jpg",
			"img/tatsu.jpg",
			"img/tiger.jpg",
			"img/genos.jpg",
			"img/mosquito.png",
			"img/car.png",
			"img/kabuto.jpeg",
			"img/oldguy.png",
			"img/seaking.png",
			"img/boros.jpg",
			"img/gorilla.png",
			"img/watchdog.png",
			"img/stinger.png"
		],

		classEvoImgArray: [
			"img/classlevel1.jpeg",
			"img/class2.jpg",
			"img/class3.jpg",
			"img/class4.png",
			"img/class5.jpg",
			"img/class6.png",
			"img/class7.jpg",
			"img/class8.jpg"
		],

		showArrayOfClassroomsAsOptions: function(){
			var $chooseExistClassroomSelect = $( "#chooseExistClassroom" );

			$chooseExistClassroomSelect.empty();
			$chooseExistClassroomSelect.append( "<option value='default'>Choose a Classroom</option>" );

			for( var i = 0; i < FrontPage.arrayOfClassrooms.length; i++ ){
				//consider using handlebars to do this
				$chooseExistClassroomSelect.append( "<option value=" + [i] + ">" + FrontPage.arrayOfClassrooms[i].classroomName + " " + FrontPage.arrayOfClassrooms[i].classroomGrade + " " + FrontPage.arrayOfClassrooms[i].classroomYear + "</option>");
			}
		},

		closeTwitterSection: function(){
			$( "#closeTwitterSectionBtn" ).on( "click", function(){

				$( "#twitterSection" ).addClass( "hidden");
				$( "#mainSection" ).removeClass( "col-sm-9" );
				$( "#mainSection" ).addClass( "col-sm-12" );
			});
		},

		showModalCreateClass: function(){

			$( "#frontpgMakeNewClassroom" ).on( "click", function(){

				$( "#newClassroomName" ).val( "" );

				$( "#modalCreateClass" ).modal( "show" );
			});
		}, 

		modalMakeNewClassroom: function(){

			$( "#modalMakeNewClassroom" ).on( "click", function( event ){

				event.preventDefault();
				
				var classroomName = $( "#newClassroomName" ).val();
				var classroomGrade = $( "#newClassroomGrade" ).val();
				var classroomYear = $( "#newClassroomYear" ).val();

				if( classroomName !== "" && classroomYear !== "" ){
					
					console.log( classroomName + " " + classroomGrade + " " + classroomYear );

					var myNewClassroom = new Classroom( classroomName, classroomGrade, classroomYear );
					

					//AFTER CREATEING NEW CLASSROOOM ADFD IT TO LOCAL STORAGE MEMORY AND ADD TO SELECT EXISITNG CLASS LIST
					FrontPage.arrayOfClassrooms.push( myNewClassroom );
					//make a separete function for saving clasrooms?
					FrontPage.saveClassroomsToLocalStor();
					//autoload myNewClassroom DO ME FUCKER

					$( "#modalCreateClass" ).modal( "hide" );
					FrontPage.loadNewClassroom( myNewClassroom );
				}

				
			});			
		}, 

		//checkForDuplicateClassroomName: function( classroomName ){
			
		//	for( var i = 0; i < FrontPage.arrayOfClassrooms.length; i++ ){
		//			if( classroomName === FrontPage.arrayOfClassrooms[i].classroomName ){
		//				alert( "You already have a Classroom with that name! Add something so we can distinguish between the two!" );
		//				return false;
		//		}
		//		}
		//},

		loadNewClassroom: function( classroom ){

			currentClassroomIdNum = FrontPage.arrayOfClassrooms.length - 1;

			//load Class Object 
			//change title of class h2 and change points 

			//classroom.displayStudents();
			FrontPage.showClassroomView();
			//clear page, load classrooom view, if no students, show input text,, for each student create object DO MEE TO FUCKKER MAKE HTM FOR CLASSROOM VEW

		},

		loadExistClassroom: function(){
			$( "#loadExistClassroomBtn" ).on( "click", function(){
				
				currentClassroomIdNum  = Number( $( "#chooseExistClassroom" ).val() );
				var localStorageSemArrayOfClassroom = JSON.parse( localStorage.getItem( "Sem arrayOfClassrooms" ) );

				console.log( localStorageSemArrayOfClassroom[currentClassroomIdNum].students );

				

				FrontPage.showClassroomView();

				//WORKON ME YOU BITCH YOU BETTER FUCKING FINISh ME I SEARING ON YOUR FUCKING MUM MATE 
				//MAKE CURRENT CLASSROOM THIS, MAKE STUDENTS APPEAR, LOAD NAME TO HEADER, ETC
			});
		},

		showClassroomView: function(){
			
			//change title of class h2 and change points
			//DO ME MAKE A NEW FUNCTION FOR LEVEL UP AND DOWN 
			//CHANGE ALL MENTIONS OF CLASS PINBTS TO CLASS LEVEL  

			$( "#classroomHeaderHTML" ).text( FrontPage.arrayOfClassrooms[currentClassroomIdNum].classroomName );
			$( "#classLevelHTML" ).text( "Lv " + FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel );
			$( "#classAsWholeImg" ).attr( "src", FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg );
			FrontPage.handlebarStudentCompileDisplay();

			$( ".jumbotron" ).addClass( "hidden" );
			$( "#classroomView" ).removeClass( "hidden" );

			//change bgc color 
			$( ".container-fluid" ).css( "background-color", "#efefef");
			//update options list
			FrontPage.showArrayOfClassroomsAsOptions();
		},

		addNewStudent: function(){
			
			$( "#addNewStudentBtn" ).on( "click", function(){
				
				var $newStudentName = $( "#addNewStudentName" );
				var $newStudentNameVal = $( "#addNewStudentName" ).val();

				$newStudentNameVal = FrontPage.checkAndReplaceForbiddenChar( $newStudentNameVal );
				console.log( $newStudentNameVal );

				if( !$newStudentNameVal ){
					$newStudentName.focus();
				}

				else if( FrontPage.findStudentByNameInArrayOfClassrooms( $newStudentNameVal ).length > 0 ){
					alert( "You already have a Student with that name in your Classroom! Add something so we can distinguish between the two! A middle initial, perhaps?" );
					$newStudentName.focus();
				}

				else if( $newStudentNameVal !== "" && FrontPage.findStudentByNameInArrayOfClassrooms( $newStudentNameVal ).length === 0 ){
					var newStudent = new Student( $newStudentNameVal );
					
					FrontPage.arrayOfClassrooms[currentClassroomIdNum].students.push( newStudent );
				
					FrontPage.handlebarStudentCompileDisplay();
				

					FrontPage.saveClassroomsToLocalStor();
					$newStudentName.val( "" );
					$newStudentName.focus();

				}
				
				//rememeber to add student to class student roster
				//currentClassroom.students.push( newStudent );
				//update jsonlocalstroage object
				
			});
		},

		checkAndReplaceForbiddenChar: function( string ){
			return string.replace( /[^A-Z0-9]/ig, "_" );
		},

		saveClassroomsToLocalStor: function(){
			localStorage.setItem( "Sem arrayOfClassrooms", JSON.stringify( FrontPage.arrayOfClassrooms ) );
		},

		handlebarStudentCompileDisplay: function(){
			
			$( ".studentList" ).empty();

			var studentDatas = [];

			for( var i = 0; i < FrontPage.arrayOfClassrooms[currentClassroomIdNum].students.length; i++ ){
				
				var studentDataObject = {
					studentName: FrontPage.arrayOfClassrooms[currentClassroomIdNum].students[i].studentName,
					studentImg: FrontPage.arrayOfClassrooms[currentClassroomIdNum].students[i].studentImg,
					studentHW: FrontPage.arrayOfClassrooms[currentClassroomIdNum].students[i].studentHW
				};

				studentDatas.push( studentDataObject );
			}

			var compiledStudentTemp = Handlebars.compile( $( "#studentTemplate" ).html() );
			$( ".studentList" ).append( compiledStudentTemp( studentDatas ) );
		},

		registerCurrentStudent: function(){
			
			$( document ).on( {
				mouseenter: function(){
								
					var activeStudent = $( this ).children( "li" )[0];

					activeStudent = $( activeStudent ).attr( "id" );

					console.log(activeStudent);

					FrontPage.currentStudent = activeStudent;

					$( this ).find( ".studentSubMenu" ).removeClass( "hidden" );


					//$( this ).find( ".studentSubMenu" ).css( "position", "absolute");
					//REMEMEBER TO ADD ABSOLTE POSITION TO .STUDNETSUBMENU SO YOUR MENUS DONT KEEPP FUCKING UP THE ORDER OF STUDNETS
					//TO DO ONLY KEEP MENU SHOWING FOR AS LONG AS MOUSE IS HOVERED THEN HIDE AGAIN
				},

				mouseleave: function(){
					
					if( FrontPage.currentStudent ){
						//FrontPage.currentStudent = "";
						$( this ).find( ".studentSubMenu" ).addClass( "hidden" );
						console.log(FrontPage.currentStudent);
					}
					
				}

			}, ".indivStudent" );

		},

		findStudentByNameInArrayOfClassrooms: function( studentNameToLookFor ){

			var arrayOfClassroomsStudentArray = FrontPage.arrayOfClassrooms[currentClassroomIdNum].students;

			var foundStudentArray =  $.grep( arrayOfClassroomsStudentArray, function( item, index ){
				return studentNameToLookFor === arrayOfClassroomsStudentArray[index].studentName;
			});

			return foundStudentArray;
		},

		addMinusHWPoints: function(){

			//var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms();
			
			$( document ).on( "click", ".addHWBtn, .minusHWBtn", function(){
				
				var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );
				//tTO DO FIND THE SUTENDT OBJECCT USING THE currentSTUDNET PROPERTY ADN ADD POINTS AND SAVE TO LOCALSTORAGE
				//DO ME FUCKER MOVE THE FUNCTION IN VAR RESULT TO ITS OWN FUNCTION MAKE SURE THERE ARE NO DUPLICATES OF STUDENTS
				if( myStudent.length === 1 ){

					//add minus points in local storage
					$( this ).hasClass( "addHWBtn" ) ? myStudent[0].studentHW += 1 : myStudent[0].studentHW -= 1;
					
					//add minus points in html
					var myStudentHTMLLocation = "li#" + myStudent[0].studentName + ">div.indiv-student-label>span.hWPoints";
					
					
					$( myStudentHTMLLocation ).html( myStudent[0].studentHW );
					FrontPage.saveClassroomsToLocalStor();
				}
				
				else{
					alert( "You have multiple students in this Classroom with the same name! Please change the students' names so we can better distinguish who is who!" );
				}
				
			});

		},

		showModalStudentNotes: function(){

			$( document ).on( "click", ".openStudentNoteBtn", function(){

				var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );
				//change name and img
				$( "#modalStudentNotesStudentImg" ).attr( "src", myStudent[0].studentImg );
				$( "#modalStudentNotesStudentName" ).text( myStudent[0].studentName + "'s"); 

				FrontPage.emptyAndReloadPastNotes( myStudent[0] );
				
				$( "#inputStudentNotes" ).val( "" );
				$( "#inputStudentNotes" ).attr( "placeholder", "Add a Note...");

				//add ION A FUCNTION  TO ACTUALLY ADD NEW NOTES
				$( "#modalStudentNotes" ).modal( "show" );

			});
		},

		emptyAndReloadPastNotes: function( studentObj ){
			
			$( ".pastStudentNotesList" ).empty();
			FrontPage.loadPastStudentNotes( studentObj );
			$( ".pastStudentNotesList>li>button.deleteBtn" ).addClass( "deleteStudentNoteBtn" );
		},

		loadPastStudentNotes: function( studentObj ){
			$.each( studentObj.studentNotes, function( index, value ) {
				FrontPage.makeLIForNoteReflection( studentObj.studentNotes[index], ".pastStudentNotesList" );	
			});
		},

		addNewStudentNote: function(){
			$( "#addNewStudentNoteBtn" ).on( "click", function(){

				var $newStudentNote = $( "#inputStudentNotes" ).val();

				if( $newStudentNote ){
					
					var nowDate = new Date().toLocaleString();

					var newStudentNoteObject = { date: nowDate, content: $newStudentNote };

					var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );

					myStudent[0].studentNotes.push( newStudentNoteObject );
					console.log( myStudent[0].studentNotes );
					FrontPage.saveClassroomsToLocalStor();

					//consioder moving the html constructor for relfector li to its own function

					FrontPage.emptyAndReloadPastNotes( myStudent[0] );
					$( "#inputStudentNotes" ).val( "" );
					$( "#inputStudentNotes" ).focus();

					//see if theres a way to make this neater, also what happens when you wanna delete one? REFERENCE MWOHAJI
				}
			});
		},

		deleteStudentNote: function(){
			//add placetofindindex, placeto find aray in parament in main FX THIS TSHIT 
			
			$( document ).on( "click", ".deleteStudentNoteBtn", function(){
				//remove from array
				var noteToBeDeleted = $(this).parent();
				console.log( $( ".pastStudentNotesList>li" ).index( noteToBeDeleted ) );
				var indexOfReflection = $( ".pastStudentNotesList>li" ).index( noteToBeDeleted );
				var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );
				
				myStudent[0].studentNotes.splice( indexOfReflection, 1 );
				console.log(FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections);
				//savew
				FrontPage.saveClassroomsToLocalStor();
				//remove from html
				noteToBeDeleted.remove();

			});
		},

		modalChangeStudentName: function(){
			//show a chang ename module with a text inoput
			//get input val and overwirite current student name and SAVE FINSIHS MER
			$( document ).on( "click", ".changeNameBtn", function( event ){

				event.preventDefault();

				$( "#changeStudentNameInput" ).val( "" );
				$( "#changeStudentNameInput" ).attr( "placeholder", FrontPage.currentStudent );

				$( "#modalStudentChangeName" ).modal( "show" );

				//REMEMBER TO MAKE A CLOSE WINDOW X BUTTON FOR ME 
			});
		},

		changeStudentName: function(){

			$( "#modalStudentChangeNameConfirmBtn" ).on( "click", function(){

				var newName = $( "#changeStudentNameInput" ).val();

				newName = FrontPage.checkAndReplaceForbiddenChar( newName );

				var checkForDuplicateStudentName = FrontPage.findStudentByNameInArrayOfClassrooms( newName );

				if( checkForDuplicateStudentName.length > 0 ){
					alert( "You already have a Student with that name in your Classroom! Add something so we can distinguish between the two! A middle initial, perhaps?" );
					$( "#changeStudentNameInput" ).focus();
				}

				else if( newName && checkForDuplicateStudentName.length === 0 ){
					
					var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );

					if( myStudent.length === 1 ){

							//change id of student li
							var myStudentHTMLLocation = "li#" + myStudent[0].studentName;

							myStudentHTMLLocation = $( myStudentHTMLLocation ).attr( "id", newName );

							//change student name in localStorage array
							myStudent[0].studentName = newName;

							//change actual displayed student name in html
							myStudentHTMLLocation = "li#" + myStudent[0].studentName + ">div.indiv-student-label>span.studentName";

							$( myStudentHTMLLocation ).html( myStudent[0].studentName );

							FrontPage.saveClassroomsToLocalStor();
							$( "#modalStudentChangeName" ).modal( "hide" );
					}
				}
			});
		},

		randomStudentImg: function(){
			$( document ).on( "click", ".randImgBtn", function( event ){
				
				event.preventDefault();
				
				var myStudent = FrontPage.findStudentByNameInArrayOfClassrooms( FrontPage.currentStudent );

				if( myStudent.length === 1 ){
					
					var newStudentImg = Math.round( Math.random() * ( FrontPage.randomStudentImgArray.length - 1 ) ); 

					myStudent[0].studentImg = FrontPage.randomStudentImgArray[newStudentImg];

					console.log( myStudent[0].studentImg );
					FrontPage.saveClassroomsToLocalStor();
					//FIX MEEEEE 
					//MAKE ARRAY OF RANDOM IMGS
					//MAKE A RANDOM FUCKTION FOR STUDENT IMG ARRAY
					
					//CHANGE IMG IN HTML
					var myStudentHTMLLocation = "li#" + myStudent[0].studentName;
					myStudentHTMLLocation = $( myStudentHTMLLocation ).parent().find( "img" );
					//var a = myStudentHTMLLocation.find( "img" );
					myStudentHTMLLocation.attr( "src", myStudent[0].studentImg );
					
				}

			});
		},

		removeStudentFromClassroom: function(){

			$( document ).on( "click", ".removeStudentBtn", function( event ){

				event.preventDefault();
				
				var arrayOfClassroomsStudentArray = FrontPage.arrayOfClassrooms[currentClassroomIdNum].students;

				var foundStudentArray =  $.grep( arrayOfClassroomsStudentArray, function( item, index ){
					console.log(item);
					
					if ( !item ) {
    				return;
  				}

					else if( FrontPage.currentStudent === item.studentName ){

						arrayOfClassroomsStudentArray.splice( index, 1 );
						console.log( arrayOfClassroomsStudentArray );
						//CLEAN MNE UP 

					}

				});

				var myStudentHTMLLocation = ".indivStudent>li#" + FrontPage.currentStudent;
				myStudentHTMLLocation = $( myStudentHTMLLocation ).parent();

				$( myStudentHTMLLocation ).remove();
				FrontPage.saveClassroomsToLocalStor();

			});
		},

		showLvlsToNextEvo: function(){

				var curClassLvl = FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel;
				var nextEvoLvl = FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.nextEvoLevel;
				var lvlToGoBeforeEvo = nextEvoLvl - curClassLvl;
				
				$( "#lvlToNextEvoHeader" ).html( lvlToGoBeforeEvo + " Level(s) to Next Evolution");
				$( "#lvlToNextEvoHeader" ).removeClass( "hidden" ); 

				$( "#classAsWholeImg" ).addClass( "shakeIt" );

				setTimeout( function(){
					$( "#lvlToNextEvoHeader" ).addClass( "hidden" );
					$( "#classAsWholeImg" ).removeClass( "shakeIt" );
				}, 2000);
				
			
		},

		shakeShowClassAsWholeImg: function(){
			
			$( "#classAsWholeImg" ).on( "click", function(){

				FrontPage.showLvlsToNextEvo();

			});

		},

		addMinusClassLevel: function(){
			$( "#addClassLevelBtn, #minusClassLevelBtn" ).on( "click", function(){

				$( this ).attr( "id" ) === "addClassLevelBtn" ? ( FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel += 1, FrontPage.checkForEvoLevel() ) :  FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel -= 1;

				//chang in html
				$( "#classLevelHTML" ).text( "Lv " +  FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel );

				FrontPage.saveClassroomsToLocalStor();

				FrontPage.showLvlsToNextEvo();

			});
		},

		checkForEvoLevel: function(){

			if( FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel === FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.nextEvoLevel ){
				FrontPage.evolveClass();
				FrontPage.updateEvoClassLevel();
			}

			//FIX ME SO THAT YOU DONT EVOLVE WHEN YOU MINS AND THEN ADD CLASS LEVELS 
			//MAYBE HVE A VAR THAT SETS NEXT EVO LEVEL AFTER EVOLVING THE CLASS?
		},

		evolveClass: function(){
			
			var bgmPlayer = document.getElementById( "bgmPlayer" );
			var currentImg = FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg;
			var nextImg = FrontPage.classEvoImgArray.indexOf( currentImg ) + 1;

			//get next img src in the array
			nextImg = FrontPage.classEvoImgArray[ nextImg ];

			if( !nextImg ){
				nextImg = FrontPage.classEvoImgArray[ 0 ];
			}
			//make change to img in local storage
			FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg = nextImg;
			console.log(FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg);
			FrontPage.updateAudioSrc( "sounds/classevo.ogg", "sounds/classevo.mp3" );
			
			bgmPlayer.play();
			$( ".container-fluid" ).hide();
			$( "#classEvoImg" ).attr( "src", currentImg );
			$( "#classEvoSect" ).removeClass( "hidden" );
			
			$( "html, body" ).addClass( "evo-bg-flash" );

			$( "#evoMsg" ).html( "What?! Your Classroom is evolving!" );
			

			setTimeout( function(){
					
					$( "#classEvoImg" ).addClass( "growshrink" );
					
			}, 1500 );

			setTimeout( function(){
					FrontPage.updateAudioSrc( "sounds/classevofanfare.ogg", "sounds/classevofanfare.mp3" );
					$( "#classEvoImg" ).attr( "src", nextImg );
					$( "#evoMsg" ).html( "Congratulations! Your Classroom evolved!" );
					$( "html, body" ).removeClass( "evo-bg-flash" );
					$( "#classEvoImg" ).removeClass( "growshrink" );
					bgmPlayer.play();
			}, 9000 );

			setTimeout( function(){
				$( "#classEvoSect" ).addClass( "hidden" );
				$( "#classAsWholeImg" ).attr( "src", nextImg );
				$( ".container-fluid" ).show();
				FrontPage.showLvlsToNextEvo();
			}, 13000 );

			
			//save to data
			FrontPage.saveClassroomsToLocalStor();
		},

		updateEvoClassLevel: function(){
			FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.nextEvoLevel *= 2;
			FrontPage.saveClassroomsToLocalStor();
		},

		updateAudioSrc: function( ogg, mp3 ){
			var bgmPlayer = document.getElementById( "bgmPlayer" );

			$( "#oggSrc" ).attr( "src", ogg );
			$( "#mp3Src" ).attr( "src", mp3 );
			bgmPlayer.load();
		},

		resetClassLevel: function(){
			$( "#resetClassLevelBtn" ).on( "click", function(){
				
				FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel = 1;
				$( "#classLevelHTML" ).text( "Lv " +  FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classLevel );

				FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.nextEvoLevel = 2;
				FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg = "img/classlevel1.jpeg";

				$( "#classAsWholeImg" ).attr( "src", "img/classlevel1.jpeg" );
				FrontPage.saveClassroomsToLocalStor();
				FrontPage.showLvlsToNextEvo();
			});
		},

		resetHWPoints: function(){
			$( "#resetHWPointsBtn" ).on( "click", function(){
				//change to info array localstorage
				for( var i = 0; i < FrontPage.arrayOfClassrooms[currentClassroomIdNum].students.length; i++ ){
					
					FrontPage.arrayOfClassrooms[currentClassroomIdNum].students[i].studentHW = 0;
					console.log( FrontPage.arrayOfClassrooms[currentClassroomIdNum].students[i].studentHW );
					FrontPage.saveClassroomsToLocalStor();
				}
				//change to html itself
				$( "span.hWPoints" ).each( function(){
					$( this ).html( "0" );
				});

			});
		},

		chooseVolunteer: function(){
			$( "#chooseVolunteerBtn" ).on( "click", function(){

				FrontPage.chooseAndShowVolunteerModal();
			});
		}, 

		chooseAndShowVolunteerModal: function(){
				var arrayOfClassroomsStudentArray = FrontPage.arrayOfClassrooms[currentClassroomIdNum].students;

				var chosenVolunteer = Math.round( Math.random() * ( arrayOfClassroomsStudentArray.length - 1 ) );
				//change modal name and img src
				chosenVolunteer = arrayOfClassroomsStudentArray[chosenVolunteer];
				console.log(chosenVolunteer.studentName);
				$( "#modalChooseVolunteerStudentName" ).text( chosenVolunteer.studentName );
				$( "#modalChooseVolunteerStudentImg" ).attr( "src", chosenVolunteer.studentImg );
				$( "#modalChooseVolunteer" ).modal( "show" );
				//show in modal
		},

		chooseVolunteerOP: function(){
			$( "#chooseVolunteerOPBtn" ).on( "click", function(){
				
				var bgmPlayer = document.getElementById( "bgmPlayer" );
				$( ".container-fluid" ).hide();
				$( "html, body" ).addClass( "opFlash" );
				FrontPage.updateAudioSrc( "sounds/onepunchtheme.ogg", "sounds/onepunchtheme.mp3" );
				bgmPlayer.play();

				setTimeout( function(){
					$( "html, body" ).removeClass( "opFlash" );
					$( "#volunteerOPGifSect" ).removeClass( "hidden" );
				}, 2700 );

				setTimeout( function(){
					$( "#volunteerOPGifSect" ).addClass( "hidden" );
					$( ".container-fluid" ).show();
					$( ".container-fluid" ).addClass( "shakeIt" );
					$( ".btn" ).prop( "disabled", true );
				}, 10000 );

				setTimeout( function(){
					bgmPlayer.pause();
					bgmPlayer.currentTime = 0;
					FrontPage.chooseAndShowVolunteerModal();
					$( ".container-fluid" ).removeClass( "shakeIt" );
					$( ".btn" ).prop( "disabled", false );
				}, 13300 );

				
			});
		},

		showModalClassReflection: function(){

			$( "#openClassReflectionsBtn" ).on( "click", function(){

				$( "#modalClassReflectionsClassImg" ).attr( "src", FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classImg );

				FrontPage.emptyAndReloadPastReflections();

				$( "#inputClassReflections" ).val( "" );
				$( "#inputClassReflections" ).attr( "placeholder", "How do you think today's class went?");

				$( "#modalClassReflections" ).modal( "show" );

			});
		},

		emptyAndReloadPastReflections: function(){
			
			$( ".pastReflectionsList" ).empty();
			FrontPage.loadPastClassReflections();
			$( ".pastReflectionsList>li>button.deleteBtn" ).addClass( "deleteClassReflectionBtn" );
		},

		loadPastClassReflections: function(){
			
			$.each( FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections, function( index, value ) {
				FrontPage.makeLIForNoteReflection( FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections[index], ".pastReflectionsList" );	
			});
		},

		addNewClassReflection: function(){

			$( "#addNewClassReflectionBtn" ).on( "click", function(){
				//add to classreflection array
				var $newClassReflection = $( "#inputClassReflections" ).val();

				if( $newClassReflection ){
					
					var nowDate = new Date().toLocaleString();

					var newClassReflectionObject = { date: nowDate, content: $newClassReflection };

					FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections.push( newClassReflectionObject );
					console.log( FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections );
					FrontPage.saveClassroomsToLocalStor();

					//consioder moving the html constructor for relfector li to its own function

					//FrontPage.makeLIForNoteReflection( newClassReflectionObject, ".pastReflectionsList" );
					FrontPage.emptyAndReloadPastReflections();
					
					$( "#inputClassReflections" ).val( "" );
					$( "#inputClassReflections" ).attr( "placeholder", "How do you think today's class went?");
					$( "#inputClassReflections" ).focus();

					//see if theres a way to make this neater, also what happens when you wanna delete one? REFERENCE MWOHAJI
				}
				
				//add to html 
			});
		},

		makeLIForNoteReflection: function( noteReflectionObject, elementToAppendTo ){
			
			var newListItem = $( "<li></li>", {
				text: noteReflectionObject.content
			});

			var newDeleteDiv = $( "<button></button>",{
				text: "X"
			});

			newDeleteDiv.addClass( "btn deleteBtn" );

			newListItem.append( newDeleteDiv );

			var newSpan = $( "<span></span>", {
				text: noteReflectionObject.date
			});

			newSpan.addClass( "dateSpan" );

			newListItem.append( newSpan );

			$( elementToAppendTo ).append( newListItem );

		},

		deleteClassReflection: function(){
			//add placetofindindex, placeto find aray in parament in main FX THIS TSHIT 
			
			$( document ).on( "click", ".deleteClassReflectionBtn", function(){
				//remove from array
				var reflectionToBeDeleted = $(this).parent();
				console.log( $( ".pastReflectionsList>li" ).index( reflectionToBeDeleted ) );
				var indexOfReflection = $( ".pastReflectionsList>li" ).index( reflectionToBeDeleted );
				
				FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections.splice( indexOfReflection, 1 );
				console.log(FrontPage.arrayOfClassrooms[currentClassroomIdNum].class.classReflections);
				//savew
				FrontPage.saveClassroomsToLocalStor();
				//remove from html
				reflectionToBeDeleted.remove();

			});
		},

		deleteClassroom: function(){
			
			$( "#deleteClassroomBtn" ).on( "click", function(){
				
				FrontPage.arrayOfClassrooms.splice( currentClassroomIdNum, 1 );
				//return to home screen DO ME 
				
				FrontPage.saveClassroomsToLocalStor();
				FrontPage.returnToHomeScreen();
				FrontPage.showArrayOfClassroomsAsOptions();
			});
		},

		returnToHomeScreen: function(){

			$( "#classroomHeaderHTML" ).text( "" );
			$( "#classLevelHTML" ).text( "" );
			$( "#classAsWholeImg" ).attr( "src", "" );
			//delete all students 
			$( "#studentList" ).empty();

			$( ".jumbotron" ).removeClass( "hidden" );
			$( "#classroomView" ).addClass( "hidden" );

			//change container fluid bgc
			$( ".container-fluid" ).css( "background-color", "#790400");
		}

		//ON LOAD LOAD EIXSITING CLASSROOM LIST FROM LOCAL STORAGE MEMORY 
		//MAKE RESET CLASSROOM LEVEL FUNCTION, MAKE SURE TWO CLASSES HAVE DIFFERENT NAMES, MAKE DELETE CLASSROOM FUNCTION, ADD IN NOTES

		//FIX THE load existing classrooms options dropdown menu
		//DO ME DO THE STUDENT NOTES YEAH DO THE NOTES
		
	};

	global.FrontPage = FrontPage;
})( window, jQuery );