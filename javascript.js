//An Array of options and questions for those options.
( function() {



    var ff7 = [

        {

            question: "Which of these was weapons was NOT present in the main game?",

            options: {
                a: "Sapphire Weapon",
                b: "Ruby Weapon",
                c: "Ultimate Weapon",
                d: "Emerald Weapon",
                e: "Omega Weapon"
            },

            correctAnswer: "e",

        },

        {

            question: "How many characters were in your party by the end of the game(including optional characters)?",

            options: {
                a: "7",
                b: "4",
                c: "8",
                d: "9",
                e: "3"
            },

            correctAnswer: "c",

        },

        {

            question: "What is the name of Cloud Strifes most recognizable weapon?",


            options: {

                a: "Buster Blade",
                b: "Crystal Blade",
                c: "Epoch",
                d: "Gun Blade",
                e: "Wooden Sword"
            },

            correctAnswer: "a",
        },


        {

            question: "What was the name of thr group trying to hunt you down?",

            options: {

                a: "Organization XIII",
                b: "The Turks",
                c: "ANBU",
                d: "Secret Service",
                e: "Imhotep"
            },

            correctAnswer: "b",
        },

        {

            question: "How many forms did the final boss have?",

            options: {

                a: "1",
                b: "2",
                c: "3",
                d: "4",
                e: "5"
            },

            correctAnswer: "b",

        },


         {

            question: "What materia does Aeris start off with when she joins your party?",

            options: {
                a: "Restore",
                b: "Cure",
                c: "Esuna",
                d: "All of the Above",
                e: "None of the Above"
            },

            correctAnswer: "e",

        },

        {

            question: "What is the strongest summon in the game?",

            options: {
                a: "Bahamut",
                b: "Alexandria",
                c: "Odin",
                d: "Knights Of The Round",
                e: "Ifrit"
            },

            correctAnswer: "d",

        },

        {

            question: "What type does the blue materia represent?",

            options: {
                a: "Summon",
                b: "Support",
                c: "Magic",
                d: "Independent",
                e: "Command"
            },

            correctAnswer: "b",

        },

        {

            question: "Early in the game, Cloud is talked into doing drag to invade Don Corneo's mansion. To this end, what key item is obtained by besting the Big Bro in the squat thrust minigame?",

            options: {
                a: "Wig",
                b: "Dyed Wig",
                c: "Bikini Briefs",
                d: "Perfume",
                e: "Shiny"
            },

            correctAnswer: "b",

        },

        


    ];

    //Used to store DOM manipulation to these elements in variables.

    //Timer
    var number = 10;

    var intervalId;

    function timeRun() {

    	intervalId = setInterval(minusTime, 1000);
    	quizBuild();
    }

    function minusTime() {

    	number--;

    	$("#timeAvailable").html("<p>" + number + "</p>");

    	if (number === 0) {

    		timeStop();
    		$("#timeAvailable").html("<p> Time's Up! </p>");
    		nextSlide();
    	}
    }

    function timeStop() {

    	clearInterval(intervalId);
    }



    


    //have a code block that actually runs the stupid fucking game. So help me god

    function quizBuild() {



        var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/mp3/ff7-prelude.mp3");

        $(".theme-button").on("click", function() {
        	
        	$(".text").remove();
        	$(".theme-button").text("ok but why tho")
            audioElement.play();

        });


        var outputHTML = [];

        //this will run through the ff7 questions array one by one. Neato

        ff7.forEach((currentQuestion, questionNumber) => {

            var options = [];

            for (letter in currentQuestion.options) {



                options.push(
                    `<label> 
				<input type="radio"
				 name="question${questionNumber}"
				 value="${letter}">
					${letter} : 
					${currentQuestion.options[letter]}
				</label>`


                );

            }

            //this outputs it for DOM manipulation homeboy

            outputHTML.push(

                `
				<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
				<div class="options"> ${options.join('')} </div>
				</div>`


            );



        });

        quizContainer.innerHTML = outputHTML.join("");



    };

    

    //My arch nemesis. RESULTS. work. PLEASE. 

    function showResults() {

        var answerContainers = quizContainer.querySelectorAll('.options');

        var numCorrect = 0;

        ff7.forEach((currentQuestion, questionNumber) => {

            var answerContainer = answerContainers[questionNumber];
            var selector =
                `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;



           

             if (userAnswer === currentQuestion.correctAnswer) {

                numCorrect++;

                answerContainers[questionNumber].style.color = "green";
            }
else {
   answerContainers[questionNumber].style.color = 'red';

            }



        });
        $(".quizStart").remove();

        resultsContainer.innerHTML = `<h1>You got ${ numCorrect } out of  ${ff7.length} Correct</h1>`;


    };

  function winDependency() {

  	if (numCorrect === ff7.length) {

  		resultsContainer.innerHTML = `<h1> You scored perfectly! Have nothing!</h1>`;
  	}
  }



    function slideShow(num) {

    	slides[currentSlide].classList.remove('active-slide');
  slides[num].classList.add('active-slide');
    		currentSlide = num;

    		if (currentSlide === 0) {

    			lastButton.style.display = "none";
    		} else {

    			lastButton.style.display = "inline-block";
    		};

    		if ( currentSlide === slides.length- 1 ) {

    			nextButton.style.display = "none";
    			submission.style.display = "inline-block";
    		} else {

    			nextButton.style.display = "inline-block";
    			submission.style.display = "none";
    		};


    };


    function nextSlide() {
    	slideShow(currentSlide+ 1);

    };

    function lastSlide() {
    	slideShow(currentSlide- 1);
    };


    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submission = document.getElementById("submit");
  

    quizBuild();

      var lastButton = document.getElementById("lastQuestion");
    var nextButton = document.getElementById("followingQuestion");
    var slides = document.querySelectorAll(".slide");


    //Variable to start with the first question of the question array. Will be used for
    // a For Loop.


    var currentSlide = 0;

     slideShow(0);



    submission.addEventListener("click", showResults);
    nextButton.addEventListener("click", nextSlide);
    lastButton.addEventListener("click", lastSlide);





})();




//Would like difficulty levels in terms of ambiguity and additions of pictures or not. 

//There will be several silly things that will occur depending on a few things. Just get it right.

//Need to have it times so that player only has 10 seconds to answer properly to said questions.