class Game {
    constructor(container) {
      this.container = container;
      this.wordElement = container.querySelector('.word');
      this.winsElement = container.querySelector('.status__wins');
      this.lossElement = container.querySelector('.status__loss');
      this.timeElement = container.querySelector('.status__time');
      this.buttonContainer = container.querySelector('.button');
      this.button = container.querySelector('.button_attribute')

  
      this.reset();
  
      // this.registerEvents();

    }
  
    reset() {
      this.winsElement.textContent = 0;
      this.lossElement.textContent = 0;
      this.timeElement.textContent = '??'
      this.wordElement.classList.add('block')
      this.buttonContainer.classList.remove('block')
      let start = (e) => {
        this.setNewWord();
        this.buttonContainer.classList.add('block')
        this.wordElement.classList.remove('block')
        this.registerEvents()
        this.timeOut()


      }
      this.button.onclick = start
    }

    timeOut() {
      let count = this.text.length * 1000
      let date = new Date(count)              // с датой можно было и не заморачиваться, присвоить переменной численное значение и вычитать по единице
      let sec = `0${date.getSeconds()}`
      this.timeElement.textContent = sec.slice(-2)
      this.time = setInterval(() => {
        date.setSeconds(date.getSeconds() - 1);
        sec = `0${date.getSeconds()}`
        this.timeElement.textContent = sec.slice(-2)
        if (Number(date.getSeconds() === 0)) {
            clearInterval(this.time);
            this.fail()
        }
    }, 1000)
    }
  
    registerEvents() {
      /*
        TODO:
        Написать обработчик события, который откликается
        на каждый введённый символ.
        В случае правильного ввода слова вызываем this.success()
        При неправильном вводе символа - this.fail();
       */
      this.press = (e) => {
        let userSymbol = e.key.toLowerCase()
        let symbol = this.currentSymbol.textContent
        if (userSymbol === symbol) {
          this.success()
        } else {
          this.fail()
        }
      }
      this.doc = document.body
      this.doc.addEventListener('keydown', this.press)
    }
  
    success() {
      this.currentSymbol.classList.add('symbol_correct');
      this.currentSymbol = this.currentSymbol.nextElementSibling;
      if (this.currentSymbol !== null) {
        return;
      }

      clearInterval(this.time);
  
      if (++this.winsElement.textContent === 10) {
        this.doc.removeEventListener('keydown', this.press)
        alert('Победа!');
        this.reset();
      } else {
        this.setNewWord();
        this.timeOut()
      }
    }
  
    fail() {
      clearInterval(this.time);
      if (++this.lossElement.textContent === 5) {
        this.doc.removeEventListener('keydown', this.press)
        alert('Вы проиграли!');
        this.reset();
      } else {
        this.setNewWord();
        this.timeOut()
      }
    }
  
    setNewWord() {
      const word = this.getWord();
      this.text = word
  
      this.renderWord(word);
    }
  
    getWord() {
      const words = [
          'bob',
          'awesome',
          'netology',
          'hello',
          'kitty',
          'rock',
          'youtube',
          'popcorn',
          'cinema',
          'love',
          'javascript'
        ],
        index = Math.floor(Math.random() * words.length);
  
      return words[index];
    }
  
    renderWord(word) {
      const html = [...word]
        .map(
          (s, i) =>
            `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
        )
        .join('');
      this.wordElement.innerHTML = html;
  
      this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    }
  }
  
  new Game(document.getElementById('game'))