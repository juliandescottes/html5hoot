Aria.classDefinition({
	$classpath : 'games.shoot.Stats',
	$extends : 'games.common.BaseObject',
	$dependencies : [], $implements : [],
	$statics : {
		KEYS : ['loop', 'draw', 'update', 'collide']	
	},
	$constructor : function () {
		this.$BaseObject.constructor.call(this);
		this.__prepareStatsObject();
		this.render();
	},
	$prototype : {
		updateTime : function (key, time) {
			var statsForKey = this.stats[key];
			statsForKey.max = this.__format(Math.max(statsForKey.max, time));
			statsForKey.avg = this.__format(((statsForKey.avg * statsForKey.times) + time) / (++statsForKey.times));
			
			if (key == "loop") {
				this.__frames++;
			}

			if (Date.now() > this.__renderTime + 1000) {
				this.render();
				this.__resetStats();
			}
		},

		updateEntities : function (entitiesCount) {
			this.__entities = entitiesCount;
		},

		render : function () {
			this.__renderTime = Date.now();
			for (var i = 0 ; i < this.KEYS.length; i++) {
				var key = this.KEYS[i];
				this.dom[key].max.innerHTML = this.stats[key].max;
				this.dom[key].avg.innerHTML = this.stats[key].avg;
			}
			this.dom.fps.innerHTML = this.__frames;
			this.dom.entities.innerHTML = this.__entities;
		},

		__format : function (number) {
			return Math.floor(number * 100)/100;	
		},

		__prepareStatsObject : function () {
			this.__resetStats();	
			this.dom = {};
			for (var i = 0 ; i < this.KEYS.length; i++) {
				var key = this.KEYS[i];
				this.dom[key] = {
					max : document.getElementById(key + '.max'),
					avg : document.getElementById(key + '.avg')
				};
			}
			this.dom.fps = document.getElementById('fps');
			this.dom.entities = document.getElementById('entities');
		},

		__resetStats : function () {
			this.__frames = 0;
			this.__entities = 0;
			this.stats = {
				collide : {max:0, avg:0, times:0},
				update : {max:0, avg:0, times:0},
				loop : {max:0, avg:0, times:0},
				draw : {max:0, avg:0, times:0},
			};
		}
	}
});