const wrapper = document.querySelector('.wrapper');

class Pairs {
  constructor() {
    this.arr = [];
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
    number.innerText = label;
    rectangle.append(number);
    wrapper.append(rectangle);
  }
  newGame() {
    this.renderItems();
  }
  shuffle() {
    for (let i = this.arr.length - 1; i > 0; i--) {
      let m = Math.floor(Math.random() * (i + 1));
      [this.arr[i], this.arr[m]] = [this.arr[m], this.arr[i]];
    }
  }
}


const game = new Pairs();
game.createItem(8);
game.newGame();
