Aria.classDefinition
	$classpath : 'games.common.sprite.SpriteBuilder'
	$dependencies : [
		'games.common.sprite.Sprite'
	]
	$singleton : true		
	$constructor :->
		@cache = new Object
		@
	$prototype :
		build : (url, transform) ->
			key = "#{url}__#{transform.angle}__#{transform.scale.x}__#{transform.scale.y}"
			if key in @cache
				@cache[key]
			else
				asset = games.shoot.AssetManager.getAsset url
				sprite = new games.common.sprite.Sprite asset
				sprite.rotate transform.angle
				sprite.scale transform.scale.x, transform.scale.y
				@cache[key] = sprite