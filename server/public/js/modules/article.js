define(function(require,exports,module){

	// 模块依赖 jQuery
	var $ = jQuery = require('jquery');

	// 如果是PC 执行滚动固定顶部效果
	device.desktop() &&  scrollToFix();

	// 评论
	var submit = $('#submit'),
		applyContent = $('#apply-content'),
		nickName = $('#nick-name'),
		email = $('#email'),
		commentList = $('#comment-list'),
		iBody = $('html,body'),
		articleID = getUrlParam(location.href).id,
		parentID = '-1',
		str = '',
		SERVER_PATH = 'http://localhost:3000';

	// 获取评论列表
	getCommentLists(articleID);

	// 评论表单验证
	function commentValiding(){

		if($.trim(applyContent.val()) != ''){

			if($.trim(applyContent.val().length) < 10){

				alert('请再多输入几个字吧');

				return false;
			}
			
		}else{

			alert('请输入评论内容');

			return false;

		}

		if($.trim(nickName.val()) == ''){

			alert('请输入昵称');

			return false;

		}

		if($.trim(email.val()) != ''){

			// 验证邮箱正则
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

			if(!reg.test(email.val())){

				alert('邮箱格式不正确');

				return false;

			}

		}else{

			alert('请输入邮箱');

			return false;

		}

		return true;

	}

	// 提交评论
	function submitComment(){

		$.ajax({
			type:'post',
			url:SERVER_PATH +'/article/commit',
			data:{
				id:articleID,
				applyContent:applyContent.val(),
				nickName:nickName.val(),
				email:email.val(),
				parentID:parentID
			},
			success:function(response){

				// 评论成功
				if(!response.code){

					// 清空表单
					applyContent.val('');
					nickName.val('');
					email.val('');
					str = '';
					submit.html('解除封印');
					applyContent.attr('placeholder','老夫见你骨骼惊奇并非凡人。将来必成大器。不如这样，你给我留个言。解除对我的封印，待我恢复法力。我们一同拯救世界如何？')

					// 重新获取评论列表
					getCommentLists(articleID);

				}

				alert(response.message);
			}
		})

	}

	// 获取评论列表
	function getCommentLists(id){

		$.ajax({
			type:'get',
			url:SERVER_PATH + '/article/comment',
			data:{
				id:id
			},
			success:function(response){

				if(!response.code){

					// 拼接获取到的评论数据并展现在页面中
					mosaicComment(formatTreeData(response.result));

				}
				
			}
		})

	}

	// 拼接获取到的评论数据并展现在页面中
	function mosaicComment(data){

		for(var i=0;i<data.length;i++){

			str += '<li>\
						<div class="head-image fl">\
							<img data-src="images/heads/head-'+ Math.ceil(Math.random()*8) +'.png" class="best-fill">\
						</div>\
						<div class="comment-content">\
							<div class="nick-name">'+ data[i].nickName +'\
								<span class="time">'+ data[i].published.split('T')[0] +'</span>\
								<span class="apply" data-id="'+ data[i]._id +'">回复</span>\
							</div>\
							<div class="content">'+ data[i].applyContent +'</div>\
						</div>';
			if(data[i].children){

				str += '<ul class="comment-list">'

				mosaicComment(data[i].children);

			}

		}

		str += '</ul></li>';

		commentList.html(str);

		$(window).lazyLoadXT();

		commentList.find('.comment-list .apply').remove();

	}

	// 获取地址栏参数
	function getUrlParam(string){

		var obj = {};

		if(string.indexOf('?') != -1){

			var string = string.substr(string.indexOf('?') + 1);

			var strs = string.split('&');

			for(var i=0;i<strs.length;i++){

				var tempArr = strs[i].split('=');

				obj[tempArr[0]] = unescape(tempArr[1]);

			}
		}

		return obj;

	}

	// 将数据格式化成树状结构
	function formatTreeData(data){ 
	    
	    var result = []; 

	    var temp = []; 

	    for(var i = 0; i< data.length; i++){ 

	       temp[data[i]["_id"]] = data[i];

	    } 

	    for(var i = 0; i < data.length; i++) { 

	        if(temp[data[i]["parentID"]] && data[i]["_id"] != data[i]["parentID"]){

	            if (!temp[data[i]["parentID"]]["children"]) temp[data[i]["parentID"]]["children"] = [];

	            temp[data[i]["parentID"]]["children"].push(data[i]);

	        } else { 

	            result.push(data[i]); 
	            
	        }

	    } 
	    
	    return result;

	}

	// 滚动固定顶部
	function scrollToFix(){

		var tagCloud = $('#tag-cloud');

		tagCloud.scrollToFixed({marginTop:70});

	}

	// 提交评论按钮点击
	submit.on('click',function(){

		// 判断验证是否通过
		if(commentValiding()){

			// 提交评论
			submitComment();

		}

	});


	// 回复
	commentList.on('click','.apply',function(){

		parentID = $(this).attr('data-id');

		iBody.stop().animate({
			scrollTop:applyContent.offset().top - 120
		},function(){

			applyContent.focus();

			applyContent.attr('placeholder','请输入回复内容')

			submit.html('回复');

		});
	

	});


});