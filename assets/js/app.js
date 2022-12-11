$(document).ready(function () {
    $(".text-show").draggable({
        containment: ".show-result",
        cursor: "all-scroll"
    });


    $(".image-preview").draggable({
        containment: ".show-result",
        cursor: "all-scroll"
    });

    $(".image-preview").resizable();

    const textShow = $('.text-show');

    $('body').on('input', '#inputRangeSize', function () {
        let val = $(this).val();
        $('.label-ranger .js-font-size').text(val)
        changeFontSize(textShow, val);
    });

    /* Upload Icon */
    $("#photo").change(function () {
        const file = this.files[0];
        /* validation file */
        var ext = $(this).val().split('.').pop().toLowerCase();
        if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'svg']) == -1) {
            alert('File không đúng định dạng, vui lòng tải lại!');
        } else {
            if (file) {
                $('.image-preview .ui-icon').css('opacity', '.8')
                let reader = new FileReader();
                reader.onload = function (event) {
                    var img = $('<img id="image-draggable">');
                    img.attr('src', event.target.result);
                    img.appendTo('.image-preview');
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // $('#text-area').bind('input propertychange', function() {
    //     textShow.html($(this).val().replace(/\r\n|\r|\n/g,"<br />"));
    // });

    $('.btn-approved').on('click', function () {
        var val = $('#text-area').val().replace(/\n/g," ");
        var reg = /\n/g; // Check Text Key Enter
        if (val.length === 0) {
            alert('Vui Lòng Nhập Văn Bản')
        } else {
            var valArr = val.split(" ");
            textShow.empty();
            console.log(valArr);
            $.each(valArr, function (i, text) {
                $(`<div class='d-inline-block mr-4 child ${i}'> ${text} 
                        <div class="show-color bg-white border-round d-none p-2">
                            <div class="color-wrapper d-flex justify-content-between">
                                <button data-color="shadow-white" class="item-color bg-shadow-white"></button>
                                <button data-color="shadow-orange" class="item-color bg-shadow-orange"></button>
                                <button data-color="shadow-yellow" class="item-color bg-shadow-yellow"></button>
                                <button data-color="shadow-mint" class="item-color bg-shadow-mint"></button>
                                <button data-color="shadow-green" class="item-color bg-shadow-green"></button>
                                <button data-color="shadow-deep-blue" class="item-color bg-shadow-deep-blue"></button>
                                <button data-color="shadow-purple" class="item-color bg-shadow-purple"></button>
                                <button data-color="shadow-pink" class="item-color bg-shadow-pink"></button>
                                <button data-color="shadow-red" class="item-color bg-shadow-red"></button>
                            </div> 
                        </div>
                    </div>`).appendTo(textShow);
                
                $(".text-show .child").draggable({
                    containment: ".show-result",
                    cursor: "all-scroll"
                });
            })
        }
    })

    $(document).on('click', '.text-show .child', function () {
        $('.text-show .child .show-color').addClass('d-none');
        var showColor = $(this).find('.show-color');
        showColor.removeClass('d-none');
    });

    $(document).on('click', '.text-show .show-color .item-color', function (e) {
        e.stopPropagation();
        var classColor = $(this).data('color');
        var textParent = $(this).parent().closest('.child');
        textParent.removeClass(function (index, className) {
            return (className.match(/(^|\s)shadow-\S+/g) || []).join('');
        });
        textParent.addClass(classColor);
        $('.text-show .child .show-color').addClass('d-none');
    })


    $('.js-click-font').on('click', function (e) {
        e.preventDefault();
        $('.js-click-font').removeClass('current');
        $(this).addClass('current');

        textShow.css('font-family', $(this).data('name'));
    })

    $('.js-click-color').on('click', function (e) {

        var classNameColor = $(this).data('name');
        var imageColor = $(this).parent().attr('data-image') ? $(this).parent().data('image') : false;

        /* Change background */
        var urlImage = './assets/images/color-image/';
        if (imageColor != false) {
            $('.image-by-color img').attr('src', urlImage + imageColor);
        } else {
            $('.image-by-color img').attr('src', './assets/images/color-image/pink.jpg');
        }

        /* Change Color */
        textShow.removeClass(function (index, className) {
            return (className.match(/(^|\s)shadow-\S+/g) || []).join('');
        });
        textShow.addClass('shadow-' + classNameColor);
        $('.js-click-color').find('span').css('color', '');
        $(this).find('span').css('color', $(this).data('value'));

    });

});

function changeFontSize(element, sizeValue) {
    element.css('font-size', sizeValue + 'px');
}

// function get_random () {
//     var arr = [];
//     $('.js-click-color').each(function(i,val){
//         var color = $(val).data('name');
//         arr.push(color);
//     })
//     return arr[Math.floor((Math.random()*arr.length))];
// }

/* Suggestions color section */
// function suggestionsText() {
//     var ele =  $('.text-suggestion span');
//     for (var i = 0; i < ele.length; i++) {
//         ele.eq(i).addClass('shadow-' + get_random());
//     }
//     $('.text-suggestion').on('click',function(evt){
//         $('.text-show').empty().append($(this).html());
//     });
// }