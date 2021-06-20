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
