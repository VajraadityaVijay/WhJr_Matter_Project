const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var structure, ground, cieling;
var shooter, aNumber;
var balls = [];

var PLAY = 0;
var WON = 1;

var gameState = PLAY;
var emptyArray = [];
var youWin;

function setup() {
  createCanvas(800, 400);

  engine = Engine.create();
  world = engine.world;

  shooter = createSprite(100, 300, 60, 20);
  shooter.shapeColor = 255, 255, 100, 127;
  shooter.rotation = 180;
  aNumber = 1000;
  shooter.depth = -aNumber;

  balls[0] = new Ball(shooter.position);
  balls[0].shoot();

  structure = new Structure(530, 295, 15, 15, 5, 10);
  structure.setColors();
  structure.display();

  ground = Matter.Bodies.rectangle(560, 300, 90, 8, { isStatic: true });
  World.add(world, ground)

  cieling = Matter.Bodies.rectangle(width / 2, 0, width, 8);
  cieling.isStatic = true;
  World.add(world, cieling)
}


function draw() {
  background(100)
  Engine.update(engine);

  structure.display();

  drawSprites();

  fill(0)
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, 90, 5)
  rect(cieling.position.x, cieling.position.y, width, 5)

  for (var i = 0; i < balls.length; i++) {
    balls[i].display();
  }

  if (gameState === PLAY) {
    shooter.pointTo(mouseX, mouseY);
    shooter.depth = -aNumber;
  } else if (gameState === WON) {
    youWin = createImg("You_Win.png");
    youWin.position(0, 0);
  }

  emptyArray = [];
  handleGameStates(emptyArray);
}

function mouseClicked() {
  if (gameState === PLAY) {
    balls[balls.length] = new Ball(100, 300)
    balls[balls.length - 1].shoot();
    aNumber += balls.length;
  }
}

function handleGameStates(emptyArray) {
  for (var i = 0; i < structure.structureGroup.length; i++) {
    if (Matter.SAT.collides(structure.structureGroup[i], ground).collided) {
      gameState = PLAY;
    }
  }

  for (var i = 0; i < structure.structureGroup.length; i++) {
    if (Matter.SAT.collides(structure.structureGroup[i], ground).collided === false) {
      emptyArray.push(i);
    }

    if (emptyArray.length === structure.structureGroup.length) {
      gameState = WON;
      break;
    }
  }
}