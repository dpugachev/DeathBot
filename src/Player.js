/**
 * Created by Dimitri on 22/04/2017.
 */
DeathBot.Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.facing = 'idle right';
    this.jumpButton;
    this.jumpTimer = 0;
    this.anchor.set(0.5, 1);

    this.weapon = this.game.add.weapon(2, 'bullet');
    this.weapon.addBulletAnimation('fire', [0, 1, 2, 3], 10);
    this.weapon.bulletSpeed = 300;
    this.weapon.fireRate = 500;
    this.weapon.trackSprite(this, 20, -30, true);

    this.physics = game.physics.arcade;
    this.physics.enable(this);

    this.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27], 8, true);
    this.animations.add('idle', [4], 5, true);
    this.animations.add('jump', [2, 3, 2], 1, false);

    this.body.bounce.y = 0.1;
    this.body.collideWorldBounds = true;
    this.body.setSize(37, 46, 0, 0);
    this.body.drag = {x: 1000, y: 0};

    this.game.camera.follow(this);

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

};

DeathBot.Player.prototype = Object.create(Phaser.Sprite.prototype);
DeathBot.Player.prototype.constructor = DeathBot.Player;

DeathBot.Player.prototype.update = function () {



    if (this.cursors.left.isDown) {
        this.body.velocity.x = -150;
        this.scale.x = 1;
        this.animations.play('run');

    }
    else if (this.cursors.right.isDown) {
        this.body.velocity.x = 150;
        this.scale.x = -1;
        this.animations.play('run');

    }

    if (Math.abs(this.body.velocity.x) < 4) {
        this.animations.play('idle');
    }

    if (this.jumpButton.isDown && this.body.onFloor() && this.game.time.now > this.jumpTimer) {
        this.body.velocity.y = -200;
        this.jumpTimer = this.game.time.now + 750;
        this.animations.play('jump');

    }

    if (this.fireButton.isDown){
        this.weapon.fire();
    }

    this.weapon.debug(16, 32, false);



};
