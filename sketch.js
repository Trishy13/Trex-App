var trex,trexrun,ground,gi,ground2,cloudi,cloud;
var cactus,c1,c2,c3,c4,c5,c6,trexover;
var play=0,end=1,gs=play,cloudg,cactusg;
var gameover,gameoveri,reset,reseti;
var score=0,hs=0,die,jump,cp;

function preload(){
trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
trexover=loadAnimation("trex_collided.png");

gameoveri=loadImage("gameOver.png");
reseti=loadImage("restart.png");
  
cloudi=loadImage("cloud.png");
  
gi=loadImage("ground2.png");

c1=loadImage("obstacle1.png");
c2=loadImage("obstacle2.png");
c3=loadImage("obstacle3.png");
c4=loadImage("obstacle4.png");
c5=loadImage("obstacle5.png");
c6=loadImage("obstacle6.png");
  
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  cp=loadSound("checkPoint.mp3");
}
 
function setup(){
createCanvas(windowWidth,windowHeight) ;

trex=createSprite(50,height-50,10,10);
trex.addAnimation("runtrex",trexrun);
trex.addAnimation("gameo",trexover);
trex.scale=0.5;

ground=createSprite(width/2,height-40,width,5);
ground.addImage(gi);

ground2=createSprite(width/2,height-30,width,5);
ground2.visible=false;
  
  cloudg=new Group();
  cactusg=new Group();
  
  trex.debug=false;
  trex.setCollider("rectangle",0,0,80,trex.height);
  
  gameover=createSprite(width/2,height/2,5,5);
  gameover.addImage(gameoveri);
  gameover.scale=0.6;
  
  reset=createSprite(width/2,height/2,5,5);
  reset.addImage(reseti);
  reset.scale=0.4;
}
               
function draw(){
background(0);
  
if(score>hs){
  hs=score;
}
  textSize(15);
  fill(255);
  text("Score: "+score,width-100,30);
  text("HS: "+hs,width-200,30);
  
  
if(gs===play){
  
  trex.changeAnimation("runtrex",trexrun);
  
  gameover.visible=false;
  reset.visible=false;
  ground.velocityX=-(3+ Math.round(score/300));
  
  score=score+Math.round(getFrameRate()/61);
  if(score%100===0){
    cp.play();
  }


  if(ground.x<0){
ground.x= ground.width/2;
}
  
  if((keyDown("space") || touches.length>0) && trex.y>height-60){
trex.velocityY=-12;
jump.play();
touches=[];
}
  
  trex.velocityY= trex.velocityY+0.5;
  
  trex.collide(ground2);
spawnCactus();
spawnClouds();
  
  if(trex.isTouching(cactusg)){
    gs=end;
    die.play();
  }
  
}
  
  if(gs===end){
    
    trex.velocityY=0;
    ground.velocityX=0;
    cloudg.setVelocityXEach(0);
    cactusg.setVelocityXEach(0);
    
    cloudg.setLifetimeEach(-1);
    cactusg.setLifetimeEach(-1);
    gameover.visible=true;
    reset.visible=true;
    trex.changeAnimation("gameo",trexover);
    
    if(mousePressedOver(reset) || touches.length>0){
      restart();
      touches=[];
    }
  }

drawSprites();
}

function restart(){
  
  gs=play;
  cloudg.destroyEach();
  cactusg.destroyEach();
  score=0;
}

function spawnClouds(){
if(frameCount % 180 === 0){
  cloud=createSprite(width,random(5,50),5,5);
  cloud.addImage(cloudi);
  cloud.velocityX=-1.5;
  cloud.scale=0.5;
  cloud.lifetime=width/2;
  cloud.depth=trex.depth;
  trex.depth=trex.depth+1;
  cloudg.add(cloud);
}
}

function spawnCactus(){
if(frameCount % 120 === 0){
  cactus=createSprite(width,height-60,5,5);
  cactus.velocityX=-(3+ Math.round(score/300));
  cactus.lifetime=width/2;
  cactus.scale=0.5;
  cactusg.add(cactus);
  var a=Math.round(random(1,6));
  switch(a){
    case 1: cactus.addImage(c1);
    break;
    case 2: cactus.addImage(c2);
    break;
    case 3: cactus.addImage(c3);
    break;
    case 4: cactus.addImage(c4);
    break;
    case 5: cactus.addImage(c5);
    break;
    case 6: cactus.addImage(c6);
    break;
    default: break;
    
  }
}
}