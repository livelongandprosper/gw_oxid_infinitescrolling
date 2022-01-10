[{$smarty.block.parent}]
[{assign var="config" value=$oViewConf->getConfig()}]

[{* adding some html elements so that the infinite scrolling javascript knows the next page *}]
[{assign var="page_navigation" value=$oView->getPageNavigationLimitedBottom()}]

[{* previous page *}]
[{if $page_navigation->previousPage && $place != "bottom"}]
	<a href="[{$page_navigation->previousPage}]" class="gw_oxid_infinitescrolling-prev-page" id="gw_oxid_infinitescrolling-prev-page[{$page_navigation->actPage}]"><span>&#9650;</span><span>[{math equation="a * (b-1)" a=$oViewConf->getArtPerPageCount() b=$page_navigation->actPage}] [{oxmultilang ident="GW_INFINITE_SCROLLING_LIST_PRODUCTS_BEFORE"}]</span></a>
[{/if}]

[{* next page *}]
[{if $place == "bottom"}]
	[{if $page_navigation->nextPage}]
		<a href="[{$page_navigation->nextPage}]" class="gw_oxid_infinitescrolling-next-page" id="gw_oxid_infinitescrolling-next-page[{$page_navigation->actPage}]"><span>[{math equation="x - a * b" x=$oView->getArticleCount() a=$oViewConf->getArtPerPageCount() b=$page_navigation->actPage}] [{oxmultilang ident="GW_INFINITE_SCROLLING_LIST_PRODUCTS_AFTER"}]</span><span>&#9660;</span></a>
	[{else}]
		<div class="next-page"><hr /></div>
	[{/if}]
[{/if}]
