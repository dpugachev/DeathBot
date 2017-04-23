DeathBot.Game = function (game) {

    this.player;
    this.map;
    this.layer1;
    this.layer2;
    this.bg;
    this.cursors;

};

DeathBot.Game.prototype = {

    create: function () {


        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.bg = this.add.tileSprite(0, 0, 640, 480, 'sky');
        this.bg.fixedToCamera = true;
        this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('tileOutdoors');
        this.map.setCollisionByExclusion([]);

        this.layer1 = this.map.createLayer('Foreground');
        this.layer1.resizeWorld();
        this.layer2 = this.map.createLayer('Background');
        this.layer2.resizeWorld();

        this.physics.arcade.gravity.y = 250;

        this.player = new DeathBot.Player(this.game, 45, 380);
        this.add.existing(this.player);
        this.physics.enable([this.player, this.layer1], Phaser.Physics.ARCADE);

    },

    update: function () {

        this.physics.arcade.collide(this.player, this.layer1);


    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    },

    render: function () {
        this.game.debug.body(this.player);
    }

};
