/* Game: Battleship;
Source: Head First JavaScript Programming by Eric Freeman;   
Aleksandr Momziakov */

// объект view отображает статус попадания/промаха по кораблю пользователем 
    const view = {
        displayMessage: function(msg) {   //метод получает строковое сообщение и выводит его
            const messageArea = document.getElementById("messageArea");
            messageArea.innerHTML = msg;
        },
        displayHit: function(location) {   //метод получает аргумент location, определяющий ячейку для вывода маркера (попадание)
            const cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
        },
        displayMiss: function(location) {   //метод получает аргумент location, определяющий ячейку для вывода маркера (промах)
            const cell = document.getElementById(location);
            cell.setAttribute("class", "miss");
        }
    };

//объект model отображает размер поля, количество кораблей, попаданий, состоит из нескольких методов для проверки статуса попадания по кораблю
   const model = {
        boardSize: 7, //размер поля
        numShips: 3,  //количество кораблей
        shipLength: 3, //количество клеток, занимаемое одним кораблем
        shipsSunk: 0, //количество попаданий
        ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] }, //местоположение кораблей, массив , указывающий координаты выстрелов от пользователя
                { locations: ["24", "34", "44"], hits: ["", "", ""] },
                { locations: ["10", "11", "12"], hits: ["", "", ""] }], 
        //метод fire записывает координаты, вводимые пользователем, сверяет с координатами корабля на поле
        fire: function(guess) {
            for (let i = 0; i < this.numShips; i++) {
                const ship = this.ships[i];
                const index = ship.locations.indexOf(guess);
                if (index >= 0) {
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
            view.displayMiss(guess);
            view.displayMessage("You missed!");
            return false;
        },
        //метод проверяет статус потопленности корабля (корабль занимает 3 ячейки)
        isSunk: function(ship) {
                    for (var i = 0; i < this.shipLength; i++) {
                    if (ship.hits[i] !== "hit") {
                    return false;
                } 
            }
            return true;
        }
    };

    //функция parseGuess трансформирует ось Y из цифр (0-6) в буквы латинского алфавита
    function parseGuess(guess) {
            const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
                if (guess === null || guess.length !== 2) { //условие проверяет: ввод пользователя не должен быть пустым, количество символов не должно превышать 2
                alert("Oops, please enter a letter and a number on the board.");
                } else {
                firstChar = guess.charAt(0);
                const row = alphabet.indexOf(firstChar);
                const column = guess.charAt(1);
                    if (isNaN(row) || isNaN(column)) {
                alert("Oops, that isn't on the board.");
                    } else if (row < 0 || row >= model.boardSize ||
                    column < 0 || column >= model.boardSize) {
                    alert("Oops, that's off the board!");
                    } else {
                    return row + column;
                }
            } return null;
        }

        //проверка корректности функции parseGuess
/* console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7")); */
    
//объект проверяет потоплены ли все корабли, чтобы закончить игру
const controller = {
        guesses: 0,
        processGuess: function(guess) {
            const location = parseGuess(guess);
             if (location) {
                this.guesses++;
                 const hit = model.fire(location);
                    if (hit && model.shipsSunk === model.numShips) { //Если выстрел попал в цель, а количество потопленных кораблей равно количеству кораблей в игре, выводится сообщение о том, что все корабли потоплены
                    view.displayMessage("You sank all my battleships, in " +
                    this.guesses + " guesses");
                }
            }
        }
    };

/*  controller.processGuess("A5");
controller.processGuess("B5");
controller.processGuess("C6");  */

    function init() { //ввод координат путем нажатия кнопки Fire
        const fireButton = document.getElementById("fireButton");
        fireButton.onclick = handleFireButton;
        const guessInput = document.getElementById("validationDefault01");
        guessInput.onkeypress = handleKeyPress;
    }

   function handleFireButton() {
        const guessInput = document.getElementById("validationDefault01");
        const guess = guessInput.value;
        controller.processGuess(guess);
        guessInput.value = "";
    }
    window.onload = init;

    function handleKeyPress(e) { //ввод координат клавишей Enter
        const fireButton = document.getElementById("fireButton");
        if (e.keyCode === 13) {
        fireButton.click();
        return false;
        }
    }
