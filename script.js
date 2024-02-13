document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    shuffleCards();
  
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flipped');
  
      if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      // Second click
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      let isMatch = firstCard.dataset.pair === secondCard.dataset.pair;
  
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetBoard();
      checkCompletion();
    }
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
  
        resetBoard();
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    function shuffleCards() {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    }

    function checkCompletion() {
      let allFlipped = document.querySelectorAll('.flipped').length;
      let totalCards = document.querySelectorAll('.card').length;
    
      // If all cards are flipped, show the completion message
      if (allFlipped === totalCards) {
        document.getElementById('game-complete-message').style.display = 'flex';
      }
    }
  
    cards.forEach(card => card.addEventListener('click', flipCard));
  });
  