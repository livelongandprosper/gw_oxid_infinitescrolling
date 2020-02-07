<?php
/**
 * Metadata version
 */
$sMetadataVersion = '2.0'; // see https://docs.oxid-esales.com/developer/en/6.0/modules/skeleton/metadataphp/version20.html
/**
 * Module information
 */
$aModule = array(
	'id'           => 'gw_oxid_infinitescrolling',
	'title'        => 'Infinite Scrolling',
	'description'  => array(
		'de'=>'Unendliches scrollen durch die Artikel auf Artikel-Listen-Seiten (Kategorien, Suche).',
		'en'=>'Infinite scroll through the articles on article list pages (e.g., categories).',
	),
	'thumbnail'		=> '',
	'version'		=> '1.0.2',
	'email'			=> 'email@gewend.de',
	'url'			=> 'https://www.gewend.de',
	'author'		=> 'g:wend Webentwicklung, Gregor Wendland',
	'settings' => array(
		array('group' => 'infinitescrolling', 'name' => 'gw_oxid_infinitescrolling_scrollpagesamount', 'type' => 'str', 'value' => '5'),
		array('group' => 'infinitescrolling', 'name' => 'gw_oxid_infinitescrolling_offset', 'type' => 'str', 'value' => '500'),
	),
	'extend'       => array(
	),
	'blocks' => array(
		array(
			/*'theme' => 'flow',*/
			'template' => 'layout/base.tpl',
			'block' => 'base_style',
			'file' => 'Application/views/blocks/base_style.tpl'
		),
		array(
			/*'theme' => 'flow',*/
			'template' => 'page/list/list.tpl',
			'block' => 'page_list_productlist',
			'file' => 'Application/views/blocks/productlist.tpl'
		),
		array(
			/*'theme' => 'flow',*/
			'template' => 'page/search/search.tpl',
			'block' => 'search_results',
			'file' => 'Application/views/blocks/productlist.tpl'
		),
		array(
			/*'theme' => 'flow',*/
			'template' => 'widget/locator/paging.tpl',
			'block' => 'widget_locator_paging',
			'file' => 'Application/views/blocks/widget_locator_paging.tpl'
		),
	),
	'events'       => array(
	),
	'controllers'  => [
	],
	'templates' => [
	]
);
