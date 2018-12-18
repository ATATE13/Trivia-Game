var triviaQuestions = [{
    question: "What year was the Breakfast Club released?",
    answerList: ["1984", "1985", "1986", "1987"],
    answer: 1
}, {
    question: "What kind of car does Marty McFly take back to the furture?",
    answerList: ["DeLorean", "Mercedes-Benz", "Ferrari", "Porsche"],
    answer: 0
}, {
    question: "Where was E.T. hidden in the 1982 movie E.T. The Extra-Tersterial?",
    answerList: ["under the bed", "in the garage", "in the closet", "in the backyard"],
    answer: 2
}, {
    question: "Who does Ferris see outside the restaurant while waiting for a cab, in Ferris Bueller's Day Off?",
    answerList: ["his father", "his sister", "the mayor", "his mother"],
    answer: 0
}, {
    question: "In Ghostbuster, Bill Murray starred in what role?",
    answerList: ["Egon Spengler", "Winston Zeddemoore", "Ray Stantz", "Peter Venkman"],
    answer: 3
}, {
    question: "Who played Mr. Miyagi in the Karate Kid?",
    answerList: ["Ralph Macchio", "Pat Morita", "Jackie Chan", "Peter Griffin"],
    answer: 1
}, {
    question: "In the Princess Bride what would Buttercup refer to Westley as?",
    answerList: ["Hey you", "Servant boy", "Wesley", "Farm boy"],
    answer: 3
}, {
    question: "What is the main object that everyone is looking for in Raiders of the Lost Ark?",
    answerList: ["Noah's Ark", "Ark of the Covenant", "Holy Grail", "Magic Rocks"],
    answer: 1
}, {
    question: "What is the name of the exchange student living with Samantha's grandparents in Sixteen Candles?",
    answerList: ["Cobi Lee Tran", "Bruce Lee", "Long Duck Dong", "Big Long Shaft"],
    answer: 2
}, {
    question: "In The Goonies, what does Mouth make Chunk to do in order to come into the main character's yard?",
    answerList: ["Truffle Shuffle", "Chubby Shuffle", "Harlem Shuffle", "Chattanooga Shuffle"],
    answer: 0
}];

var gifArray = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10",];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}

$("#startBtn").on("click", function () {
    $(this).hide();
    newGame();
});

$("#startOverBtn").on("click", function () {
    $(this).hide();
    newGame();
});

function newGame() {
    $("#finalMessage").empty();
    $("#correctAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();
    answered = true;


    //set for new questions and answers
    $("#currentQuestion").html("Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length);
    $(".question").html("<h2>" + triviaQuestions[currentQuestion].question + "<h2>");
    for (var i = 0; i < 4; i++) {
        var choices = $("<div>");
        choices.text(triviaQuestions[currentQuestion].answerList[i]);
        choices.attr({ "data-index": i });
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
    }
    countdown();
    //clicking on the answer will pause the time and set up answer page
    $(".thisChoice").on("click", function () {
        userSelect = $(this).data("index");
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 15;
    $("#timeLeft").html("<h2>Time Remaining: " + seconds + "</h2>");
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $("#timeLeft").html("<h2>Time Remaining: " + seconds + "</h2>");
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() {
    $("#currentQuestion").empty();
    $(".thisChoice").empty(); //clears question page
    $(".question").empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    $("#gif").html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
    //checks to see correct, incorrect, or unaswered
    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $("#message").html(messages.correct);
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $("#message").html(messages.incorrect);
        $("#correctAnswer").html("The correct answer was: " + rightAnswerText);
    } else {
        unanswered++;
        $("#message").html(messages.endTime);
        $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (triviaQuestions.length - 1)) {
        setTimeout(scoreboard, 5000)
    } else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard() {
    $("#timeLeft").empty();
    $("#message").empty();
    $("#correctedAnswer").empty();
    $("#gif").empty();

    $("#finalMessage").html(messages.finished);
    $("#correctAnswers").html("Correct Answers: " + correctAnswer);
    $("incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
    $("#unanswered").html("Unanswered: " + unanswered);

    $("#startOverBtn").addClass("reset");
    $("#startOverBtn").show();
    $("#startOverBtn").html("Start Over?");
}