$(document).ready(function () {
    let maxDate = moment().subtract(1, 'hours').format("YYYY-MM-DDTHH:mm");
    console.log(maxDate)
    $('#input_datetime').prop('max', maxDate)

    $('#submit').click(function () {
        let datetime = $('#input_datetime').val();
        let timestamp = moment(datetime).format("X");

        $.ajax({
            url: `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${timestamp}&units=kilometers`,
            type: 'get',
            dataType: 'JSON',
            success: function (result) {
                let latitude = result[0].latitude;
                let longitude = result[0].longitude;
                console.log(latitude, longitude)

                $.ajax({
                    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyAZMZJEJfLv1y-2sUY-w9huZB4YR7QhlV8`,
                    success: function (result) {
                        console.log(result['results'][0]['formatted_address'])
                        // $("#result").val(result[0].results.formatted_address);
                        let row = `<tr><td>${latitude}</td><td>${longitude}</td><td>${result['results'][0]['formatted_address']}</td></tr>`
                        $("#result tbody").append(row)
                    }
                })
            }
        });
    });
})