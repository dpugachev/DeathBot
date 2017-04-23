/**
 * Created by Dimitri on 23/04/2017.
 */
DeathBot.AnimationStateManager = function () {
    this.states = {};
};

DeathBot.AnimationStateManager.prototype.add = function (stateName, state) {
    this.states[stateName] = state;
};

DeathBot.AnimationStateManager.prototype.setInitialState = function (stateName) {
    this.currentState = this.states[stateName];
    this.currentState.enter();
};

DeathBot.AnimationStateManager.prototype.handleInput = function (input) {
    var nextState;
    nextState = this.currentState.handleInput(input);
    if (nextState && nextState !== this.currentState.name){
        this.currentState.exit();
        this.currentState = this.states[nextState];
        this.currentState.enter();
    }
};

