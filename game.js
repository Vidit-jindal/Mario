onload = function () {
    steps = 16;
    move_step = steps * 5;
    fly_step = steps * 15;
    ground_height = 0;
    asset_height = 16;
    platforms_array = [];
    moves = [];
    profit = [];
    pos = 0;
    onGround = true;

    BootState = {
        init : function () {
            game.stage.backgroundColor = '#5c94fc';
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // game.scale.pageAlignHorizontally = true;
            // game.scale.pageAlignVertically = true;
        },
        create : function () {
            this.state.start("PreloadState");
        }
    };
    
    PreloadState = {
        preload : function () {
            game.load.spritesheet('enemy', 'assets/goomba_nmbtds.png', 16, 16);
            game.load.spritesheet('mario', 'assets/mario_wjlfy5.png', 16, 16);
            game.load.spritesheet('coin', 'assets/coin_iormvy.png', 16, 16);
            game.load.spritesheet('flag', 'assets/flag.png', 33, 168);
            game.load.image('cloud', 'assets/cloud.png');
            game.load.image('grass', 'assets/grass.png');
            game.load.image('tile', 'assets/tile.png');
            game.load.image('pipe1', 'assets/pipe1.gif');
            game.load.image('pipe2', 'assets/pipe2.gif');
            game.load.image('castle', 'assets/castle.gif');
            game.load.image('ground', 'assets/ground.png');
        },
        create : function () {
            this.state.start("GameState")
        }
    };

    GameState = {
        init: function() {
            createGame();
        },
        update: function() {
            updateState();
        }
    };
    
    
    function createGame() {

        platforms_array = [];
        moves = [];
        profit = [];
        
         game.world.setBounds(0,0,game_length,game_height);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        ground_height = game.height - 2*asset_height;
        clouds = game.add.group();
        change = 15;
        for (var i = 70; i < game_length; i+= 240) {
            clouds.create(i, change + game.height / 6, 'cloud');
            change *= -1;
        }
        
        grass = game.add.group();
        for (var i = 130; i < game_length; i+= 290) {
            grass.create(i, ground_height - steps, 'grass');
        }
        
        ground = game.add.tileSprite(0,ground_height, game_length, game.height, 'ground');
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;
        
         coins = game.add.group();
        coins.enableBody = true;
        
        goombas = game.add.group();
        goombas.enableBody = true;
        
        flag = game.add.sprite(1500, ground_height-168, 'flag');
        flag.animations.add('celebrate');
        
        game.add.sprite(300, ground_height-64, 'pipe2');
        game.add.sprite(560, ground_height-132, 'castle').scale.setTo(0.75,0.75);
        game.add.sprite(900, ground_height-128, 'pipe1');
        game.add.sprite(1200, ground_height-80, 'pipe2').scale.setTo(1.25,1.25);
        
        
        platforms = game.add.group();
        platforms.enableBody = true;
for (i = 0; i < 5; i++) {
            platforms_array.push([i * 300 + 60]);
            var cnt1=0, cnt2=0;

for(j=0;j<8;j++) {
                var pos = i * 300 + j*asset_height + 100;
                var platform = platforms.create(pos, ground_height - 60, 'tile');
                platform.body.immovable = true;
    
    if(j===2 || j===7){
                    if(Math.random()>0.5) {
                        var goomba = goombas.create(pos, ground_height - asset_height - 60, 'enemy');
                        goomba.animations.add('walk', [0, 1]);
                        goomba.animations.play('walk', 2, true);
                    }

        if(Math.random()>0.5) {
                        goomba = goombas.create(pos, ground_height - asset_height, 'enemy');
                        goomba.animations.add('walk', [0, 1]);
                        goomba.animations.play('walk', 2, true);
                    }
        
        else{
                    if(Math.random()>0.5){
                        var coin = coins.create(pos, ground_height - asset_height - 60, 'coin');
                        coin.animations.add('spin', [0,0,1,2]);
                        coin.animations.play('spin', 3, true);
                        cnt1++;
                    }
            
            if(Math.random()>0.5){
                        var coin = coins.create(pos, ground_height - asset_height, 'coin');
                        coin.animations.add('spin', [0,0,1,2]);
                        coin.animations.play('spin', 3, true);
                        cnt2++;
                    }
                }

        }
            }
            profit.push([cnt1, cnt2]);
        }

        player = game.add.sprite(16, game.height - 72, 'mario');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 370;

        
        player.body.collideWorldBounds = true;
        player.animations.add('walkRight', [1, 2, 3], 10);
        player.goesRight = true;
        player.body.enable = false;

        temptext.innerText = text + getString() + text2;
    }

    function getString(){
        ret = '';
        tmp = [];
        for(i=0;i<5;i++)
            ret = ret + '['+String(profit[i][0])+','+String(profit[i][1])+'] ';
        ret = '[ '+ret+']\n';
        return ret;
    }
    
    function updateState() {
        game.physics.arcade.collide(player, ground, groundOverlap);
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(goombas, ground);
        game.physics.arcade.overlap(player, goombas, goombaOverlap);
        game.physics.arcade.overlap(player, coins, coinOverlap);
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
