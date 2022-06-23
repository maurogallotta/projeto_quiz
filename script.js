// initial data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Event
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// functions
function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) *100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        //document.querySelector('.options').innerHTML = '';
        /* forma 01
        for (let i in q.options){
            document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`
        } 
        */
        // forma 02 - mais performatica
        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

        // console.log(q.question);
    }else{
        finishQuiz();
    }
}

function optionClickEvent(e) {
    /* forma 1
    console.log("Clicou em ", e.target.getAttribute('data-op'));
    */

    // forma 2
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        // console.log("Acertou");
        correctAnswers++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Ta ruin em?!`;
        document.querySelector('.scorePct').style.color = `#ff0000`;
    }
    else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `Miuto bom!`;
        document.querySelector('.scorePct').style.color = `#ffff00`;
    }
    else if(points >= 70 && points < 90) {
        document.querySelector('.scoreText1').innerHTML = `Parabéns!`;
        document.querySelector('.scorePct').style.color = `#0d630d`;
    }
    else if (points >=90) {
        document.querySelector('.scoreText1').innerHTML = `VOCÊ É TOP!`;
        document.querySelector('.scorePct').style.color = `#0d630d`;
    }
    

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce Respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}