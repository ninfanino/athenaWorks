$(function(){
	$('.user-info').hide();
	var arr = [];

	$.ajax({
	  url: 'https://randomuser.me/api/?results=30',
	  dataType: 'json',
	  success: function(data) {
	  	$('.loader-container').addClass('hidden');
	  	
	  	const myObj = JSON.stringify(data.results);
	  	arrData = JSON.parse(myObj);
	    
	    for(key in data.results) {
	    	var str = data.results[key].name['title'] + ' ' +data.results[key].name['first'] + ' ' + data.results[key].name['first'] + ' ' + data.results[key].email;
	    	arr[key] = str;
	    	$('.user-list').append('<div class="user" data-key="'+key+'"><figure class="user-image"><img src="'+data.results[key].picture['medium']+'" alt="" width="50" /></figure><div class="user-content"><p class="user-name">'+data.results[key].name['title']+ ' ' + data.results[key].name['first']+ ' ' + data.results[key].name['last']+ '</p><p class="user-desc">'+data.results[key].email+'</p></div><div class="more"> <i class="material-icons">more_vert</i> </div><span class="user-overlay"></span></div>');
	    }
	  }
	});

	$('.search-input').keyup(function() {
		let str = $(this).val();
		$(arr).map(function (i,n){
			if(!n.includes(str)) {
				$('.user[data-key='+i+']').addClass('hidden');
			} else {
				$('.user[data-key='+i+']').removeClass('hidden');
			}
    	});
	});

	$(document).on('click', '.user', function(){
		let key = $(this).attr('data-key');
		$('.user-info').slideDown(300);

		console.log(arrData[key]);
		var name = arrData[key].name['title'] + ' ' + arrData[key].name['first'] + ' ' + arrData[key].name['last'];
		var location = arrData[key].location['street'] + ', ' + arrData[key].location['state'] + '. ' + arrData[key].location['city'];
		var send = 'mailto:' + arrData[key].email;
		$('.user-info-img img').attr('src', arrData[key].picture['large']).attr('alt', name);
		$('.user-info-name').html(name);
		$('.user-info-location span').html(location);
		$('.user-info-email').html(arrData[key].email);
		$('.user-info-send').attr('href', send);

		$('.user-list').css('margin-top', '264px');
	});

	$(document).on('click', '.close-user-info', function(){
		$('.user-info').slideUp(300);
		$('.user-list').css('margin-top', '60px');
	});
});