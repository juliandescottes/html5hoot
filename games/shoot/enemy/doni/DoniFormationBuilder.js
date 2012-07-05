Aria.classDefinition({
	$classpath : 'games.shoot.enemy.doni.DoniFormationBuilder',
	$extends : 'games.common.BaseObject',
	$implements : ['games.shoot.enemy.EnemyFormationBuilder'],
	$dependencies : ['games.shoot.enemy.doni.Doni'],
	$constructor : function (engine) {
		this.$BaseObject.constructor.call(this);
		this.__engine = engine;
		this.__xOrig = Math.floor(Math.random()*500/30)*30;
	},
	$prototype : {
		build : function () {
			this.__addEnemyAtY(this.__xOrig);
		},

		__addEnemyAtY : function (xPos) {
			var doni = new this.$Doni(this.__engine, xPos, -5);
			this.__engine.addEntity(doni);
		}
	}
})