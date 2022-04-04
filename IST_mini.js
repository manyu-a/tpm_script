// ==UserScript==
// @name       IST_mini
// @namespace  https://score.iidx.app
// @version    0.1
// @description  type and lamp adding and autopersing formatting
// @match      https://score.iidx.app/*
// @copyright  2022+, I
// @run-at context-menu
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

  //  変換部丸々削除
	const table = $("table");
	document.getSelection().selectAllChildren(table[0]);
	document.execCommand('copy');
});
