Aria.testDefinition({
	$classpath : 'games.shoot.entity.engine.ConstantAccelerationEngineTest',
	$statics : {
		ACCELERATION : 10,
		MAXSPEED : 1
	},
	$prototype : {
		setup : function () {
			this.__engine = new games.shoot.entity.engine.ConstantAccelerationEngine(this.ACCELERATION, this.MAXSPEED);
		},
		testSpeedIsInitiallyZero : function () {
			this.assertEquals(this.__engine.getXSpeed(), 0);
			this.assertEquals(this.__engine.getYSpeed(), 0);
		},

		testSpeedRemainsCappedAtMaxSpeed : function () {
			this.__engine.goDown(10000);
			this.__engine.goRight(10000);
			this.assertEquals(this.__engine.getXSpeed(), this.MAXSPEED);
			this.assertEquals(this.__engine.getYSpeed(), this.MAXSPEED);			
		},

		testSpeedIsBelowMaxSpeed : function () {
			this.__engine.goDown(10);
			this.__engine.goRight(10);
			this.assertTrue(this.__engine.getXSpeed() < this.MAXSPEED);
			this.assertTrue(this.__engine.getYSpeed() < this.MAXSPEED);	
		},

		testSwitchingDirectionIsImmediate : function () {
			this.__engine.goDown(10000);
			this.assertEquals(this.__engine.getYSpeed(), this.MAXSPEED);
			
			this.__engine.goUp(10);
			this.assertTrue(this.__engine.getYSpeed() < 0);	


			this.__engine.goRight(10000);
			this.assertEquals(this.__engine.getXSpeed(), this.MAXSPEED);		
			this.__engine.goLeft(1);
			this.assertTrue(this.__engine.getXSpeed() < 0);	
		},

		testEngineCanBeStopped : function () {
			this.__engine.goDown(10000);
			this.__engine.goRight(10000);

			this.__engine.stopY();
			this.assertEquals(this.__engine.getXSpeed(), this.MAXSPEED);
			this.assertEquals(this.__engine.getYSpeed(), 0);	
			
			this.__engine.stopX();	
			this.assertEquals(this.__engine.getXSpeed(), 0);
			this.assertEquals(this.__engine.getYSpeed(), 0);	
		}
	}
});