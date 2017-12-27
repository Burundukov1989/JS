 function TLocalStorage() { //объявление класса - класс это свойство объекта
     this.Hash = {}; // объявление главного хэша
     
    this.addValue = function (name, Request, recipeRequest, MyType) {
        this.Hash[name] = {};                  //ключ хэша
        this.Hash[name][MyType] = Request;   //тип
        this.Hash[name]['Рецепт'] = recipeRequest;// ингредиенты
        //Преобразование хэша в строку, через JSON и запись в хранилище
        localStorage[name] = JSON.stringify(this.Hash[name]);    
        console.log(this.Hash);
            };
       
    this.getValue = function (name, MyType) { 
        //Восстановление хэша из строки через JSON        
        this.Hash[name]=JSON.parse(localStorage[name]);  
        if (this.Hash[name][MyType])
        {return this.Hash[name];} 
        else return false;
    };
    
    this.deleteValue = function (name, MyType) {  
        this.Hash[name]=JSON.parse(localStorage[name]);     
        if (localStorage.getItem(name) && this.Hash[name][MyType]) 
        {localStorage.removeItem(name);
        return true; }
        else return false;  
            };
     
    this.getKeys = function (MyType) {
        let keysArray = [], name;
        
//перебор элементов localStorage и вывод напитков/блюд     
        for (let i=0, k=localStorage.length; i < k; i++)
        { 
        name = localStorage.key(i);        
        this.Hash[name]=JSON.parse(localStorage[name]);                 
        if (this.Hash[name][MyType])
        {keysArray.push(name); } 
        };
        return keysArray;      
            };
            
    this.DeleteAll = function ()
    {
        localStorage.clear();          
    };
     
 };
  
 var DrinkLocalStorage = new TLocalStorage();
 var DishLocalStorage = new TLocalStorage();
 
 

