/**
 * Created by Dimitri on 22/04/2017.
 */
DeathBot.Player = function (game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'player');

    this. anchor.set(0.5, 1);

    this.physics = game.physics.arcade;
    this.physics.enable(this);

    this.stateManager = new DeathBot.AnimationStateManager();
    this.running = new DeathBot.AnimationState();
    this.jumping = new DeathBot.AnimationState();
    this.standing = new DeathBot.AnimationState();
    this.stateManager.add([this.running, this.jumping, this.standing]);

};

DeathBot.Player.prototype = Object.create(Phaser.Sprite.prototype);
DeathBot.Player.prototype.constructor = DeathBot.Player;

DeathBot.Player.prototype.update = function () {


};