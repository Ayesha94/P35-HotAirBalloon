function preload()
{
  backImg=loadImage("Hot Air Ballon-01.png");
  balloonImgUp=loadImage("Hot Air Ballon-04.png")
  balloonImgDown=loadImage("Hot Air Ballon-03.png")
  balloonImgLR=loadImage("Hot Air Ballon-02.png");
}
function setup() {
  database=firebase.database();
  createCanvas(windowWidth,windowHeight);
  balloon=createSprite(400, 200);
  balloon.addImage(balloonImgUp);
  balloonPos=database.ref("balloon/position");
  balloonPos.on("value", readPosition, showErr)
}
function readPosition(data)
{
 position=data.val();
 console.log(position);
 balloon.x=position.x;
 balloon.y=position.y;
}
function writePosition(x, y)
{
  database.ref("balloon/position").set({
    x: position.x+x,
    y: position.y+y
  })
}
function showErr()
{
  console.log("error in retrieving values");
}
function draw() {
  background(backImg); 
  if(keyDown(LEFT_ARROW))
  {
    balloon.addImage(balloonImgLR)
    writePosition(-1, 0);
    
  } 
  else if(keyDown(RIGHT_ARROW))
  {
    balloon.addImage(balloonImgLR)
    writePosition(1, 0);
  }
  
  else if(keyDown(UP_ARROW))
  {
    balloon.addImage(balloonImgUp)
    writePosition(0, -1);
    if(balloon.scale<1)
      balloon.scale=balloon.scale+0.01
  }
  
  else if(keyDown(DOWN_ARROW))
  {
    
    
    writePosition(0, 1);
    balloon.addImage(balloonImgDown)
    if(balloon.scale>0.5)
      balloon.scale=balloon.scale-0.01
  }
  drawSprites();
  textSize(20)
  fill("red")
  text("Use Arrow keys to move hot air balloon", 400, 50);
}