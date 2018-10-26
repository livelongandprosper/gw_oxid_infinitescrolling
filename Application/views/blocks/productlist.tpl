[{$smarty.block.parent}]
[{assign var="config" value=$oViewConf->getConfig()}]

productlist.tpl

[{* adding scrolling trigger so that the infinite scrolling javascript knows where the bottom of the article list is *}]
<div class="clear"></div>
<a class="scroll-trigger" name="scroll-trigger" id="scroll-trigger"></a>

[{*oxscript include=$oViewConf->getModuleUrl('gw_oxid_infinitescrolling','out/src/js/infinitescrolling.js')  priority=30*}]