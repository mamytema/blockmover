/* eslint-disable no-prototype-builtins */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
const Discord = require('discord.js');
const client = new Discord.Client();

try {
client.once('ready', () => {
    console.log('Ready!');
});

function ranint(min, max) {
    const ran = Math.floor(Math.random() * (max - min) + min);
    return ran;
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const print = console.log;
let playerx;
let playery;
let playertile = 'floor'

let spot1 = {
    pos: [6, 5],
    done: false
}

try {
class tile {
    constructor(pos, type) {
        this.pos = pos;
        this.type= type;
    }
    updatePos(pos) {
        this.pos = pos;
    }
    updateType(type) {
        this.type = type;
    }
    _type() {
        return this.type;
    }
    _pos() {
        return this.pos;
    }

}
//:penguin: :brown_square: :black_large_square: :package: :o: :no_entry_sign: 
function tileType(type) {
    switch(type) {
        case 'player':
            return '😳'
        case 'floor':
            return '⬛'
        case 'wall':
            return '🟫'
        case 'box':
            return '🧊'
        case 'point':
            return '⭕'
        case 'boxpoint':
            return '❌'
        default:
            return '&'
    }
}
var tiles = {}

function tox(x) {
    return `x${x}`
}
function toy(y) {
    return `y${y}`
}
function findTile(x, y) {
    let foundTile;
    foundTile = tiles[tox(x)][toy(y)];
    return foundTile;
}

function generate(x, y) {
    for (let X=1; X <= x; X++) {
        tiles[tox(X)] = {};
        for (let Y=1; Y <= y; Y++) {
            let newtile;
            if (X == 1) {
                newtile = new tile([X, Y], 'wall')
            } else if (X == x) {
                newtile = new tile([X, Y], 'wall')
            } else if (Y == 1) {
                newtile = new tile([X, Y], 'wall')
            } else if (Y == y) {
                newtile = new tile([X, Y], 'wall')
            } else {
                newtile = new tile([X, Y], 'floor')
            }
            tiles[tox(X)][toy(Y)] = newtile;
        }
    }
    let X = Math.floor(x / 2);
    let Y = Math.floor(y / 2)
    tiles[tox(X)][toy(Y)] = new tile([X, Y], 'player')
    playerx = X;
    playery = Y;
    tiles[tox(3)][toy(3)] = new tile([3,3], 'box')
    tiles[tox(7)][toy(5)] = new tile([7,3], 'boxpoint')
}
generate(12, 12)
function draw() {
    let lines = [];
    let txt = '';
    for (const key in tiles) {
        if (tiles.hasOwnProperty(key)) {
            const element = tiles[key];
            txt = '';
            for (const k in element) {
                if (element.hasOwnProperty(k)) {
                    const elem = element[k];
                    txt = txt + tileType(elem.type)
                }
            }
            lines.push(txt)
        }
    }
    let b = ''
    for (let index = 0; index < lines.length; index++) {
        const element = lines[index];
        b = b + element + '\n'
    }
    print(b)
    let channel = client.channels.cache.get('703562817353285663')
    channel.send(`${b}`)
}
function moveXY(dir, x, y) {
    if (dir == 'w') {
        x--;
    } else if (dir == 's') {
        x++;
    } else if (dir == 'a') {
        y--;
    } else if (dir == 'd') {
        y++;
    } 
    return [x, y]
}
function move(dir) {

    switch(dir) {
        case 'w':
            break;
        case 's':
            break;
        case 'a':
            break;
        case 'd':
            break;
        default:
            return
    }
    let _player = tiles[tox(playerx)][toy(playery)] // the class of player
    let tileToMoveTo;
    let x = playerx;
    let y = playery;

    let _z = moveXY(dir, x, y);
    x = _z[0];
    y = _z[1];

    tileToMoveTo = findTile(x, y);
    if (tileToMoveTo.type == 'wall') {
        print('You cant go inside walls!')
        return;
    }
    let nx = x;
    let ny = y;
    if (tileToMoveTo.type == 'box') {
        let z = moveXY(dir, x, y);
        nx = z[0];
        ny = z[1];
        let othertile = findTile(nx, ny)
        if (othertile.type == 'wall' || othertile.type == 'box') {
            print('You cant push the box into a wall/box')
            return;
        }
        if (othertile.type == 'boxpoint') {
            othertile.type = 'point'
        } else {
            othertile.type = 'box'
        }
    }
    print('Redrawing tiles..')
    _player.type = playertile;
    if (tileToMoveTo.type == 'box' || tileToMoveTo.type == 'wall') {
        playertile = 'floor';
    } else {
        playertile = tileToMoveTo.type;
    }
    tileToMoveTo.type = 'player';
    playerx = x;
    playery = y;
    draw()
}
rl.setPrompt('<$> ');
rl.prompt();
rl.on('line', function(line) {
    move(line)
    rl.prompt();
}).on('close',function(){
    process.exit(0);
});

} catch (err) {
    console.log(err)
}

client.on('message', message => {

});


client.login('you no steal my token grrrrrrrrrr');
} catch(err) {
    console.log(err)
}