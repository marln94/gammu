function obtener(estadoMenu) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "./menu.html?estado-menu=" + estadoMenu,
            contentType: "application/text/html; charset=utf-8",
            dataType: "html",
            success: function (result) {
                $("header").append(result);
                $('#left-side').sidenav();
                $(".dropdown-trigger").dropdown();
        
                $('#ocultar').click((e) => {
                    e.stopPropagation();
                    if (!$('.menu-title').is(':hidden')) {
                        $('.menu-title').toggle();
                        $('.sidenav').animate({width: '85px'});
                        $('main, footer').animate({paddingLeft: '85px'});
                        $('#ocultar i').html('navigate_next');
                    } else{
                        $('.sidenav').animate({width: '230px'});
                        $('main, footer').animate({paddingLeft: '230px'}, () => {
                            $('.menu-title').toggle();
                        });
                        $('#ocultar i').html('navigate_before');
                    }
                })

                resolve();
            }
        });
    })
}

