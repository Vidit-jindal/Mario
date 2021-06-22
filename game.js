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

