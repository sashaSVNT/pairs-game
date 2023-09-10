const wrapper = document.querySelector('.wrapper');

class Pairs {
  constructor() {
    this.grid = [];
    this.cache = [];
    this.isPlaying = true;
  }

  createItem(keys) {
    for (let n = 0, i = 0; i < keys; i++) {
      if (i % 2 === 0) {
        n++;
      }
      const key = {
        label: n,
        id: i,
        isOpen: false
      }
      this.grid.push(key);
    }
  }

  renderItems() {
    this.shuffle();
    this.grid.forEach(el => this.createCard(el));
  }

  createCard({ label, id, isOpen }) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.setAttribute("id", id);
    const numberFront = document.createElement('div');
    numberFront.classList.add('number-front');
    const numberBack = document.createElement('div');
    numberBack.classList.add('number-back');
    numberFront.innerText = '🤓';
    numberBack.innerText = label;
    if (isOpen) {
      rectangle.classList.add('flip');
    }
    rectangle.append(numberFront, numberBack);
    wrapper.append(rectangle);
  }

  newGame() {
    this.renderItems();
    wrapper.addEventListener('click', (e) => {
      const id = Number(e.target.closest('.rectangle').id);
      const index = this.grid.findIndex((el) => el.id === id);
      if (!this.grid[index].isOpen) {
        game.openCard(id);
      }
    });
  }

  shuffle() {
    for (let i = this.grid.length - 1; i > 0; i--) {
      let m = Math.floor(Math.random() * (i + 1));
      [this.grid[i], this.grid[m]] = [this.grid[m], this.grid[i]];
    }
  }

  openCard(id) {
    if (!this.isPlaying) {
      return;
    }
    const card = document.getElementById(id);
    card.classList.add('flip');
    const index = this.grid.findIndex((el) => el.id === id);
    this.grid[index].isOpen = true;
    setTimeout(() => {
      this.cacheOverflow(id);
    }, 500);
  }

  cacheOverflow(id) {
    const curElement = this.grid.filter((el) => el.id == id);
    this.cache = this.cache.concat(curElement);
    if (this.cache.length === 2) {
      const [first, second] = [this.cache[0], this.cache[1]];
      if (first.label !== second.label) {
        this.cache.forEach((cacheElement) => {
          const index = this.grid.findIndex((arrElement) => cacheElement.id === arrElement.id);
          cacheElement.isOpen = false;
          this.grid[index] = cacheElement;
          const card = document.getElementById(cacheElement.id);
          card.classList.remove("flip");
        })
      }
      this.cache = [];
    }
  }
}


const game = new Pairs();
game.createItem(12);
game.newGame();

