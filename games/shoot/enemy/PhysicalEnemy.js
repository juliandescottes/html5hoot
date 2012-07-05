Aria.interfaceDefinition({
	$classpath : 'games.shoot.enemy.PhysicalEnemy',
	$extends : 'games.common.entity.Entity',
	$interface : {
		getHitbox : function () {},
		hit : function (damages) {}
	}
})