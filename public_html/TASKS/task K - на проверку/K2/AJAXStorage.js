
 
 var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
 var Password='123';
 var Hash={};
 
 function TAJAXStorage() { //объявление класса - класс это свойство объекта
     this.Hash = {}; // объявление главного хэша
     
    this.addValue = function (name, Request, recipeRequest, MyType) {
        this.Hash[name] = {};                  //ключ хэша
        this.Hash[name][MyType] = Request;   //тип
        this.Hash[name]['Рецепт'] = recipeRequest;// ингредиенты
        //Преобразование хэша в строку, через JSON и запись в хранилище
        localStorage[name] = JSON.stringify(this.Hash[name]); 
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
    

// чтение строки и планирование её изменения В ТЕЧЕНИИ МИНУТЫ
this.storeInfo = function(name, Request, recipeRequest)  
     {
console.log('сработало storeInfo!');
    $.ajax( {
            url : ajaxHandlerScript, 
           type : 'POST', 
          cache : false, 
        dataType:'json',
           data : { f : 'LOCKGET', 
                    n : name,
                    p : Password },
        success : lockGetReady(name, Request, recipeRequest),
          error : errorHandler
        }
    );
};

//изменениe строки 
function lockGetReady(name, Request, recipeRequest) {
  console.log('сработало lockGetReady!');
        // нам всё равно, что было прочитано - 
        // всё равно перезаписываем
        
var info={
          Myname : name,
          Alcohol : Request,
          recipe : recipeRequest            
        }; 
  console.log(info);
        $.ajax( {
                url : ajaxHandlerScript, 
               type : 'POST', 
              cache : false,
             ataType:'json',
               data : { f : 'UPDATE',
                        n : name, 
                        v : JSON.stringify(info),
                        p : Password },
            success : updateReady,
              error : errorHandler
            }
        );
}




//запрос о существовании имени
this.restoreInfo = function(name) {
    
    $.ajax(
        {
            url : ajaxHandlerScript, 
           type : 'POST', 
          cache : false, 
        dataType:'json',
           data : { f : 'READ', 
                    n : name},
            success : readReady, 
            error : errorHandler
        }
    );
};

//перезаписываем страницу
readReady = function(callresult) {
    if ( callresult.error!==undefined )
    { alert(callresult.error);
        
document.getElementById('IContDrinksAJAX').innerHTML = 'На сервере нет данных!';}
   
    else if ( callresult.result!=="" ) {
info=JSON.parse(callresult.result); 

document.getElementById('IContDrinksAJAX').innerHTML = 
        `Название напитка: ${info.Myname}; \n Алкогольный? ${info.Alcohol}; \n Рецепт: ${info.recipe}`;
    }
};

function updateReady(callresult) {
    if ( callresult.error!==undefined )
        alert(callresult.error); 
}

function errorHandler(statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
  
    
     
};
  
 var DrinkLocalStorage = new TAJAXStorage();
 var DishLocalStorage = new TAJAXStorage();
 
 

