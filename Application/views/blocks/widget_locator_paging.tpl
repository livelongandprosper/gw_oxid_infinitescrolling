[{$smarty.block.parent}]
[{assign var="config" value=$oViewConf->getConfig()}]

widget_locator_paging.tpl

[{* adding some html elements so that the infinite scrolling javascript knows the next page *}]
[{assign var="page_navigation" value=$oView->getPageNavigationLimitedBottom()}]

[{* previous page *}]
[{if $page_navigation->previousPage}]
	<a href="[{$page_navigation->previousPage}]" class="prev-page" id="prev-page[{$page_navigation->actPage}]"></a>
[{/if}]

[{* next page *}]
[{if $page_navigation->nextPage}]
	<div class="clear"></div>
	<a href="[{$page_navigation->nextPage}]" class="next-page" id="next-page[{$page_navigation->actPage}]">[{math equation="x - a * b" x=$oView->getArticleCount() a=$oViewConf->getArtPerPageCount() b=$page_navigation->actPage}] [{oxmultilang ident="GW_INFINITE_SCROLLING_LIST_PRODUCTS_MORE"}]<br />&#9660;</a>
[{else}]
	<div class="next-page"><hr /></div>
[{/if}]
