


DeathBot.Game = function (game) {

    this.player;
    this.map;
    this.layer1;
    this.layer2;
    this.bg;
    this.cursors;
    this.jumpButton;
    this.jumpTimer = 0;
    this.facing = 'right';

};

DeathBot.Game.prototype = {

    create: function () {


        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.bg  = this.add.tileSprite(0, 0, 640, 480, 'sky');
        this.bg.fixedToCamera = true;
        this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('tileOutdoors');
        this.map.setCollisionByExclusion([]);

        this.layer1 = this.map.createLayer('Foreground');
        this.layer1.resizeWorld();
        this.layer2 = this.map.createLayer('Background');
        this.layer2.resizeWorld();

        this.physics.arcade.gravity.y = 250;

        this.player = this.add.sprite(45, 380, 'player');
        this.physics.enable([this.player, this.layer1], Phaser.Physics.ARCADE);

        this.player.body.bounce.y = 0.1;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(37, 46, 0, 0);

        this.player.animations.add('left', [20, 21, 22, 23, 24, 25, 26, 27], 8, true);
        this.player.animations.add('idle left', [0], 5, true);
        this.player.animations.add('idle right', [4], 5, true);
        this.player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 8, true);
        this.player.animations.add('jump', [2, 3, 2], 1, false);

        this.camera.follow(this.player);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function () {

        this.physics.arcade.collide(this.player, this.layer1);

        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -150;

            if (this.facing != 'left')
            {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 150;

            if (this.facing != 'right')
            {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else
        {
            if (this.facing != 'idle right')
            {
                this.player.animations.stop();

                if (this.facing == 'left')
                {
                    this.player.animations.play('idle right');
                }
                else
                {
                    this.player.animations.play('idle left');
                }

                this.facing = 'idle right';
            }
        }

        if (this.jumpButton.isDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
        {
            this.player.body.velocity.y = -200;
            this.jumpTimer = this.game.time.now + 750;

            this.player.animations.play('jump');

        }

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
