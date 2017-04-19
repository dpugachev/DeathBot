
BasicGame.Game = function (game) {

};

var map;
var layer1;
var layer2;
var player;
var bg;
var cursors;
var jumpButton;
var jumpTimer = 0;
var facing = 'left';

BasicGame.Game.prototype = {

    create: function () {


        this.physics.startSystem(Phaser.Physics.ARCADE);
        bg  = this.add.tileSprite(0, 0, 640, 480, 'sky');
        bg.fixedToCamera = true;
        map = this.add.tilemap('level1');
        map.addTilesetImage('tileOutdoors');
        map.setCollisionByExclusion([]);

        layer1 = map.createLayer('Foreground');
        layer1.resizeWorld();
        layer2 = map.createLayer('Background');
        layer2.resizeWorld();

        this.physics.arcade.gravity.y = 250;

        player = this.add.sprite(0, 12, 'player');
        this.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.1;
        player.body.collideWorldBounds = true;
        player.body.setSize(50, 50, 0, 0);

        player.animations.add('left', [20, 21, 22, 23, 24, 25, 26, 27], 10, true);
        player.animations.add('idle', [0], 20, true);
        player.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        player.animations.add('jump', [3], 20, true);

        this.camera.follow(player);

        cursors = this.input.keyboard.createCursorKeys();
        jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    update: function () {

        this.physics.arcade.collide(player, layer1);

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;

            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;

            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player.animations.play('idle');

                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 5;
                }

                facing = 'idle';
            }
        }

        if (jumpButton.isDown && player.body.onFloor() && this.game.time.now > jumpTimer)
        {
            player.body.velocity.y = -200;
            jumpTimer = this.game.time.now + 750;

            player.animations.play('jump');

        }

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
