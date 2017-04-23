/**
 * Created by Dimitri on 23/04/2017.
 */
DeathBot.AnimationState = function (name, object) {
    this.name = name;
    this.object = object;
};

DeathBot.AnimationState.prototype.enter = function () {

};

DeathBot.AnimationState.prototype.exit = function () {

};

DeathBot.AnimationState.prototype.handleInput = function () {
    return this.name;
};

