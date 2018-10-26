// globale Variablen initialisieren
var touch_flag = false;
var ajax_load_count = 1;
var ajax_loading = false;

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
        /* 	$("#list-functions,#list-functions-bottom").hide(); */
        $("#list-functions-bottom,.pagination").hide();
        $(window).scroll(function(){
            scroll_trigger_position = $("#scroll-trigger").position();

            next_page_url = "";
            if($("#product-list-box #next-page"+ajax_load_count).length > 0) {
                next_page_url = $("#product-list-box #next-page"+ajax_load_count).attr("href");
            }

            /*
                    console.log(next_page_url);
                    console.log(scroll_trigger_position.top + " = " + ($(document).scrollTop()+$(window).height()+350));
                    console.log("next page: "+next_page_url);
            */


            // perform load
            if( scroll_trigger_position.top < ($(document).scrollTop()+$(window).height()-75) && !ajax_loading && next_page_url != "" ) {
                ajax_loading = true;
                loading_delay = 0;
                $("#product-list-box").after('<div class="list-loading-circle" />');
                $(".list-loading-circle").delay(500).slideDown();
                $("#product-list-box #next-page"+ajax_load_count).delay(500).slideUp(function(){
                    $.get(next_page_url, function(data){
                        items_to_add = $(data).find("#product-list-box");
                        next_page_link = $(data).find(".next-page");
                        items_to_add.find(".proxid-product-list-item").each(function(){
                            $(this).hide();
                            if( $("#productList").length > 0 ) {
                                //new template (1.1)
                                $("#productList").append($(this));
                            } else {
                                // old template (1.0)
                                $("#product-list-box").append($(this));
                            }

                            $(this).delay(loading_delay+=50).slideDown(400);
                        });
                        ajax_load_count++;

                        // hide loading circle
                        window.setTimeout(function(){
                            $(".list-loading-circle").slideUp(function(){
                                $(this).remove();
                            });
                        }, 300);

                        // add the next page link
                        window.setTimeout(function(){
                            next_page_link.hide();
                            if($("#productList").length > 0) {
                                //new template (1.1)
                                $("#productList").append(next_page_link);
                            } else {
                                // old template (1.0)
                                $("#product-list-box").append(next_page_link);
                            }
                            next_page_link.slideDown();
                            ajax_loading = false;
                        }, 300);

                        // trigger event that infinite scrolling is done
                        $.event.trigger({
                            type: "infiniteScrollingDone",
                            message: "infiniteScrollingDone Message",
                            time: new Date()
                        });
                        if( jQuery ) {
                            jQuery.event.trigger({
                                type: "infiniteScrollingDone",
                                message: "infiniteScrollingDone Message",
                                time: new Date()
                            });
                        }
                    });
                });
            }
        });

        // if user clicks on next-page-Link trigger infinite scrolling
        $(document).on('click', '.next-page', function(event){
            $('html, body').animate({
                scrollTop: $(document).height()
            },100);
            event.preventDefault();
        });
        /*******************************************************/


        // jQuery Code End
        /////////////////////////////
    });
    // Hier kommt der Rest des Codes hin
}));