/**
 * Created by Dimitri on 22/04/2017.
 */
DeathBot.Player = function (game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'player');

    this. anchor.set(0.5, 1);

    this.physics = game.physics.arcade;
    this.physics.enable(this);

};

DeathBot.Player.prototype = Object.create(Phaser.Sprite.prototype);
DeathBot.prototype.constructor = DeathBot.Player;

DeathBot.prototype.update = function () {


};