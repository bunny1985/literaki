
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    lives: 3,
    asteroidready: false ,  
    splat:null , 
    points: 0 , 
    time: 25, 
    explode: function(){
        this.points+=10;
        if(this.points%100==0){
            this.time = 25 - ((this.points/100)*3 );
        }
        this.labelpoints.setString("Points:" + this.points);
        this.asteroidready = false;
        var bum=  new Explosion();
        bum.setPosition(this.sprite.getPosition() );
        bum.setScale(this.sprite.getScale()*3);
        
        this.addChild(bum);
        bum.play();
        this.sprite.setVisible(false);
        this.sprite.active = false;
        this.removeChild(this.sprite, true);
        this.runAction(cc.Sequence.create(
            new cc.DelayTime(0.5),
            cc.CallFunc.create(this.generateAsteroid, this)
        ));
    },
    generateAsteroid : function(){
        if(this.lives<=0)return;
        this.labelletter.setVisible(false);
        this.sprite = new Asteroid(this.time);
        this.labelletter.setString("Literka:" + this.sprite.letter);
        var size = cc.winSize;
        
        this.sprite.attr({
            x: size.width * Math.random() , 
            y: size.height * Math.random()
        });
        this.addChild(this.sprite, 0);
        this.sprite.app = this;
        this.asteroidready =true;
    },
    hit: function(){

        var hitsound = getRandomInt(1, 5);
        cc.audioEngine.playEffect("res/hit/hit" + hitsound+ ".mp3", false); 
        this.splat.setOpacity(255);
        this.lives-=1;
        this.labellives.setString("Lives:" + this.lives)
        if(this.lives == 0 ){
            this.sprite.setVisible(false);
            return;
        }
        this.splat.runAction(cc.Sequence.create(
            new cc.ScaleTo(1.5, 1.2 , 1.2),
            new cc.ScaleTo(0.01, 1 , 1)
        ));
        this.splat.runAction(new cc.FadeOut(1));
        
        this.sprite.setVisible(false);
        this.sprite.active = false;
        this.asteroidready =false;
        this.generateAsteroid();
    },
    addBackground: function(){
        var size = cc.winSize;
        var bg = new cc.Sprite("res/bg.jpg");
        bg.attr({
            x: size.width /2 ,
            y: size.height /2
        });
        bg.attr({
            width: size.width ,
            height: size.height 
        });
        this.addChild(bg);
        this.splat = new cc.Sprite("res/blood.png");
        this.splat.attr({
            x: size.width /2 ,
            y: size.height /2
        });
        this.splat.attr({
            width: size.width ,
            height: size.height 
        });
        this.addChild(this.splat);
        this.splat.setOpacity(0);
     
    },
    addKeyboardEvents: function(){
    if( 'keyboard' in cc.sys.capabilities ) {
                cc.eventManager.addListener({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed:(key, event) =>  {
                        if(! this.asteroidready)return ;
                        console.log(key);
                        if(this.sprite.letter.charCodeAt(0) -32== key || this.sprite.letter.charCodeAt(0) == key){
                            console.log("BUm");

                        this.explode();
                        var explosionsound  = getRandomInt(1, 3);
                        cc.audioEngine.playEffect("/res/explosion" + explosionsound+ ".wav", false);
                        }else if(key==13){
                            this.labelletter.setVisible(true);
                            this.points-=100;
                        }else if(key==32){
                            
                            this.sprite.playLetter();
                        }
                        else{
                            cc.audioEngine.playEffect("/res/shot.wav", false);
                        }
                        
                    },
                    onKeyReleased:function(key, event) {
                        }
                    
                }, this);
            }
    },
    addLabels: function(){
        this.labellives = new cc.LabelTTF("Lives: " + this.lives, "Helvetica", 20);
        this.labellives.setPosition(880, 600);
        this.addChild(this.labellives);
        this.labelpoints = new cc.LabelTTF("Points: " + this.points, "Helvetica", 24);
        this.labelpoints.setPosition(880, 575);
        this.addChild(this.labelpoints);
        
        
        
        this.labelletter = new cc.LabelTTF("Literka: " , "Arial", 24);
        this.labelletter.setPosition(880, 30);
        this.addChild(this.labelletter);
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        
        
        
        
        cc.spriteFrameCache.addSpriteFrames(res.plist_plist);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_list);
        Explosion.sharedExplosion();
        this.addBackground();
        this.addLabels();
        
        
        cc.audioEngine.setMusicVolume(0.2);
        cc.audioEngine.setEffectsVolume(1.0);
        
        this.addKeyboardEvents();
        




        this.start();
        return true;
    },
    start: function(){
        this.generateAsteroid();
        cc.audioEngine.playMusic("/res/bg.mp3", true);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}