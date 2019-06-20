// globale Variablen initialisieren
var gw_oxid_infinitescrolling_ajax_loading = false,
    gw_oxid_infinitescrolling_images_to_unveil = [],
    gw_oxid_infinitescrolling_next_page_auto_loads_count = 0;
;

// IIFE - Immediately Invoked Function Expression
(function(gw) {
    // The global jQuery object is passed as a parameter
    gw(window.jQuery, window, document);
}(function($, window, document) {
    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function() {
        // DOM is ready!
        /////////////////////////////
        // jQuery Code Go

        /*******************************************************/
        // AJAX scrolling (infinite scrolling)

        // check if needed variables are set
        if(typeof gw_oxid_infinitescrolling_scrollpagesamount === 'undefined') {
            // debug
            console.log('gw_oxid_infinitescrolling_scrollpagesamount is not set - infinite scrolling will not work properly; maybe clearing cache helps');
            return false;
        }
        if(typeof gw_oxid_infinitescrolling_offset === 'undefined') {
            // debug
            console.log('gw_oxid_infinitescrolling_offset is not set - infinite scrolling will not work properly; maybe clearing cache helps');
            return false;
        }
        if(typeof gw_oxid_infinitescrolling_base_url === 'undefined') {
            // debug
            console.log('gw_oxid_infinitescrolling_base_url is not set - infinite scrolling will not work properly; maybe clearing cache helps');
            return false;
        }

        // hide standard listing paginations buttons
        $("#list-functions-bottom,.pagination").hide();

        /**
         * load next articles and append them to product list
         */
        function gw_oxid_infinitescrolling_load_next_articles(auto) {
            auto = auto || false;
            if(!gw_oxid_infinitescrolling_ajax_loading) {
                gw_oxid_infinitescrolling_ajax_loading = true;
                var $next_page_link = $(".gw_oxid_infinitescrolling-next-page"),
                    next_page_url = "",
                    next_page_title = ""
                ;
                if($next_page_link.length > 0) {
                    next_page_url = $next_page_link.attr("href");
                }

                if(next_page_url) {
                    loading_delay = 0; // this is used to delay every slide down of via ajax loaded content
                    $.get(next_page_url, function(data){
                        next_page_title = $(data).filter('title').text();
                        $items_to_add = $(data).find(".list-container");
                        $new_next_page_link = $(data).find(".gw_oxid_infinitescrolling-next-page");
                        $items_to_add.find("> .row").each(function(){
                            var $productList = $(".list-container");
                            $(this).hide();
                            if( $productList.length > 0 ) {
                                // trigger image unveil
                                var $image = $(this).find("img");
                                $image.unveil();
                                gw_oxid_infinitescrolling_images_to_unveil.push($image);

                                // add article to list
                                $productList.append($(this));
                            }

                            $(this).delay(loading_delay+=50).slideDown(400);
                        });

                        // add the next page link
                        $(".gw_oxid_infinitescrolling-next-page").replaceWith($new_next_page_link);

                        // ajax loading complete
                        gw_oxid_infinitescrolling_ajax_loading = false;
                    }).done(function(){
                        gw_oxid_infinitescrolling_trigger_infiniteScrollingDone(next_page_url, next_page_title);

                        if(auto) {
                            gw_oxid_infinitescrolling_next_page_auto_loads_count++;
                        }
                    });
                } else {
                    gw_oxid_infinitescrolling_ajax_loading = false;
                }
            }
        }

        /**
         * load previous articles and prepend them to product list
         */
        function gw_oxid_infinitescrolling_load_prev_articles() {
            if(!gw_oxid_infinitescrolling_ajax_loading) {
                gw_oxid_infinitescrolling_ajax_loading = true;
                var $prev_page_link = $(".gw_oxid_infinitescrolling-prev-page"),
                    prev_page_url = "",
                    prev_page_title = ""
                ;
                if ($prev_page_link.length > 0) {
                    prev_page_url = $prev_page_link.attr("href");
                }

                if(prev_page_url) {
                    loading_delay = 0; // this is used to delay every slide down of via ajax loaded content
                    $.get(prev_page_url, function (data) {
                        prev_page_title = $(data).filter('title').text();
                        $items_to_add = $(data).find(".list-container");
                        $new_prev_page_link = $(data).find(".gw_oxid_infinitescrolling-prev-page");
                        $items_to_add.find("> .row").each(function () {
                            var $productList = $(".list-container");
                            $(this).hide();
                            if ($productList.length > 0) {
                                // trigger image unveil
                                var $image = $(this).find("img");
                                $image.unveil();
                                gw_oxid_infinitescrolling_images_to_unveil.push($image);

                                // add article to list
                                $productList.prepend($(this));
                            }

                            $(this).delay(loading_delay += 50).slideDown(400);
                        });

                        // add the prev page link
                        $(".gw_oxid_infinitescrolling-prev-page").replaceWith($new_prev_page_link);

                        // ajax loading complete
                        gw_oxid_infinitescrolling_ajax_loading = false;
                    }).done(function () {
                        gw_oxid_infinitescrolling_trigger_infiniteScrollingDone(prev_page_url, prev_page_title);
                    });
                } else {
                    gw_oxid_infinitescrolling_ajax_loading = false;
                }
            }
        }

        /**
         * trigger event infiniteScrollingDone
         */
        function gw_oxid_infinitescrolling_trigger_infiniteScrollingDone(loadeddataurl,pagetitle) {
            // trigger event that infinite scrolling is done
            $.event.trigger({
                type: "infiniteScrollingDone",
                pagetitle: pagetitle,
                url: loadeddataurl,
                time: new Date()
            });
        }

        /**
         * rhingthat have to be done after infinite scrolling is done
         */
        $(window).on('infiniteScrollingDone', function(event){
            // add history state
            var stateObj = {};
            history.pushState(stateObj, event.pagetitle, event.url);

            // debug
            // console.log(event);

            // trigger resize so that images are loaded in case they are on viewport
            $.each(gw_oxid_infinitescrolling_images_to_unveil, function(){
                $(this).trigger('unveil');
            });
            gw_oxid_infinitescrolling_images_to_unveil = [];
        });

        /**
         * if content is scrolled trigger loading next articles
         */
        $(window).scroll(function(){
            // debug
            // shoe scroll trigger line
            /*
            $("#scroll-trigger").css({
                'height':'1px',
                'background':'red',
                'display':'block'
            });
            */

            scroll_trigger_position = $("#scroll-trigger").position();

            // debug
            // console.log(scroll_trigger_position.top + " < " + ($(document).scrollTop()+$(window).height()+gw_oxid_infinitescrolling_offset));

            // perform load
            if( scroll_trigger_position.top < ($(document).scrollTop()+$(window).height()+gw_oxid_infinitescrolling_offset) && !gw_oxid_infinitescrolling_ajax_loading && gw_oxid_infinitescrolling_next_page_auto_loads_count < gw_oxid_infinitescrolling_scrollpagesamount) {
                gw_oxid_infinitescrolling_load_next_articles(true);
            }
        });

        // if user clicks on next-page-Link trigger infinite scrolling
        $(document).on('click', '.gw_oxid_infinitescrolling-prev-page', function(event){
            gw_oxid_infinitescrolling_load_prev_articles();
            return false;
        });

        // if user clicks on prev-page-Link trigger infinite scrolling
        $(document).on('click', '.gw_oxid_infinitescrolling-next-page', function(event){
            gw_oxid_infinitescrolling_load_next_articles();
            return false;
        });
        /*******************************************************/


        // jQuery Code End
        /////////////////////////////
    });
    // Hier kommt der Rest des Codes hin
}));
