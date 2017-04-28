DeathBot.Game = function (game) {

};

DeathBot.Game.prototype = {

    create: function () {


        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.sortDirection = 1;
        this.sky = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
        this.sky.fixedToCamera = true;
        this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'citybg');



        this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('scifi');
        this.map.addTilesetImage('collision');

        this.layer3 = this.map.createLayer('Collision');
        this.layer3.resizeWorld();
        this.map.setCollisionByExclusion([], true, 'Collision');

        this.layer2 = this.map.createLayer('Base');
        this.layer2.resizeWorld();

        this.layer1 = this.map.createLayer('Foreground');
        this.layer1.resizeWorld();




        this.physics.arcade.gravity.y = 500;

        this.player = new DeathBot.Player(this.game, 45, 380);
        this.add.existing(this.player);
        this.physics.enable([this.player, this.layer3], Phaser.Physics.ARCADE);

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
      // this.game.debug.body(this.player);
    }

};
