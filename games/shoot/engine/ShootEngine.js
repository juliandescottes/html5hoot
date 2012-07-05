Aria.classDefinition({
	$classpath : 'games.shoot.engine.ShootEngine',
	$dependencies : [
		'aria.utils.Array',
		'games.common.assert.Assert',
		'games.common.asset.AssetManager',
		'games.common.engine.GameEngine', 
		'games.shoot.asset.Assets',
		'games.shoot.collision.CollisionEngineImpl',
		'games.shoot.entity.EntitySorter', 
		'games.shoot.entity.SpriteBoard',
		'games.shoot.utils.Environment'
	],
	$extends : 'games.common.BaseObject',
	$implements : ['games.common.engine.Engine'],
	$statics : {
		getDefaultImplementation : function (context, statsRecorder) {
			var timer = new games.common.clock.Timer(16);
			var baseEngine = new games.common.engine.GameEngine(context, timer);
			return new games.shoot.engine.ShootEngine(baseEngine, statsRecorder);
		}
	},
	$constructor : function (baseEngine, statsRecorder) {
		this.$BaseObject.constructor.call(this);
		this.__baseEngine = baseEngine;
		this.__collisionEngine = this.$CollisionEngineImpl.getDefaultImplementation();
		this.entitySorter = new this.$EntitySorter();
		this.__controllers = [];

		this.$Environment.setEngine(this);

		var levelBackgroundSprite = new this.$SpriteBoard(); 
		this.addEntity(levelBackgroundSprite);

		this.__stats = statsRecorder;
	},
	$prototype : {
		getTotalGameTime : function () {
			return this.getTimer().getTotalGameTime();
		},

		update : function () {
			this.__resolveCollisions();
			
			var beginTimestamp = Date.now();

			this.__updateControllers();

			this.__baseEngine.update();
			this.__stats.updateTime("update", Date.now() - beginTimestamp);
			this.__stats.updateEntities(this.getEntities().length);
		},

		addController : function (controller) {
			this.__controllers.push(controller);
		},


		draw : function () {
			var beginTimestamp = Date.now();
			this.__baseEngine.setEntities(this.entitySorter.sort(this.getEntities()));
			this.__baseEngine.draw();
			this.__stats.updateTime("draw", Date.now() - beginTimestamp);
		},

		getEntities : function () {
			return this.__baseEngine.getEntities();
		},

		addEntity : function (entity) {
			this.__baseEngine.addEntity(entity);
		},

		getTimer : function () {
			return this.__baseEngine.getTimer();
		},

		__updateControllers : function () {
			for (var i = 0; i < this.__controllers.length; i++) {
				this.__controllers[i].update(this.getTimer());
			};
		},

		__resolveCollisions : function () {
			var beginTimestamp = Date.now();
			this.__collisionEngine.resolveCollisions(this.getEntities());
			this.__stats.updateTime("collide", Date.now() - beginTimestamp);
		}
	}	
});