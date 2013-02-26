$(function(){
	$('#getRss').click(function(){
		//var url = 'https://developer.mozilla.org/zh-CN/docs/feeds/atom/all';
		var url = $('#rss').val();
		$.ajax({
			url:'/getRss?u='+ url,
			type:'post',
			success:function(data){
				$('#rssContent').html(data);
			}
		});
	});
});


