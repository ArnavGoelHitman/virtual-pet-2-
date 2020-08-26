//Create variables here
var dog,happyDog,foodS=20,foodStock,database,dogImage,happyDogImage,food=0;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(400,250,20,20);
  dog.addImage(dogImage);
  dog.scale=0.20;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,writeStock);
foodObj = new Food();


  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
 

  drawSprites();
 
  
  //add styles here
 foodObj.display();
  fedTime = database.ref('Feed Time');
  fedTime.on("value",function(data){
    lastFed = data.val();

  }) ;
  fill(255,255,254);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed"+lastFed%12+"PM",350,30);
    
  }else if (lastFed==0) {
    text("Last Feed : 12AM",350,30);


  }else {
    text("Last Feed : " +lastFed+"AM",350,30);

  }

}
function readStock(data){
  foodS = data.val();
  
  
  foodObj.updateFoodStock(foodS);

  
}
function writeStock(x){
  if (x<=0) {
    x=0;
  }else{
    x=x-1;

  }
  database.ref('/').update({
    Food:x
  })
}
function addFoods() {
  foodS++
  database.ref('/').update({
    Food:foodS
  })
  
}
function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}




