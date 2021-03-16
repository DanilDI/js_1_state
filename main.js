var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Wine_bottle = /** @class */ (function () {
    function Wine_bottle(state, label, max_cap, cur_cap) {
        this.transitionTo(state);
        this.label = label;
        this.max_cap = max_cap;
        this.cur_cap = cur_cap;
    }
    Wine_bottle.prototype.transitionTo = function (state) {
        this.state = state;
        this.state.setContext(this);
    };
    Wine_bottle.prototype.open = function () {
        this.state.op();
    };
    Wine_bottle.prototype.drink = function (sips) {
        this.state.dr(sips);
    };
    Wine_bottle.prototype.crack = function () {
        this.state.cr();
    };
    return Wine_bottle;
}());
var State = /** @class */ (function () {
    function State() {
    }
    State.prototype.setContext = function (Wine_bottle) {
        this.Wine_bottle = Wine_bottle;
    };
    return State;
}());
//конкретные состояния
var wb_closed = /** @class */ (function (_super) {
    __extends(wb_closed, _super);
    function wb_closed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    wb_closed.prototype.op = function () {
        console.log('Вы открыли бутылку');
        this.Wine_bottle.transitionTo(new wb_opened());
    };
    wb_closed.prototype.dr = function (sips) {
        this.Wine_bottle.transitionTo(new wb_opened());
        if (this.Wine_bottle.cur_cap < sips)
            console.log('Многовато хочешь, в бутылке столько нет, но ты открыл бутылку и выпил всего ', this.Wine_bottle.cur_cap, ' глотков, целую бутылку, как тебе не стыдно?');
        else
            console.log('Ты открыл бутылку и выпил ', sips, ' глотков');
        this.Wine_bottle.cur_cap -= sips;
        if (this.Wine_bottle.cur_cap < 0)
            this.Wine_bottle.cur_cap = 0;
        if (this.Wine_bottle.cur_cap == 0)
            this.Wine_bottle.transitionTo(new wb_empty());
    };
    wb_closed.prototype.cr = function () {
        console.log('Ты разбил полную бутылку вина и весь заляпался им, доволен?');
        this.Wine_bottle.transitionTo(new wb_craced());
    };
    return wb_closed;
}(State));
var wb_opened = /** @class */ (function (_super) {
    __extends(wb_opened, _super);
    function wb_opened() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    wb_opened.prototype.op = function () {
        console.log('Эта бутылка и так открыта');
    };
    wb_opened.prototype.dr = function (sips) {
        if (this.Wine_bottle.cur_cap < sips)
            console.log('Многовато хочешь, в бутылке столько нет, ты выпил всего ', this.Wine_bottle.cur_cap, ' глотков');
        else
            console.log('Ты выпил ', sips, ' глотков');
        this.Wine_bottle.cur_cap -= sips;
        if (this.Wine_bottle.cur_cap < 0)
            this.Wine_bottle.cur_cap = 0;
        if (this.Wine_bottle.cur_cap == 0)
            this.Wine_bottle.transitionTo(new wb_empty());
    };
    wb_opened.prototype.cr = function () {
        console.log('Ты разбил бутылку вина и весь заляпался им, а ведь там было ещё ', this.Wine_bottle.cur_cap, ' глотков, ты доволен?');
        this.Wine_bottle.transitionTo(new wb_craced());
    };
    return wb_opened;
}(State));
var wb_empty = /** @class */ (function (_super) {
    __extends(wb_empty, _super);
    function wb_empty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    wb_empty.prototype.op = function () {
        console.log('Эта бутылка и так открыта, и пуста к тому же, оставь её в покое');
    };
    wb_empty.prototype.dr = function (sips) {
        console.log('Эта бутылка пуста :(');
    };
    wb_empty.prototype.cr = function () {
        console.log('Ты разбил бутылку и получил отличную "розочку", в бой!');
        this.Wine_bottle.transitionTo(new wb_craced());
    };
    return wb_empty;
}(State));
var wb_craced = /** @class */ (function (_super) {
    __extends(wb_craced, _super);
    function wb_craced() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    wb_craced.prototype.op = function () {
        console.log('Эта бутылка разбита, ты что не видишь?');
    };
    wb_craced.prototype.dr = function (sips) {
        console.log('Эта бутылка разбита, ты что не видишь?');
    };
    wb_craced.prototype.cr = function () {
        console.log('Сильнее эту бутылку уже не разбить, отвяжись от неё!');
    };
    return wb_craced;
}(State));
//клиентский код
var merlo = new Wine_bottle(new wb_closed(), 'merlo', 5, 5); // создадим полную бутылку мерло
merlo.drink(2); //выпьем 2 глотка
merlo.drink(4); //попытаемся выпить 4
merlo.drink(1); //ну ещё хоть глоточек
merlo.crack(); // Разобъём бутылку со злости :(
var chardonnay = new Wine_bottle(new wb_closed(), 'chardonnay', 5, 5); // создадим полную бутылку Шардоне
chardonnay.open(); //В этот раз откроем её как приличные люди
chardonnay.drink(1); //выпьем глоточек...
chardonnay.crack(); //Фу, какая гадость! Разобъём её
chardonnay.drink(1); //Но вина то ещё хочется...
chardonnay.crack(); //Со злости разобъём бутыку ещё раз! Ну, попытаемся...
var riesling = new Wine_bottle(new wb_closed(), 'riesling', 5, 5); // создадим полную бутылку рислинга
riesling.crack(); //Ну его, снова белое, не хочу!
