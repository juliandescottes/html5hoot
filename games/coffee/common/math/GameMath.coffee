Aria.classDefinition
	$classpath : 'games.common.math.GameMath'
	$extends : 'games.common.BaseObject'
	$dependencies : ['aria.utils.Math']
	$statics : 
		normalizeFromToWithDelta : (from, to, delta) ->
			delta = Math.abs(delta)
			normalized = Math.max(to, from - delta) if from > to
			normalized = Math.min(to, from + delta) if from < to
			normalized = to if from == to
			return normalized