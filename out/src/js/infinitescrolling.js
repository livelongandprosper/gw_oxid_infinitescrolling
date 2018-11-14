// globale Variablen initialisieren
var gw_oxid_infinitescrolling_ajax_loading = false;
var gw_oxid_infinitescrolling_images_to_unveil = [];

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

        // check if max auto page amount is set
        if(typeof gw_oxid_infinitescrolling_scrollpagesamount === 'undefined') {
            console.log('gw_oxid_infinitescrolling_scrollpagesamount is not set - infinite scrolling will not work properly');
            return false;
        }

        // hide standard listing paginations buttons
        $("#list-functions-bottom,.pagination").hide();

        /**
         * load next articles and append them to product list
         */
        function gw_oxid_infinitescrolling_load_next_articles() {
            next_page_url = "";
            next_page_title = "";
            if($(".gw_oxid_infinitescrolling-next-page").length > 0) {
                next_page_url = $(".gw_oxid_infinitescrolling-next-page").attr("href");
            }

            gw_oxid_infinitescrolling_ajax_loading = true;
            loading_delay = 0;
            $.get(next_page_url, function(data){
                next_page_title = $(data).filter('title').text();
                $items_to_add = $(data).find("#productList");
                $new_next_page_link = $(data).find(".gw_oxid_infinitescrolling-next-page");
                $items_to_add.find(".productBox").each(function(){
                    var $productList = $("#productList");
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
            });
        }

        /**
         * load previous articles and prepend them to product list
         */
        function gw_oxid_infinitescrolling_load_prev_articles() {
            prev_page_url = "";
            if($(".gw_oxid_infinitescrolling-prev-page").length > 0) {
                prev_page_url = $(".gw_oxid_infinitescrolling-prev-page").attr("href");
            }

            gw_oxid_infinitescrolling_ajax_loading = true;
            loading_delay = 0;
            $.get(prev_page_url, function(data){
                prev_page_title = $(data).filter('title').text();
                $items_to_add = $(data).find("#productList");
                $new_prev_page_link = $(data).find(".gw_oxid_infinitescrolling-prev-page");
                $items_to_add.find(".productBox").each(function(){
                    var $productList = $("#productList");
                    $(this).hide();
                    if( $productList.length > 0 ) {
                        // trigger image unveil
                        var $image = $(this).find("img");
                        $image.unveil();
                        gw_oxid_infinitescrolling_images_to_unveil.push($image);

                        // add article to list
                        $productList.prepend($(this));
                    }

                    $(this).delay(loading_delay+=50).slideDown(400);
                });

                // add the prev page link
                $(".gw_oxid_infinitescrolling-prev-page").replaceWith($new_prev_page_link);

                // ajax loading complete
                gw_oxid_infinitescrolling_ajax_loading = false;
            }).done(function(){
                gw_oxid_infinitescrolling_trigger_infiniteScrollingDone(prev_page_url, prev_page_title);
            });
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

        $(window).on('infiniteScrollingDone', function(event){
            // add history state
            var stateObj = {};
            history.pushState(stateObj, event.pagetitle, event.url);
            console.log(event);
            
            // trigger resize so that images are loaded in case they are on viewport
            $.each(gw_oxid_infinitescrolling_images_to_unveil, function(){
                $(this).trigger('unveil');
            });
            gw_oxid_infinitescrolling_images_to_unveil = [];
        });


        $(window).scroll(function(){
            // TODO:
            // - implement loading next articles with gw_oxid_infinitescrolling_load_next_articles on scroll



            scroll_trigger_position = $("#scroll-trigger").position();


            /*
                    console.log(next_page_url);
                    console.log(scroll_trigger_position.top + " = " + ($(document).scrollTop()+$(window).height()+350));
                    console.log("next page: "+next_page_url);
            */


            // perform load
            if( scroll_trigger_position.top < ($(document).scrollTop()+$(window).height()-75) && !gw_oxid_infinitescrolling_ajax_loading && typeof next_page_url !== 'undefined' && next_page_url != "" ) {
                // TODO: trigger next article load on scroll
            }
        });

        // if user clicks on next-page-Link trigger infinite scrolling
        $(document).on('click', '.gw_oxid_infinitescrolling-prev-page', function(event){
            gw_oxid_infinitescrolling_load_prev_articles();
            return false;
        });
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