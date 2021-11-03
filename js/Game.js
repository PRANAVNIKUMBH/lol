class Game {
  constructor() {
    this.l = createElement("h2")
    this.l1 = createElement("h2")
    this.l2 = createElement("h2") 
    this.m = false
    this.ri = false
    this.bl = false
  }

  gs (){
    db.ref("gameState").on("value",data=>{
      gameState=data.val()
    })
  }
  //write the gameState value to the database
  us(count){
    db.ref("/").update({
      gameState:count
    })
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.gc()
    car1 = createSprite(width/2-150,height-150)
    car1.addImage("c1",c1) 
    car1.addImage("b",b) 
    car1.scale=0.07
    
    car2 = createSprite(width/2+150,height-150)
    car2.addImage("c2",c2) 
    car2.addImage("b",b) 
    car2.scale=0.07

    cars = [car1,car2]

    fg = new Group()
    cg = new Group()
    og = new Group()

    this.adds(fg,10 , f , 0.02)
    this.adds(cg,10 , c , 0.09)
    this.adds(og,10 , o , 0.04)
  }

  adds(g,num,img,s){
    for(var i = 0; i < num ; i++){
      var ob = createSprite(random(width/2-150,width/2+150),random(-height*4.5,height-100))
      ob.addImage (img)
      ob.scale = s
      g.add(ob)
    }
  }
  

  play(){
    form.r()
    Player.gpi()
    player.cae()
    this.l.html("Leader Board")
    this.l.position(width/3-60,40)
    this.l1.position(width/3-60,40*2)
    this.l2.position(width/3-60,40*3)
    
    if(players!==undefined){
     background("red")
     image(t,0,-height*5,width,height*6) 
     this.ra()
     this.lff()
     this.fb()
     var index = 0 
     for (var i in players){
       index = index+1
       var x = players[i].positionX;
       var y = height - players[i].positionY;

       cars[index - 1].position.x = x;
       cars[index - 1].position.y = y;
       
        if(players[i].lf<=0){
          cars[index-1].changeImage('b')
          cars[index-1].scale = 0.3
          this.bl = true
          this.m = false
        }
       if (index===player.index){
         camera.position.y = cars[index - 1].position.y
         cars[index-1].overlap(fg,function(a,b){
           player.f = 100
           b.remove()
         })
         
         cars[index-1].overlap(cg,function(a,b){
          player.s = player.s + 1
          player.ud()
          b.remove()
        })

        if (cars[index-1].collide(og)){
          if (this.ri){
            player.positionX = player.positionX-50
          }else{
            player.positionX = player.positionX+50
          }
          
          if (player.lf>0){
            player.lf = player.lf -25

          }
           player.ud()
        }
          if (index===1){
            if (cars[index-1].collide(cars[1])){
              if (this.ri){
                player.positionX = player.positionX-50
              }else{
                player.positionX = player.positionX+50
              }
              
              if (player.lf>0){
                player.lf = player.lf -25
    
              }
               player.ud()
            }

          }

          if (index===2){
            if (cars[index-1].collide(cars[0])){
              if (this.ri){
                player.positionX = player.positionX-50
              }else{
                player.positionX = player.positionX+50
              }
              
              if (player.lf>0){
                player.lf = player.lf -25
    
              }
               player.ud()
            }

          }

         if (player.f>0&&this.m){
           player.f = player.f-0.2
         }
         if (player.f<=0){
          gameState = 2
          swal({
            title:'You where not capeble'
          })
         }
       }
     }
    if (this.bl===false){

     if (keyIsDown(UP_ARROW)) {
      this.m = true
      player.positionY =player.positionY+ 10;
      player.ud();
    }

    if (keyIsDown(DOWN_ARROW)) {
      player.positionY =player.positionY-  10;
      player.ud();
    }

    if (keyIsDown(LEFT_ARROW)&&player.positionX>width/3-50) {
      this.ri = false
      player.positionX =player.positionX-  5;
      player.ud();
    }

    if (keyIsDown(RIGHT_ARROW)&&player.positionX<width/2+250) {
      this.ri = true
      player.positionX =player.positionX+  5;
      player.ud();
    }
  }
     if (player.positionY>height*6-100){
      gameState=2
      player.rank = player.rank +1
      Player.caeu(player.rank)
      player.ud()
      swal ({
        title:"You Won",
        text:player.rank 
      })
     }
     drawSprites()
    }
  }

  ra(){
    var leader1,leader2
    var player = Object.values(players)
    leader1 = player[0].rank+"   "+player[0].name+"   "+player[0].s
    leader2 = player[1].rank+"   "+player[1].name+"   "+player[1].s
    this.l1.html(leader1)
    this.l2.html(leader2)
  }

  lff(){
    fill('white')
    rect(width/2-100,height-player.positionY-200,100,20)
    
    fill('red')
    rect(width/2-100,height-player.positionY-200,player.lf,20)
    
  }
  
  fb (){
    fill('white')
    rect(width/2-100,height-player.positionY-150,100,20)
    
    fill('blue')
    rect(width/2-100,height-player.positionY-150,player.f,20)
    
  }

}
