var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOver,over_img,reset,re_img;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  over_img = loadImage ("gameOver.png");
  re_img = loadImage ("restart.png");
  
}

function setup() {
  createCanvas(displayWidth-10, displayHeight-115);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("stop",trex_collided );
  trex.scale = 0.5;
  trex.velocityX = 2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.scale = 1.5;
  
  gameOver = createSprite (300,100);
  reset = createSprite (300,150)
  
  invisibleGround = createSprite(displayWidth/2,190,displayWidth,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  camera.position.x = trex.x

  if (gameState === PLAY){
  score = score + Math.round(getFrameRate()/60);
  
    gameOver.visible = false;
    reset.visible = false;
    
    console.log (trex.y)

  spawnClouds();
  spawnObstacles();
    
  if(keyDown("space") && trex.y >161) {
    trex.velocityY = -10;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(obstaclesGroup.isTouching(trex)){
      
      gameState = END;
      
    }
  
  }else if (gameState === END ){
    
    trex.changeImage ("stop",trex_collided);
    
    trex.velocityX = 0;


    ground.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    gameOver.addImage ("end",over_img);
    reset.addImage ("end",re_img);
    
    reset.depth = obstaclesGroup.depth + 1;
    
    gameOver.visible = true;
    reset.visible = true;
    
    gameOver.x = trex.x;
    gameOver.y = 70;

    reset.x = trex.x;
    reset.y = 120;

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(reset)) {
    restart();
  }
    
  }
  
  text("Score: "+ score, trex.x + 500,50);
  
  trex.velocityY = trex.velocityY + 0.4;
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
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
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function restart(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation ("running", trex_running);
  
  score = 0;
  
  trex.velocityX = 2;

}