Aria.classDefinition({
	$classpath : 'games.shoot.enemy.generator.ShootEnemyGenerator',
	$extends : 'games.common.BaseObject',
	$dependencies : [
		'games.shoot.enemy.doni.DoniFormationBuilder',
		'games.shoot.enemy.vreu.VreuFormationBuilder',
		'games.shoot.enemy.generator.DefaultEnemyGenerator'
	],
	$constructor : function (engine) {
		this.$BaseObject.constructor.call(this);
		this.__generators = [];
		this.__generators.push(new this.$DefaultEnemyGenerator(1000, this.$DoniFormationBuilder, engine));
		this.__generators.push(new this.$DefaultEnemyGenerator(7000, this.$VreuFormationBuilder, engine));
	},
	$prototype : {
		update : function (timer) {
			for (var i = 0 ; i < this.__generators.length ; i++) {
				this.__generators[i].update(timer);
			}
		}
	}
})