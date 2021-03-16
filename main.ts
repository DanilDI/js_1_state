class Wine_bottle {//Контекст
    
    private state: State;
    private max_cap:number;
    public cur_cap:number;
    private label:string;
    constructor(state: State, label:string,max_cap:number,cur_cap:number) {
        this.transitionTo(state);
        this.label=label;
        this.max_cap=max_cap;
        this.cur_cap=cur_cap;
    }
    
    public transitionTo(state: State): void {
        
        this.state = state;
        this.state.setContext(this);
    }

    
    public open(): void {
        this.state.op();
    }

    public drink(sips:number): void {
        this.state.dr(sips);
    }
    public crack(): void {
        this.state.cr();
    }

}

abstract class State {//Состояние
    protected Wine_bottle: Wine_bottle;

    public setContext(Wine_bottle: Wine_bottle) {
        this.Wine_bottle = Wine_bottle;
    }

    public abstract op(): void;
    public abstract dr(sips:number): void;
    public abstract cr(): void;
}

//конкретные состояния
class wb_closed extends State {
    public op(): void {
        console.log('Вы открыли бутылку');

        this.Wine_bottle.transitionTo(new wb_opened());
    }
    public dr(sips:number): void {
        this.Wine_bottle.transitionTo(new wb_opened());
        if(this.Wine_bottle.cur_cap<sips) console.log('Многовато хочешь, в бутылке столько нет, но ты открыл бутылку и выпил всего ',this.Wine_bottle.cur_cap,' глотков, целую бутылку, как тебе не стыдно?' );
        else console.log('Ты открыл бутылку и выпил ',sips,' глотков' );
        this.Wine_bottle.cur_cap-=sips;
        if(this.Wine_bottle.cur_cap<0) this.Wine_bottle.cur_cap=0;
        if (this.Wine_bottle.cur_cap==0)this.Wine_bottle.transitionTo(new wb_empty());
    }

    public cr(): void {
       
        console.log('Ты разбил полную бутылку вина и весь заляпался им, доволен?');
        this.Wine_bottle.transitionTo(new wb_craced());
    }

    
}
class wb_opened extends State {
    public op(): void {
        console.log('Эта бутылка и так открыта');

        
    }
    public dr(sips:number): void {
        if(this.Wine_bottle.cur_cap<sips) console.log('Многовато хочешь, в бутылке столько нет, ты выпил всего ',this.Wine_bottle.cur_cap,' глотков' );
        else console.log('Ты выпил ',sips,' глотков' );
        this.Wine_bottle.cur_cap-=sips;
        if(this.Wine_bottle.cur_cap<0) this.Wine_bottle.cur_cap=0;
        if (this.Wine_bottle.cur_cap==0)this.Wine_bottle.transitionTo(new wb_empty());
    }

    public cr(): void {
       
        console.log('Ты разбил бутылку вина и весь заляпался им, а ведь там было ещё ',this.Wine_bottle.cur_cap, ' глотков, ты доволен?');
        this.Wine_bottle.transitionTo(new wb_craced());
    }

    
}
class wb_empty extends State {
    public op(): void {
        console.log('Эта бутылка и так открыта, и пуста к тому же, оставь её в покое');

        
    }
    public dr(sips:number): void {
        console.log('Эта бутылка пуста :(');
    }

    public cr(): void {
       
        console.log('Ты разбил бутылку и получил отличную "розочку", в бой!');
        this.Wine_bottle.transitionTo(new wb_craced());
    }

    
}
class wb_craced extends State {
    public op(): void {
        console.log('Эта бутылка разбита, ты что не видишь?');

        
    }
    public dr(sips:number): void {
        console.log('Эта бутылка разбита, ты что не видишь?');
    }

    public cr(): void {
       
        console.log('Сильнее эту бутылку уже не разбить, отвяжись от неё!');
    
    }

    
}

//клиентский код

const merlo = new Wine_bottle(new wb_closed(),'merlo',5,5);// создадим полную бутылку мерло
merlo.drink(2);//выпьем 2 глотка
merlo.drink(4);//попытаемся выпить 4
merlo.drink(1);//ну ещё хоть глоточек
merlo.crack();// Разобъём бутылку со злости :(

const chardonnay = new Wine_bottle(new wb_closed(),'chardonnay',5,5);// создадим полную бутылку Шардоне
chardonnay.open();//В этот раз откроем её как приличные люди
chardonnay.drink(1);//выпьем глоточек...
chardonnay.crack();//Фу, какая гадость! Разобъём её
chardonnay.drink(1);//Но вина то ещё хочется...
chardonnay.crack();//Со злости разобъём бутыку ещё раз! Ну, попытаемся...
const riesling=new Wine_bottle(new wb_closed(),'riesling',5,5);// создадим полную бутылку рислинга
riesling.crack();//Ну его, снова белое, не хочу!
