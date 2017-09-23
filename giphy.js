var topic = ['cat', 'dog', 'bear', 'tiger', 'horse', 'monkey', 'fish', 'pig', 'cow', 'snake', 'hampster', 'elephant', 'aligator', 'bird'];
var gif;
var froze;
var action;
var stillFrame;

function initiateButtons() {
    $("#buttons").empty();
    for (var i = 0; i < topic.length; i++) {
        var selector = $('<button>').text(topic[i]).addClass('selector').attr({ 'data-name': topic[i] });
        $("#buttons").append(selector);
    }

    $('.selector').on('click', function() {
        $('.display').empty();

        var aGif = $(this).data('name');
        var database = "http://api.giphy.com/v1/gifs/search?q=animals+" + aGif + "&limit=10&api_key=gSxQRfvANurK8E9AZ6d5zPqB6inrcqZt";
        $.ajax({ url: database, method: 'GET' }).done(function(giphy) {
            gif = giphy.data;
            $.each(gif, function(index, value) {
                action = value.images.original.url;
                froze = value.images.original_still.url;
                var rateMe = value.rating;

                if (rateMe == '') {
                    rateMe = 'unrated';
                }
                var rating = $('<h4>').html('Rated: ' + rateMe).addClass('ratingStyle');
                stillFrame = $('<img>').attr('data-animated', action).attr('data-paused', froze).attr('src', froze).addClass('playOnHover');
                var displayRegular = $('<button>').append(rating, stillFrame);
                $('.display').append(displayRegular);
            });
        });
    });
}

$("#addAnimal").on('click', function() {
    var newAnimal = $("#animalSelector").val().trim();
    topic.push(newAnimal);
    initiateButtons();
    return false;
});

initiateButtons();