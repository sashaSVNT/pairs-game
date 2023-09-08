const wrapper = document.querySelector('.wrapper');

class Pairs {
  constructor() {
    this.arr = [];
    this.cache = [];
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
      this.arr.push(key);
    }
  }
  renderItems() {
    this.shuffle();
    this.arr.forEach(el => this.createCard(el));
  }
  createCard({ label, id, isOpen }) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    rectangle.setAttribute("id", id);
    const number = document.createElement('span');
    number.classList.add('number');
    if (isOpen) {
      number.innerText = label;
      number.classList.add('visible');
    }
    rectangle.append(number);
    wrapper.append(rectangle);
  }
  newGame() {
    this.renderItems();
    wrapper.addEventListener('click', (e) => {
      const id = Number(e.target.id);
      const index = this.arr.findIndex((el) => el.id === id);
      if (!this.arr[index].isOpen) {
        game.openCard(id);
      }
    });
  }
  shuffle() {
    for (let i = this.arr.length - 1; i > 0; i--) {
      let m = Math.floor(Math.random() * (i + 1));
      [this.arr[i], this.arr[m]] = [this.arr[m], this.arr[i]];
    }
  }
  openCard(id) {
    const card = document.getElementById(id);
    const number = card.children[0];
    const index = this.arr.findIndex((el) => el.id === id);
    const { label } = this.arr[index];
    this.arr[index].isOpen = true;
    number.innerText = label;
    number.classList.add("visible");
    setTimeout(() => {
      this.cacheOverflow(id);
    }, 500);
  }
  cacheOverflow(id) {
    const curElement = this.arr.filter((el) => el.id == id);
    this.cache = this.cache.concat(curElement);
    if (this.cache.length === 2) {
      const [first, second] = [this.cache[0], this.cache[1]];
      if (first.label !== second.label) {
        this.cache.forEach((cacheElement) => {
          const index = this.arr.findIndex((arrElement) => cacheElement.id === arrElement.id);
          cacheElement.isOpen = false;
          this.arr[index] = cacheElement;
          const card = document.getElementById(cacheElement.id);
          const number = card.children[0];
          number.innerText = '';
          number.classList.remove("visible");
        })
      }
      this.cache = [];
    }
  }
}


const game = new Pairs();
game.createItem(8);
game.newGame();

