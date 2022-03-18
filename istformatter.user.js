// ==UserScript==
// @name       ISTformatter
// @namespace  https://score.iidx.app
// @version    0.3
// @description  type and lamp adding and autopersing formatting
// @match      https://score.iidx.app/*
// @copyright  2022+, I
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

$(function() {
	document.body.appendChild((function(){
		var jq = document.createElement("script");
		jq.src = '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
		return jq;
	})());
	$(".autopagerize_page_separator").remove();
	$(".autopagerize_page_info").remove();
	$("table thead").remove()

	const type_dic = {"#D6EAF8":"(N)","#FCF3CF":"(H)","#FADBD8":"(A)","#FF33CC":"(L)"};
	const lamp_dic = {"#ffffff":"np","#c0c0c0":"f","#9595ff":"a","#98fb98":"e","#afeeee":"n","#ff6347":"h","#ffd900":"ex","#ff8c00":"full"};
	const parents = $("table tbody tr");

	for(let i = 0; i < parents.length; i++){
		let type = parents.eq(i).children().eq(0).attr("bgcolor");
		// normal:#D6EAF8 hyper:#FCF3CF another:#FADBD8 leggendaria:#FF33CC
		let lamp = parents.eq(i).children().eq(1).attr("bgcolor");
		// faild:#c0c0c0 a-easy:#9595ff easy:#98fb98 normal:#afeeee hard:#ff6347 exh:#ffd900 ful:#ff8c00
		type = type_dic[type];
		lamp = lamp_dic[lamp];
		//alert(parents.eq(i).children().eq(0).text()+type+" "+lamp);
		parents.eq(i).children().eq(0).children().append(type);
		parents.eq(i).children().eq(1).append(lamp);
	}
	const table = $("table");
	document.getSelection().selectAllChildren(table[0]);
	document.execCommand('copy');
});
