const $startGameButton = document.querySelector(".start-quiz")
const $competitivoGameButton = document.querySelector(".start-competitivo")
const $nextQuestionButton = document.querySelector(".next-question")
const $nextQuestionButtonCompetitive = document.querySelector(".next-questioncompetitivo")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")
const $navBar = document.querySelector(".navezinha")
const $tempo = document.querySelector(".tempo")
const $Ponto = document.querySelector(".pontos")
const $vidas = document.querySelector(".vidas")
const $ContadorTempo = document.querySelector(".Contador-T")
const $ContadorPontos = document.querySelector(".Contador-P")
const $vida1= document.querySelector(".vida-1")
const $vida2= document.querySelector(".vida-2")
const $vida3= document.querySelector(".vida-3")
const $user = document.querySelector(".user")
const $botaoLoguin = document.querySelector(".botao-loguin")
const $nomeUser = document.querySelector(".nome-user")
const $rankign = document.querySelector(".div-rankign")
const $rankignTitle = document.querySelector(".rankign")
const $p1 = document.querySelector(".Podio-1")
const $p2 = document.querySelector(".Podio-2")
const $p3 = document.querySelector(".Podio-3")
const $p4 = document.querySelector(".Podio-4")
const $p5 = document.querySelector(".Podio-5")
const $refazer = document.querySelector(".refazer")
const $naoLogado = document.querySelector(".naoLogado")

let competitiveQuestionIndex = 0
let currentQuestionIndex = 0
let totalCorrect = 0

var contadorSeg = 0
var contadorMin = 0
var contadorDiminuiMin = 1
var PontoSeg = 0
var logTempo = 0
var vidas = 3
var pontos = 0
var Username = 0
var logado = false



$startGameButton.addEventListener("click", startGame)
$competitivoGameButton.addEventListener("click", startCompetitive)

function startCompetitive() {
  $startGameButton.classList.add("hide")
  $competitivoGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  $tempo.classList.remove("hide")
  $Ponto.classList.remove("hide")
  $vidas.classList.remove("hide")
  $navBar.classList.add("d-none")
  contadorSeg = 30
  NextQuestionCompetitive()
  MenosTimer()
}

function startGame() {
  $startGameButton.classList.add("hide")
  $competitivoGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  $navBar.classList.add("d-none")
  displayNextQuestion()
  timer()
}

function MenosTimer() {
 
  if (contadorSeg > 60){
    contadorDiminuiMin++
    contadorSeg = contadorSeg - 60
    if (contadorSeg < 10){
      $ContadorTempo.innerHTML = `<h3 class="d-flex justify-content-center font-weight-bold text-white">${contadorDiminuiMin}:0${contadorSeg}</h3>`
    }
    else{
      $ContadorTempo.innerHTML = `<h3 class="d-flex justify-content-center font-weight-bold text-white">${contadorDiminuiMin}:${contadorSeg}</h3>`
    }
    
  }


  if (contadorDiminuiMin == -1){
    //console.log(`hello world`)
    return finishCompetitive();
  }
  if (competitiveQuestionIndex < questions.length) {
    if (contadorSeg == 0) {
      contadorDiminuiMin--;
      contadorSeg = 60;
      //console.log(contadorDiminuiMin);
      
    }

    setTimeout(function () {
      if (contadorSeg < 10){
        $ContadorTempo.innerHTML = `<h3 class="d-flex justify-content-center font-weight-bold text-white">${contadorDiminuiMin}:0${contadorSeg}</h3>`
      }
      else{
        $ContadorTempo.innerHTML = `<h3 class="d-flex justify-content-center font-weight-bold text-white">${contadorDiminuiMin}:${contadorSeg}</h3>`
      }
      
      $ContadorPontos.innerHTML = `<h3 class="d-flex justify-content-center font-weight-bold text-white">${pontos} </h3>`
      //console.log(contadorSeg);
      contadorSeg--;
      if (contadorSeg < 0) contadorSeg = 59; 
      MenosTimer(); 
    }, 1000);
  }
}

function TimerPontos(){
  setTimeout(function() {
    //console.log(PontoSeg)
    PontoSeg++
    TimerPontos()
  }, 1000)
}

function timer() {
  if (currentQuestionIndex < questions.length) {

    if (contadorSeg == 60 ){
      contadorMin++
      contadorSeg = 0
      //console.log(contadorMin)
    }

    setTimeout(function() {
      //console.log(contadorSeg)
      contadorSeg++
      timer()
    }, 1000)
  }
}

function displayNextQuestion() {
  resetState()
  
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function NextQuestionCompetitive() {
  resetState()
  if (PontoSeg != 0){
    PontoSeg=0
    TimerPontos()
  }
  else{
    TimerPontos()
  }

  if (vidas == 0) {
    return finishCompetitive()
  }

  if (generalQuestions.length === competitiveQuestionIndex) {
    return finishCompetitive()
  }

  $questionText.textContent = generalQuestions[competitiveQuestionIndex].question
  generalQuestions[competitiveQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswerCompetitive)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
}

function selectAnswerCompetitive(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    if (PontoSeg <= 15) {
      pontos += 100
      contadorSeg += 45
      PontoSeg = 0
      
    } else if (PontoSeg <= 30 && PontoSeg > 15) {
      pontos += 75
      contadorSeg += 30
      PontoSeg = 0

    } else if (PontoSeg <= 45 && PontoSeg > 30) {
      pontos += 50
      contadorSeg += 15
      PontoSeg = 0

    } else {
      pontos += 25
      contadorSeg += 10
      PontoSeg = 0

    }
    getQuestionDifficulty()
    totalCorrect++
    playCorrectSound();
  } else {
    document.body.classList.add("incorrect")
    if (vidas == 3){
      $vida3.classList.add("hide")
    }
    if (vidas == 2){
      $vida2.classList.add("hide")
    }
    if (vidas == 1){
      $vida1.classList.add("hide")
    }
    vidas--
    playIncorrectSound();

  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  competitiveQuestionIndex++
  setTimeout(function() {
    $nextQuestionButtonCompetitive.click();
  }, 1000);
  
}

function getQuestionDifficulty(questionIndex) {
  const question = questions[questionIndex];
  if (!question) {
    return null; // Retorna null se o índice da pergunta estiver fora do intervalo
  }
  // Verifica a propriedade 'difficulty' da pergunta e retorna um valor correspondente
  switch (question.difficulty) {
    case 'easy':
      return 'fácil';
    case 'medium':
      return 'média';
    case 'hard':
      return 'difícil';
    default:
      return null; // Retorna null se a dificuldade não estiver definida ou for inválida
  }
}



function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)

  $questionText.innerHTML = `QuizGenius`
  $navBar.classList.remove("d-none")
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message" style="color: rgb(238, 243, 249);">
      Você acertou ${totalCorrect} de ${totalQuestions} questões! <br>
      <span>Resultado: ${message}</span> <br>
      <span>Tempo: ${contadorMin}:${contadorSeg}</span>
    </p>
  `
  $refazer.classList.remove("d-none")

}

function verificaRankign() {
  $rankign.innerHTML = "" // Limpa o conteúdo atual do elemento $rankign

  // Ordena o array competidores em ordem decrescente de pontos
  competidores.sort((a, b) => parseInt(b.pontos) - parseInt(a.pontos))
  console.log(competidores)

  competidores.forEach((competidor, index) => {
    const divCompetidor = document.createElement("div")

    if (index == 0){
      divCompetidor.innerHTML += `
      <p class="font-weight-bold competidores text-white"><img src="imagens/medalha-1.jpg" alt="medalga-1" class="img-medalha"> | ${competidor.name} | ${competidor.pontos}
      </p>`

    }

    if (index == 1){
      divCompetidor.innerHTML += `
      <p class="font-weight-bold competidores text-white"><img src="imagens/medalha-2.jpg" alt="medalga-1" class="img-medalha"> | ${competidor.name} | ${competidor.pontos}
      </p>`

    }

    if (index == 2){
      divCompetidor.innerHTML += `
      <p class="font-weight-bold competidores text-white"><img src="imagens/medalha-3.jpg" alt="medalga-1" class="img-medalha"> | ${competidor.name} | ${competidor.pontos}
      </p>`

    }

   

  
    if (index >= 3){
      divCompetidor.innerHTML += `
      <p class="font-weight-bold competidores text-white" >${index + 1} | ${competidor.name} | ${competidor.pontos}
      </p>`

    }

    
    $rankign.appendChild(divCompetidor)

  })
}

function TimerLoguin(){
  if (logTempo >=0){
    console.log("entrou")
    setTimeout(function() {
      //console.log(PontoSeg)
      $naoLogado.classList.remove("hide")
      $naoLogado.innerHTML = `<p class="font-weight-bolder h4 d-flex justify-content-center text-white">Voce precisa estar logado para ver a sua posição no ranking</p><br>
      <div class="mb-3">
        <button type="button" class="btn btn-outline-primary btn-lg d-flex ml-auto mr-auto font-weight-bolder" data-toggle="modal" data-target="#exampleModal">
            login
        </button>
      </div>`
      
      if (logado == true) {
        
        $naoLogado.classList.add("hide")
        competidores.push({ name: Username, pontos: pontos})
        competidores.sort((a, b) => parseInt(a.pontos) - parseInt(b.pontos))
        $rankign.classList.remove("hide")
        logTempo = -5
        console.log(logTempo)

        competidores.reverse()
        let jogadorIndex = competidores.findIndex(i => i.name === Username)
        console.log(jogadorIndex)
        const totalQuestionsCompetitive = totalCorrect


        $questionsContainer.innerHTML = 
        `
          <p class="final-message text-white">
            Você acertou ${totalQuestionsCompetitive} questões! <br>
            <span class="text-white">Sua pontuação foi : ${pontos}</span><br>
            Voce ficou em ${jogadorIndex+1}º lugar do ranking
          </p>
        `
        verificaRankign()
      }
      logTempo++
      TimerLoguin()
    }, 1000)
  }
}

function finishCompetitive() {
  pontos += vidas * 200

  $Ponto.classList.add("hide")
  $vidas.classList.add("hide")
  $tempo.classList.add("hide")
  $questionText.innerHTML = `QuizGenius`
  $refazer.classList.remove("d-none")

  TimerLoguin()
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    playCorrectSound()
    document.body.classList.add("correct")
    totalCorrect++
     // Chama a função para reproduzir o som de resposta correta
  } else {
    playIncorrectSound()
    console.log("oii")
    document.body.classList.add("incorrect") 
     // Chama a função para reproduzir o som de resposta incorreta
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  currentQuestionIndex++
  setTimeout(function() {
    $nextQuestionButton.click();
  }, 1500);
}

function playCorrectSound() {
  const audio = document.getElementById("somCorreto")
  audio.play()
}



function playIncorrectSound() {
  const audio = document.getElementById("somIncorreto")
  audio.load()
  audio.play()
}

const generalQuestions = [
  // Fácil
  {
    question: "Qual é o nome do maior planeta do sistema solar?",
    answers: [
      { text: "Marte", correct: false },
      { text: "Vênus", correct: false },
      { text: "Júpiter", correct: true },
      { text: "Saturno", correct: false }
    ],
    difficulty: "fácil"
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    answers: [
      { text: "Miguel de Cervantes", correct: true },
      { text: "William Shakespeare", correct: false },
      { text: "Jorge Luis Borges", correct: false },
      { text: "Franz Kafka", correct: false }
    ],
    difficulty: "fácil"
  },
  {
    question: "Qual é a capital da França?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlim", correct: false },
      { text: "Roma", correct: false },
      { text: "Paris", correct: true }
    ],
    difficulty: "fácil"
  },
  {
    question: "Quantos continentes existem?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "8", correct: false }
    ],
    difficulty: "fácil"
  },
  {
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "John F. Kennedy", correct: false }
    ],
    difficulty: "fácil"
  },

  // Média
  {
    question: "Qual é o metal mais abundante na crosta terrestre?",
    answers: [
      { text: "Ouro", correct: false },
      { text: "Prata", correct: false },
      { text: "Ferro", correct: true },
      { text: "Cobre", correct: false }
    ],
    difficulty: "média"
  },
  {
    question: "Qual é o maior órgão do corpo humano?",
    answers: [
      { text: "Coração", correct: false },
      { text: "Pulmão", correct: false },
      { text: "Fígado", correct: true },
      { text: "Cérebro", correct: false }
    ],
    difficulty: "média"
  },
  {
    question: "Quem pintou a 'Mona Lisa'?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Pablo Picasso", correct: false },
      { text: "Michelangelo", correct: false }
    ],
    difficulty: "média"
  },
  {
    question: "Qual é a língua mais falada no mundo?",
    answers: [
      { text: "Inglês", correct: false },
      { text: "Mandarim", correct: true },
      { text: "Espanhol", correct: false },
      { text: "Hindi", correct: false }
    ],
    difficulty: "média"
  },
  {
    question: "Quem escreveu a peça de teatro 'Romeu e Julieta'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Friedrich Schiller", correct: false },
      { text: "Arthur Miller", correct: false },
      { text: "Anton Chekhov", correct: false }
    ],
    difficulty: "média"
  },

  // Difícil
  {
    question: "Qual é a velocidade da luz no vácuo?",
    answers: [
      { text: "300.000 km/s", correct: true },
      { text: "150.000 km/s", correct: false },
      { text: "500.000 km/s", correct: false },
      { text: "1.000.000 km/s", correct: false }
    ],
    difficulty: "difícil"
  },
  {
    question: "Quem foi o primeiro ser humano a pisar na Lua?",
    answers: [
      { text: "Buzz Aldrin", correct: false },
      { text: "Yuri Gagarin", correct: false },
      { text: "Neil Armstrong", correct: true },
      { text: "John Glenn", correct: false }
    ],
    difficulty: "difícil"
  },
  {
    question: "Qual é a capital do Canadá?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false }
    ],
    difficulty: "difícil"
  },
  {
    question: "Quem foi o primeiro presidente dos Estados Unidos?",
    answers: [
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
      { text: "Thomas Jefferson", correct: false },
      { text: "John F. Kennedy", correct: false }
    ],
    difficulty: "difícil"
  },
  {
    question: "Qual é o maior oceano do mundo?",
    answers: [
      { text: "Oceano Índico", correct: false },
      { text: "Oceano Atlântico", correct: false },
      { text: "Oceano Pacífico", correct: true },
      { text: "Oceano Ártico", correct: false }
    ],
    difficulty: "difícil"
  }
];



function getRandomQuestions(array, numQuestions) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
}

// Usando a função getRandomQuestions para obter 5 perguntas aleatórias
const randomQuestions = getRandomQuestions(generalQuestions, 5);
console.log(randomQuestions);



const questions = [
  {
    question: "Dentro de qual elemento HTML colocamos o JavaScript?",
    answers: [
      { text: "<javascript>", correct: false },
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false }
    ]
  },
  {
    question: "Onde é o lugar correto para inserir JavaScript?",
    answers: [
      { text: "Tanto no <head> quanto no <body> está correto", correct: true },
      { text: "No <body>", correct: false },
      { text: "No <head>", correct: false },
      { text: "Em outro lugar", correct: false }
    ]
  },
  {
    question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
    answers: [
      { text: '<script src="xxx.js">', correct: true },
      { text: '<script href="xxx.js">', correct: false },
      { text: '<script name="xxx.js">', correct: false },
      { text: "Nenhuma das alternativas", correct: false }
    ]
  },
  {
    question: 'O arquivo JavaScript externo deve conter a tag <script>',
    answers: [
      { text: "Verdadeiro", correct: false },
      { text: "Falso", correct: true }
    ]
  },
  {
    question: 'Como escrever "Hello World" numa caixa de alerta?',
    answers: [
      { text: 'msg("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true },
      { text: 'msgBox("Hello World");', correct: false },
      { text: 'alertBox("Hello World");', correct: false }
    ]
  },
  {
    question: 'Como podemos criar uma função no JavaScript?',
    answers: [
      { text: 'function:myFunction()', correct: false },
      { text: 'function myFunction()', correct: true },
      { text: 'function = myFunction()', correct: false },
      { text: 'Nenhum desses códigos criaria uma função', correct: false }
    ]
  },
  {
    question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
    answers: [
      { text: 'call minhaFuncao()', correct: false },
      { text: 'call function minhaFuncao()', correct: false },
      { text: 'Nenhum desses códigos chamaria essa função', correct: false },
      { text: 'minhaFuncao()', correct: true },
    ]
  },
]

const competidores = [
  {
    name: 'pedro123',
    pontos: '1000'
  },
  {
    name: 'maria',
    pontos: '950'
  },
  {
    name: 'joao',
    pontos: '850'
  },
  {
    name: 'ana',
    pontos: '1100'
  },
  {
    name: 'carla123',
    pontos: '920'
  },
  {
    name: 'lucas',
    pontos: '980'
  },
  {
    name: 'claudia456',
    pontos: '1020'
  },
  {
    name: 'rodrigo',
    pontos: '870'
  },
  {
    name: 'sandra',
    pontos: '930'
  },
  {
    name: 'gabriel789',
    pontos: '1050'
  },
  {
    name: 'bob_esponja',
    pontos: '1200'
  },
  {
    name: 'pepe',
    pontos: '1150'
  },
  {
    name: 'dora_a_exploradora',
    pontos: '890'
  },
  {
    name: 'homer_simpson',
    pontos: '980'
  }
]



console.log(competidores);


const usuarios = [
  {
      login: 'pedro',
      pass: '123'
  }
]

var menu = false;
var res = document.getElementById("res")
var lo = document.getElementById("lo")
var erro = document.getElementById("erro")

function cadastro(){
  if(menu == false){
      menu = true;
      
      erro.innerHTML = '<label></label>'
      res.innerHTML = '<label style="color: rgb(238, 243, 249);">Ja tem uma conta? </label> <a href="#" class="alert-link text-primary" data-toggle="collapse" data-target="#navbarToggleExternalContent" onclick="cadastro()">Login</a>.'
      lo.innerHTML = '<button type="button" class="btn btn-outline-primary btn-lg" style="height: 50px; width: 170px; border-radius: 30px;" onclick="logar()">Cadastrar-se</button>'
  }
  else{
      menu = false;

      erro.innerHTML = '<label></label>'
      res.innerHTML = '<label style="color: rgb(238, 243, 249);">Nâo tem uma conta? </label><a href="#" class="alert-link text-primary" data-toggle="collapse" data-target="#navbarToggleExternalContent" onclick="cadastro()">Cadastrar-se</a>.'
      lo.innerHTML = '<button type="button" class="btn btn-outline-primary btn-lg" style="height: 50px; width: 170px; border-radius: 30px;" onclick="logar()">login</button>'
  }
  
}

function logar(){
  if(!menu){
      let pegaUsuario = document.getElementById('usuario').value;
      let pegaSenha = document.getElementById('senha').value;
      let validalogin = false;

      for(let i in usuarios){

          if(pegaUsuario == usuarios[i].login && pegaSenha == usuarios[i].pass){
              validalogin = true;
              Username = pegaUsuario
              break;

          }
      }

      if(validalogin == true){
          erro.innerHTML = '<label></label>'
          $('#exampleModal').modal('hide')
          $user.classList.remove("hide")
          $botaoLoguin.classList.add("hide")
          $nomeUser.innerHTML = `<h3 class="font-weight-bold" style="color: rgb(238, 243, 249);">${Username}</h3>`
          logado = true



      }
      else{
          erro.innerHTML = '<label style="color: rgb(238, 243, 249);">Usuario ou senha invalidos</label>'
      }
  }
  else{
      let cadaUsuario = document.getElementById('usuario').value;
      let cadaSenha = document.getElementById('senha').value;
      let cadaAttSenha = document.getElementById('attSenha').value;
      let validaExistencia = false;

      if(cadaAttSenha == cadaSenha){
          for(let i in usuarios){
              if(cadaUsuario == usuarios[i].login && cadaSenha == usuarios[i].pass){
                  validaExistencia = true;
                  break;

              }
          }
          if(validaExistencia == true){
              erro.innerHTML = '<label style="color: rgb(238, 243, 249);">Este usuario ja esta cadastrado</label>'
          }
          else{
              usuarios.push({ login: cadaUsuario, pass: cadaSenha});
              erro.innerHTML = '<label style="color: rgb(238, 243, 249);">cadastrado</label>'
              console.log(usuarios);
              console.log(usuarios[Username].login)
              res.innerHTML = '<label style="color: rgb(238, 243, 249);">Nâo tem uma conta? </label><a href="#" class="alert-link text-primary" data-toggle="collapse" data-target="#navbarToggleExternalContent" onclick="cadastro()">Cadastrar-se</a>.'
              lo.innerHTML = '<button type="button" class="btn btn-outline-primary btn-lg" style="height: 50px; width: 170px; border-radius: 30px;" onclick="logar()">login</button>'
              $('.collapse').collapse('hide');
              
              menu = false;
              
          }
          
      }
      else{
          erro.innerHTML = '<label style="color: rgb(238, 243, 249);">Senha errada</label>'
      }
      
  }
}


'use strict'

let photo = document.getElementById('imgPhoto');
let file = document.getElementById('flImage');

photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {

    if (file.files.length <= 0) {
        return;
    }

    let reader = new FileReader();

    reader.onload = () => {
        photo.src = reader.result;
    }

    reader.readAsDataURL(file.files[0]);
});
