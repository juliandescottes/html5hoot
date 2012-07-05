Aria.classDefinition({
	$classpath : 'games.shoot.ship.BeamGun',
	$extends : 'games.common.BaseObject',
	$dependencies : ['games.shoot.ship.Beam'], $implements : [],
	$constructor : function (engine, beamingSpeed) {
		this.$BaseObject.constructor.call(this);
		this.__beamingSpeed = beamingSpeed;
		this.__engine = engine;
		this.__beam = null;
	},
	$prototype : {
		fire : function (x, y) {
			if (!this.__isBeaming()) {
				this.__beam = new this.$Beam(x, y);
				this.__engine.addEntity(this.__beam);
			}
			this.__beam.updateOrigin(x, y);
		},
		halt : function () {
			if (this.__isBeaming()) {
				this.__beam.release();
				this.__beam = null;
			}
		},

		destroy : function () {
			this.halt();
		},
		
		__isBeaming : function () {
			return this.__beam !== null;
		}
	}
});