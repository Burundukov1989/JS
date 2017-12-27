     
       function THashStorage() {  //объявление класса - класс это свойство объекта
            this.Hash = {}; // объявление главного хэша
            
            this.addValue = function (name, alcRequest, receptRequest) {
                this.Hash[name] = {};                  //ключ хэша
                this.Hash[name]['alcohol'] = alcRequest;   //булевый алкоголь
                this.Hash[name]['recipe'] = receptRequest;// ингредиенты
                return this.Hash; //возвращение значения функции в виде хэша
            };
            this.getValue = function (name) { // показать ключ хэша
                
                return this.Hash[name];
            };
            this.deleteValue = function (name) { //удалить из хэша значение по ключу
                if (name in this.Hash) {
                    delete this.Hash[name];
                    return true; }
                else return false;
            };
            this.getKeys = function (name) {// создать новый массив из ключей хэша
                var keysArray = [];
                for (name in this.Hash) { //поиск ключей в исходном хэше
                    keysArray.push(name); //добавить элементы в новый массив
                } return keysArray;
            };
        }
                var DrinkStorage = new THashStorage(); //новый объект со свойствами класса