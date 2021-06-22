var PLAY = 1;
var END = 0;
var gameState = PLAY;

var yellow,pic;
var backdisplay, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  pic =   loadAnimation("jpgs/bird.png");

  backdisplay = loadImage("jpgs/background.jpg");
  
  
  
  obstacle1 = loadImage("jpgs/OBSTACLE.png");
 /* obstacle2 = loadImage("jpgs/obstacle2.png");
  obstacle3 = loadImage("jpgs/obstacle3.png");
  obstacle4 = loadImage("jpgs/obstacle4.png");
  obstacle5 = loadImage("jpgs/obstacle5.png");
  obstacle6 = loadImage("jpgs/obstacle6.png");
  cloudImage = loadImage("jpgs/cloud.png");
  gameOverImg = loadImage("jpgs/gameOver.png");
  restartImg = loadImage("jpgs/restart.png");*/
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(width/2,180,400,20);
  ground.addImage("background",backdisplay);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale= 2.5;

  yellow = createSprite(50,180,20,50);
  yellow.addAnimation("pic", pic);
  yellow.scale = 0.5;  
  
  gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  if (ground.x < 0){
    ground.x = 700;
  }
 /*text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if((touches.length>0||keyDown("space")) && trex.y >= 159) {
      trex.velocityY = -12;
      touches=[]
    } 
  
    trex.velocityY = trex.velocityY + 0.8
  
    
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0||mousePressedOver(restart)){ 
      reset();
    touches=[]
    }
  }
  */
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.addImage(obstacle1)
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}