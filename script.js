/* Game: Battleship;
   Author: Aleksandr Momziakov */

   //создаем объект model
   var model = {
    boardSize: 7, //размер поля
    numShips: 3,  //количество кораблей
    shipLength: 3, //количество клеток, занимаемое одним кораблем
    shipsSunk: 0, //количество попаданий
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] }, //местоположение корабля, массив , указывающий координаты выстрелов от пользователя
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }], 
    //метод fire записывает координаты, вводимые пользователем, сверяет с координатами корабля на поле
    fire: function(guess) {
                for (var i = 0; i < this.numShips; i++) {
                var ship = this.ships[i];
                location = ship.locations;
                var index = locations.indexOf(guess);
                if (index >= 0) {
                ship.hits[index] = "hit";
                return true;
            }
        }
        return false;
    }
};