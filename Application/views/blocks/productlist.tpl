[{$smarty.block.parent}]
[{assign var="config" value=$oViewConf->getConfig()}]

[{* adding scrolling trigger so that the infinite scrolling javascript knows where the bottom of the article list is *}]
<a class="scroll-trigger" name="scroll-trigger" id="scroll-trigger"></a>

[{* add js *}]
[{if !$oxcmp_shop->oxshops__oxproductive->value}]
    [{oxscript include=$oViewConf->getModuleUrl('gw_oxid_infinitescrolling','out/src/js/infinitescrolling.js')  priority=30}]
[{else}]
    [{oxscript include=$oViewConf->getModuleUrl('gw_oxid_infinitescrolling','out/src/js/infinitescrolling.min.js')  priority=30}]
[{/if}]
<script>var gw_oxid_infinitescrolling_offset = [{$config->getConfigParam('gw_oxid_infinitescrolling_offset')|intval}];var gw_oxid_infinitescrolling_scrollpagesamount = [{$config->getConfigParam('gw_oxid_infinitescrolling_scrollpagesamount')|intval}];var gw_oxid_infinitescrolling_base_url = '[{$oViewConf->getHomeLink()}]';</script>