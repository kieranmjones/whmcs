/*
 * Treeview 1.5pre - jQuery plugin to hide and show branches of a tree
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 * http://docs.jquery.com/Plugins/Treeview
 *
 * Copyright (c) 2007 JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.treeview.js 5759 2008-07-01 07:50:28Z joern.zaefferer $
 *
 */
(function($){$.extend($.fn,{swapClass:function(c1,c2){var c1Elements=this.filter("."+c1);return this.filter("."+c2).removeClass(c2).addClass(c1),c1Elements.removeClass(c1).addClass(c2),this},replaceClass:function(c1,c2){return this.filter("."+c1).removeClass(c1).addClass(c2).end()},hoverClass:function(className){return className=className||"hover",this.hover(function(){$(this).addClass(className)},function(){$(this).removeClass(className)})},heightToggle:function(animated,callback){animated?this.animate({height:"toggle"},animated,callback):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"](),callback&&callback.apply(this,arguments)})},heightHide:function(animated,callback){animated?this.animate({height:"hide"},animated,callback):(this.hide(),callback&&this.each(callback))},prepareBranches:function(settings){return settings.prerendered||(this.filter(":last-child:not(ul)").addClass(CLASSES.last),this.filter((settings.collapsed?"":"."+CLASSES.closed)+":not(."+CLASSES.open+")").find(">ul").hide()),this.filter(":has(>ul)")},applyClasses:function(settings,toggler){this.filter(":has(>ul):not(:has(>a))").find(">span").unbind("click.treeview").bind("click.treeview",function(event){this==event.target&&toggler.apply($(this).next())}).add($("a",this)).hoverClass();if(!settings.prerendered){this.filter(":has(>ul:hidden)").addClass(CLASSES.expandable).replaceClass(CLASSES.last,CLASSES.lastExpandable),this.not(":has(>ul:hidden)").addClass(CLASSES.collapsable).replaceClass(CLASSES.last,CLASSES.lastCollapsable);var hitarea=this.find("div."+CLASSES.hitarea);hitarea.length||(hitarea=this.prepend('<div class="'+CLASSES.hitarea+'"/>').find("div."+CLASSES.hitarea)),hitarea.removeClass().addClass(CLASSES.hitarea).each(function(){var classes="";$.each($(this).parent().attr("class").split(" "),function(){classes+=this+"-hitarea "}),$(this).addClass(classes)})}this.find("div."+CLASSES.hitarea).click(toggler)},treeview:function(settings){function treeController(tree,control){function handler(filter){return function(){return toggler.apply($("div."+CLASSES.hitarea,tree).filter(function(){return filter?$(this).parent("."+filter).length:!0})),!1}}$("a:eq(0)",control).click(handler(CLASSES.collapsable)),$("a:eq(1)",control).click(handler(CLASSES.expandable)),$("a:eq(2)",control).click(handler())}function toggler(){$(this).parent().find(">.hitarea").swapClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea).end().swapClass(CLASSES.collapsable,CLASSES.expandable).swapClass(CLASSES.lastCollapsable,CLASSES.lastExpandable).find(">ul").heightToggle(settings.animated,settings.toggle),settings.unique&&$(this).parent().siblings().find(">.hitarea").replaceClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea).replaceClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea).end().replaceClass(CLASSES.collapsable,CLASSES.expandable).replaceClass(CLASSES.lastCollapsable,CLASSES.lastExpandable).find(">ul").heightHide(settings.animated,settings.toggle)}function serialize(){function binary(arg){return arg?1:0}var data=[];branches.each(function(i,e){data[i]=$(e).is(":has(>ul:visible)")?1:0}),$.cookie(settings.cookieId,data.join(""),settings.cookieOptions)}function deserialize(){var stored=$.cookie(settings.cookieId);if(stored){var data=stored.split("");branches.each(function(i,e){$(e).find(">ul")[parseInt(data[i])?"show":"hide"]()})}}settings=$.extend({cookieId:"treeview"},settings);if(settings.toggle){var callback=settings.toggle;settings.toggle=function(){return callback.apply($(this).parent()[0],arguments)}}this.data("toggler",toggler),this.addClass("treeview");var branches=this.find("li").prepareBranches(settings);switch(settings.persist){case"cookie":var toggleCallback=settings.toggle;settings.toggle=function(){serialize(),toggleCallback&&toggleCallback.apply(this,arguments)},deserialize();break;case"location":var current=this.find("a").filter(function(){return this.href.toLowerCase()==location.href.toLowerCase()});if(current.length){var items=current.addClass("selected").parents("ul, li").add(current.next()).show();settings.prerendered&&items.filter("li").swapClass(CLASSES.collapsable,CLASSES.expandable).swapClass(CLASSES.lastCollapsable,CLASSES.lastExpandable).find(">.hitarea").swapClass(CLASSES.collapsableHitarea,CLASSES.expandableHitarea).swapClass(CLASSES.lastCollapsableHitarea,CLASSES.lastExpandableHitarea)}}return branches.applyClasses(settings,toggler),settings.control&&(treeController(this,settings.control),$(settings.control).show()),this}}),$.treeview={};var CLASSES=$.treeview.classes={open:"open",closed:"closed",expandable:"expandable",expandableHitarea:"expandable-hitarea",lastExpandableHitarea:"lastExpandable-hitarea",collapsable:"collapsable",collapsableHitarea:"collapsable-hitarea",lastCollapsableHitarea:"lastCollapsable-hitarea",lastCollapsable:"lastCollapsable",lastExpandable:"lastExpandable",last:"last",hitarea:"hitarea"}})(jQuery);