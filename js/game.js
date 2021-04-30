let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let add_enemy1 = document.getElementsByClassName('enemy1');
let add_enemy2 = document.getElementsByClassName('enemy2');
let add_t = document.getElementsByClassName('tower');



let ground = new Image();
let enemy1 = new Image();
let hp_bar = new Image();
let tower1 = new Image();
let enemy2 = new Image();

enemy1.src = "img/enemy2.png"
tower1.src = "img/Tower3.png"
hp_bar.src = "img/hp.png";
enemy2.src = "img/enemy1.png";
ground.src = "img/ground.png";


[].forEach.call(add_enemy1, function(el){
    el.addEventListener('click', start_click)
});

[].forEach.call(add_enemy2, function(el){
    el.addEventListener('click', start_click2)
});

[].forEach.call(add_t, function(el){
    el.addEventListener('click', add_tower)
});

function start_click(event){
    AddEnemy(arr);
}

function start_click2(event){
    AddEnemy2(arr);
}

function add_tower(){
    cl = 1;
}

class Enemy {
    constructor(enemy) {
        this.x = enemy.x;
        this.y = enemy.y;
        this.img = enemy.img;
        this.xp = enemy.xp;
        this.max = enemy.max;
    }
}


class Tower {
    constructor(tower) {
        this.x = tower.x;
        this.y = tower.y;
        this.img = tower.img;
        this.xp = tower.xp;
        this.enemy = 0;
        this.rad = 300;
    }
}

let arr = new Array();
let towers = new Array();

function nextpos(enemy){
    if (enemy.x < 460)
        enemy.x++;
    else if (enemy.x == 460 && enemy.y < 480)
        enemy.y++;
    else
        enemy.x++;
}

function shotenemy(tower, arr) {

    if (arr.length == 0)
    {
        tower.enemy = 0;
        return;
    }
    if (tower.enemy == 0 || tower.enemy.xp <= 0 )
    {
        let min = 100000;
        let min_index;
        for (let index = 0; index < arr.length; index++) {
            let n = pifagor(tower.x, tower.y, arr[index].x, arr[index].y);
            if (n < min)
            {
                min_index = index;
                min = n;
            }
        }
        tower.enemy = arr[min_index];
    }
    if (pifagor(tower.x, tower.y, tower.enemy.x, tower.enemy.y) > tower.rad)
    {
        tower.enemy = 0;
    }
    else{
        tower.enemy.xp -= 0.1;
    }
}

function drawstart() {
    ctx.drawImage(ground, 0, 0, 1080, 720);
    let i = 0;
    while (i < arr.length) { // выведет 0, затем 1, затем 2
        if (arr[i].x > 1080 || arr[i].xp < 0)
        {
            console.log(arr[i].xp);
            arr.splice(i,1);
            i = 0;
            
        }
        i++;
    }
    for (i = towers.length - 1; i >= 0; i--) {
        shotenemy(towers[i], arr);
        ctx.drawImage(towers[i].img, towers[i].x, towers[i].y, 100, 100);
    }
    for (i = arr.length - 1; i >= 0; i--) {
        nextpos(arr[i], i);
        ctx.strokeRect(arr[i].x + - 1, arr[i].y - 1 , 102, 10);
        ctx.drawImage(hp_bar, arr[i].x, arr[i].y , arr[i].xp * 100 / arr[i].max, 8);
        ctx.drawImage(arr[i].img, arr[i].x, arr[i].y, 100, 100);
    }
    requestAnimationFrame(drawstart);
}

function AddTower(arr, x, y) {
    arr.push(new Tower({ x: x - 50, y: y - 80, img: tower1, xp:100}));
}

function AddEnemy(arr) {
    arr.push(new Enemy({ x: 0, y: 100, img: enemy1, xp:100, max:100}));
}

function AddEnemy2(arr) {
    arr.push(new Enemy({ x: 0, y: 100, img: enemy2, xp:300, max:300}));
}

function startgame() {
    AddEnemy(arr);
    drawstart();
}

let cl = 0;
let mousey;
let mousex;

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    mousex = event.clientX - rect.left;
    mousey = event.clientY - rect.top;
    if (cl == 1)
    {
        AddTower(towers, mousex, mousey);
        cl = 0;
    }
    console.log("Coordinate x: " + mousex, 
                "Coordinate y: " + mousey);
}


canvas.addEventListener("mousedown", function(e)
{
    getMousePosition(canvas, e);
});


function pifagor(x, y, xx, yy) {
    let a = Math.pow((xx - x), 2);
    let b = Math.pow((yy - y), 2);
    return Math.sqrt(a + b);
}


ground.onload = startgame;
