const canvas = document.querySelector('canvas');
const cnv = canvas.getContext('2d');

window.onload = function() {
  
    //для канваса
    const canvas = document.querySelector("canvas");
    const cnv = canvas.getContext("2d");
  
    //images
    var img_switch_off = new Image();
    img_switch_off.src = 'https://matv864.github.io/progamist/images/switch_off.png';
  
    var img_switch_on = new Image();
    img_switch_on.src = 'https://matv864.github.io/progamist/images/switch_on.png';
    
    var img_not = new Image();
    img_not.src = 'https://matv864.github.io/progamist/images/not.png';
  
    var img_and = new Image();
    img_and.src = 'https://matv864.github.io/progamist/images/and.png';
  
    var img_or = new Image();
    img_or.src = 'https://matv864.github.io/progamist/images/or.png';
    
    var img_lamps = new Image();
    img_lamps.src = 'https://matv864.github.io/progamist/images/lamps.png';
    
    //время для раскадровки
    const date = new Date();
    var oldTime = Date.now();
  
    //переменные
    let str, str1, str2, str3
    let bool 
    let time_let
    let x_, y_
    
    let switch_arr = [
      [100, 100],
      [100, 200],
      [100, 300],
      [100, 400]
    ];
  
    let not_arr = [
      [300, 400, 379, 400],
      [500, 210, 579, 210],
      [500, 400, 579, 400],
    ];
    
    let and_arr = [
      [400, 100, 400, 120, 478, 110],
      [200, 200, 200, 220, 278, 210]
    ];
    
    let line_arr = [
      //1 и 3) Рычаги с "И"
      [100, 100, 400, 100],
      [478, 110, 700, 110],
  
      [100, 300, 200, 300],
      [200, 300, 400, 300],
      [400, 300, 400, 120],

  
      //2 и 3 ) Рычаги -> "И" - > "Не"**2
      [100, 200, 200, 200],
      [200, 300, 200, 220],

      [278, 210, 500, 210],
      [579, 210, 700, 210],
      [500, 210, 500, 400],
      [579, 400, 700, 400],
      
      //4) Рычаг -> "Не"
      [100, 400, 300, 400],
      [379, 400, 450, 400],
      [450, 400, 450, 300],
      [450, 300, 700, 300]
  
    ];
    
    let light_arr = [
      [700, 110],
      [700, 210],
      [700, 300],
      [700, 400]
    ];
  
    let or_arr = [
      
    ];
  
    //словарь(коллекция)
    var energy = new Map();

  //константы рычагов
    energy['100400'] = true
  
    //отрисовка
    //---------------------------------------
    function create_switch(x, y) {
      str = String(x) + String(y)
      if(energy[str]){
        cnv.drawImage(img_switch_on, 0, 0, 100, 100, x - 90, y - 59, 100, 100);
      }
      else{
        cnv.drawImage(img_switch_off,0, 0, 100, 100, x - 90, y - 59, 100, 100);
      }
    }
  
    function create_line(x1, y1, x2, y2){
      str1 = String(x1) + String(y1)
      str2 = String(x2) + String(y2)
      energy[str2] = energy[str1]
      bool = energy[str1]
      
      cnv.beginPath()
      cnv.moveTo(x1, y1)
      cnv.lineTo(x2, y2)
      cnv.lineWidth = 5
      if(bool){
        cnv.strokeStyle = '#cccc5a'
      }
      else{
        cnv.strokeStyle = '#2e3031'
      }
      cnv.stroke()
      cnv.closePath()
  
      cnv.beginPath()
      if(bool){
        cnv.rect(x1 - 5, y1 - 5, 10, 10)
        cnv.fillStyle = '#cccc5a'
      }
      else{
        cnv.rect(x1 - 6, y1 - 6, 12, 12)
        cnv.fillStyle = '#2e3031'
      }
      cnv.fill()
      cnv.closePath()
  
      cnv.beginPath()
      cnv.rect(x2 - 5, y2 - 5, 10, 10)
      if(bool){
        cnv.fillStyle = '#cccc5a'
      }
      else{
        cnv.fillStyle = '#2e3031'
      }
      cnv.fill()
      cnv.closePath()
  
      /*cnv.beginPath()
      cnv.rect(x2 - 2, y2 - 2, 4, 4)
      cnv.fillStyle = '#706c6c'
      cnv.fill()
      cnv.closePath()*/
      
    }
  
    function create_light(x, y) {
      str = String(x) + String(y)
      cnv.beginPath()
      cnv.arc(x, y, 10, 0, 2 * Math.PI);
      cnv.strokeStyle = 'black'
      cnv.lineWidth = 1
      cnv.stroke()
      cnv.closePath()
  
      cnv.beginPath()
      cnv.arc(x, y, 10, 0, 2 * Math.PI);
      if(energy[str]){
        cnv.fillStyle = 'green'
      }
      else{
        cnv.fillStyle = 'black'
      }
      //cnv.fillStyle = 'green'
      cnv.fill()
      cnv.closePath()
    }
  
    function create_or(x1, y1, x2, y2, x3, y3) {
      str1 = String(x1) + String(y1)
      str2 = String(x2) + String(y2)
      str3 = String(x3) + String(y3)
  
      energy[str3] = Boolean(energy[str1] || energy[str2])
      
      cnv.drawImage(img_or,0, 0, 100, 100, x1 - 7, y1 - 17, 100, 100);
    }
  
    function create_not(x1, y1, x2, y2) {
      str1 = String(x1) + String(y1)
      str2 = String(x2) + String(y2)
      
      energy[str2] = !energy[str1]
      
      cnv.drawImage(img_not,0, 0, 100, 100, x1 - 8, y1 - 17, 100, 100);
      
    }
  
    function create_and(x1, y1, x2, y2, x3, y3) {
      str1 = String(x1) + String(y1)
      str2 = String(x2) + String(y2)
      str3 = String(x3) + String(y3)
  
      energy[str3] = Boolean(energy[str1] && energy[str2])
  
      cnv.drawImage(img_and,0, 0, 100, 100, x1 - 8, y1 - 17, 100, 100);
    }
    
  
    //--------------------------------------
  
    //события клавиатуры
    function event_mouse(event) {
      x_ = event.pageX
      y_ = event.pageY
      str = String(x_) + String(y_)
  
      for(let i = 0;i < switch_arr.length;i++){
        if(switch_arr[i][1] + 41 >= y_ && switch_arr[i][1] - 59 <= y_){
          str = String(switch_arr[i][0]) + String(switch_arr[i][1])
          energy[str] = !energy[str]
          break
        }
      }
    }
    
    //полная отрисовка и прослушчик клавиатуры
    function main_move(){
      cnv.clearRect(0, 0, 1100, 600)
      canvas.addEventListener("click", event_mouse);
  
      //cnv.drawImage(img_lamps, 0, 0, 30, 30, 700, 0, 400, 600);
      
      for(let i = 0;i < switch_arr.length;i++){
        create_switch(switch_arr[i][0], switch_arr[i][1])
      }
      
      for(let i = 0;i < line_arr.length;i++){
        create_line(line_arr[i][0], line_arr[i][1], line_arr[i][2], line_arr[i][3])
      }
      
      for(let i = 0;i < light_arr.length;i++){
        create_light(light_arr[i][0], light_arr[i][1])
      }
  
      for(let i = 0;i < or_arr.length;i++){
        create_or(or_arr[i][0], or_arr[i][1], or_arr[i][2], or_arr[i][3], or_arr[i][4], or_arr[i][5] )
      }
  
      for(let i = 0;i < not_arr.length;i++){
        create_not(not_arr[i][0], not_arr[i][1], not_arr[i][2], not_arr[i][3])
      }
  
      for(let i = 0;i < and_arr.length;i++){
        create_and( and_arr[i][0], and_arr[i][1], and_arr[i][2], and_arr[i][3], and_arr[i][4], and_arr[i][5] )
      }
      
    }
    
    //раскадровка
    function zoro(){
      main_move()
        /*if(Date.now() - oldTime > 0.01){
          main_move()
          oldTime = Date.now()
        }*/
      requestAnimationFrame(zoro)
    }
    //zoro()
    //cnv.drawImage(img_lamps, 0, 0, 30, 30, 700, 0, 400, 600);
    requestAnimationFrame(zoro)
  }
