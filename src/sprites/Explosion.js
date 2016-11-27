var Explosion = cc.Sprite.extend({
    tmpWidth:0,
    tmpHeight:0,
    active:true,
    animation:null,
    ctor:function () {
        this._super();

        var pFrame = cc.spriteFrameCache.getSpriteFrame("explosion_01.png");
        this.initWithSpriteFrame(pFrame);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

        var cs = this.getContentSize();
        this.tmpWidth = cs.width;
        this.tmpHeight = cs.height;
        this.animation = cc.animationCache.getAnimation("Explosion");
    },
    play:function(){
        //return;
        this.runAction(cc.Sequence.create(
            cc.Animate.create(this.animation),
            cc.CallFunc.create(this.destroy, this)
        ));
    },
    destroy:function () {
        this.setVisible(false);
        this.active = false;
    }
});

Explosion.sharedExplosion = function () {
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 35; i++) {
        str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, 0.04);
    cc.animationCache.addAnimation(animation, "Explosion");
};



Explosion.preSet = function () {
    var explosion = null;
    for (var i = 0; i < 6; i++) {
        explosion = Explosion.create();
        explosion.setVisible(false);
        explosion.active = false;
    }
};
