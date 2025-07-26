document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const userScoreEl = document.getElementById('user-score');
    const computerScoreEl = document.getElementById('computer-score');
    const roundEl = document.getElementById('round');
    const resultEl = document.getElementById('result');
    const gameOverEl = document.getElementById('game-over');
    const resetBtn = document.getElementById('reset-btn');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    
    // Game variables
    let userScore = 0;
    let computerScore = 0;
    let round = 0;
    const maxRounds = 10;
    
    // Event listeners
    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (round >= maxRounds) return;
            
            const userChoice = this.id;
            playRound(userChoice);
        });
    });
    
    resetBtn.addEventListener('click', resetGame);
    
    // Game functions
    function playRound(userChoice) {
        round++;
        roundEl.textContent = `${round}/${maxRounds}`;
        
        const computerChoice = getComputerChoice();
        const winner = getRoundWinner(userChoice, computerChoice);
        
        updateScores(winner);
        displayResult(userChoice, computerChoice, winner);
        
        if (round >= maxRounds) {
            endGame();
        }
    }
    
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }
    
    function getRoundWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'draw';
        }
        
        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'user';
        } else {
            return 'computer';
        }
    }
    
    function updateScores(winner) {
        if (winner === 'user') {
            userScore++;
            userScoreEl.textContent = userScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
    }
    
    function displayResult(userChoice, computerChoice, winner) {
        const choiceNames = {
            'rock': 'Rock',
            'paper': 'Paper',
            'scissors': 'Scissors'
        };
        
        let resultText = `You chose ${choiceNames[userChoice]}, computer chose ${choiceNames[computerChoice]}. `;
        
        if (winner === 'draw') {
            resultText += "It's a draw!";
            resultEl.style.color = '#6c757d';
        } else if (winner === 'user') {
            resultText += "You win!";
            resultEl.style.color = '#198754';
        } else {
            resultText += "Computer wins!";
            resultEl.style.color = '#dc3545';
        }
        
        resultEl.textContent = resultText;
    }
    
    function endGame() {
        let gameOverText = '';
        
        if (userScore > computerScore) {
            gameOverText = `Game Over! You win ${userScore}-${computerScore}!`;
            gameOverEl.style.color = '#198754';
        } else if (computerScore > userScore) {
            gameOverText = `Game Over! Computer wins ${computerScore}-${userScore}!`;
            gameOverEl.style.color = '#dc3545';
        } else {
            gameOverText = `Game Over! It's a tie ${userScore}-${computerScore}!`;
            gameOverEl.style.color = '#6c757d';
        }
        
        gameOverEl.textContent = gameOverText;
        resetBtn.style.display = 'inline-block';
    }
    
    function resetGame() {
        userScore = 0;
        computerScore = 0;
        round = 0;
        
        userScoreEl.textContent = '0';
        computerScoreEl.textContent = '0';
        roundEl.textContent = '0/10';
        resultEl.textContent = '';
        gameOverEl.textContent = '';
        resetBtn.style.display = 'none';
        resultEl.style.color = '#343a40';
    }
});