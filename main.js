const wrapper = document.querySelector('.wrapper');

class Pairs {
  constructor() {
    this.arr = [1, 1, 2, 2, 3, 3, 4, 4];
  }
  renderItems() {
    this.arr.forEach(num => this.createItem(num));
  }
  createItem(num) {
    const rectangle = document.createElement('div');
    rectangle.classList.add('rectangle');
    const number = document.createElement('span');
    number.classList.add('number');
    number.innerText = num;
    rectangle.append(number);
    wrapper.append(rectangle);
  }
  newGame() {
    this.renderItems();
  }
}


const game = new Pairs();
game.newGame();
