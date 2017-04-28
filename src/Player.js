/**
 * Created by Dimitri on 22/04/2017.
 */
DeathBot.Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    this.facing = 'left';
    this.jumpTimer = 0;
    this.anchor.set(0.5, 1);

    this.weapon = this.game.add.weapon(10, 'bullet');
    this.weapon.bulletGravity = new Phaser.Point(0, -500);
    this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    this.weapon.addBulletAnimation('fire', [0, 1, 2, 3], 5);
    this.weapon.bulletSpeed = 400;
    this.weapon.fireRate = 250;
    this.weapon.trackSprite(this, 20, -30, true);



    this.physics = game.physics.arcade;
    this.physics.enable(this);

    this.animations.add('run', [20, 21, 22, 23, 24, 25, 26, 27], 8, true);
    this.animations.add('idle', [4], 5, true);
    this.animations.add('jump', [61, 59, 60], 4, false);

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
        this.facing = 'left';
        this.body.velocity.x = -150;
        this.scale.x = 1;
        if(this.body.onFloor()) {
            this.animations.play('run');
        }

    }
    else if (this.cursors.right.isDown) {
        this.facing = 'right';
        this.body.velocity.x = 150;
        this.scale.x = -1;
        if(this.body.onFloor()) {
            this.animations.play('run');
        }

    }

    if ((Math.abs(this.body.velocity.x) < 4) && this.body.onFloor()) {
        this.animations.play('idle');
    }

    if (this.jumpButton.isDown && this.body.onFloor()) {
        this.body.velocity.y = -200;
        this.animations.play('jump');

    }

    if (this.fireButton.isDown && this.facing === 'left'){
        this.weapon.fire(null, -10, this.y - this.height / 4, -40, 0);

    }
    else if(this.fireButton.isDown && this.facing === 'right'){
        this.weapon.fire(null, Phaser.Camera.x, this.y - this.height / 4, 0, 0);
    }

    // this.weapon.debug(16, 32, false);



};
