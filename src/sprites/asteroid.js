
var Asteroid = cc.Sprite.extend({
    
    timeInSeconds:25,
    letter: null , 
    app: null,
    
    ctor:function (time) {
        this._super();
        this.timeInSeconds = time ||25;    
        var color = getRandomInt(1, 8)
        this.initWithSpriteFrameName("ast" + color+ ".png");
        this.setScale(0.01);
        var rotation = new cc.RotateBy(Math.random(), 90, 90);
        this.runAction(cc.RepeatForever.create(rotation));
        this.runAction(cc.Sequence.create(
            new cc.EaseIn(new cc.ScaleTo(this.timeInSeconds , 6.0, 6.0) ,2 ), 
            cc.CallFunc.create(this.hit, this)
        ));
        this.letter = this.pickletter(1);
        this.playLetter();
    },
    hit: function(){
        this.app.hit();
    },

    playLetter: function(){
        cc.audioEngine.stopAllEffects();
            cc.audioEngine.playEffect("res/alfabet/" + this.letter+ ".mp3", false); 
    },
    

    pickletter: function (length)
    {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPRSTUWYZ";
    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
    }

});
