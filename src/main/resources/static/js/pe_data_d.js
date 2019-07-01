$(function(){
	//模拟城市-无联动/无搜索
	var selector = $('#city-picker-selector').cityPicker({
		dataJson: cityData,
		renderMode: true,
		search: false,
		linkage: false
	})
	$('#city-picker-selector').on('choose-province.citypicker', function(event, tagert, storage) {
		console.log(storage);
	});
	
	//设置城市
	selector.setCityVal([{
		'id': '110000',
		'name': '请选择'
	}, {
		'id': '110100',
		'name': '请选择'
	}, {
		'id': '110108',
		'name': '请选择'
	}]);
	
})