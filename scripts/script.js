$(document).ready(() => {
    getCurrentQuote()
    ///////////////////////////////////////////////////////////////////////////
    //////////////////////////Get Currency Quote///////////////////////////////
    $("#coin-selector").on('change', getCurrentQuote)
    function getCurrentQuote() {
        const selectCoin = $("#coin-selector").val()
        $.ajax({
            url: `https://economia.awesomeapi.com.br/json/last/${selectCoin}`,
            method: "GET"
        }).done((data) => {

            let resData = data[selectCoin.replace('-', '')]

            $("#coin-title").html(resData.name)
            $("#current-quote-return").html(`
                <td>${new Date(resData.timestamp * 1000).toDateString()}</td>
                <td>${resData.low}</td>
                <td>${resData.high}</td>
                <td>${resData.bid}</td>`)
        });
        $.ajax({
            url: `https://economia.awesomeapi.com.br/json/daily/${selectCoin}/7`,
            method: "GET"
        }).done((data) => {
            $("#period-quote-return").html('')
            for (let i = 0; i < data.length; i++) {
                $("#period-quote-return").append(`
                <tr>
                <td>${new Date(data[i].timestamp * 1000).toDateString()}</td>
                <td>${data[i].low}</td>
                <td>${data[i].high}</td>
                <td>${data[i].bid}</td>
                </tr>`)
            }

        });
    }
    //////////////////////////Get Currency Quote///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////Get Period//////////////////////////////////
    $("#get-period").on('click', () => {

        const selectCoin = $("#coin-selector").val()

        let initialDateValue = $("#initial-date").val()
        let finalDateValue = $("#final-date").val()

        let initialDate = new Date(initialDateValue.replace(/\-/g, '/'))
        let finalDate = new Date(finalDateValue.replace(/\-/g, '/'))

        let initialDateString = initialDateValue.replace(/\-/g, '')
        let finalDateString = finalDateValue.replace(/\-/g, '')

        const currentDate = new Date()

        $("#selected-period-quote-return").html('')

        if (initialDate == "Invalid Date" && finalDate == "Invalid Date") {
            $("#error-return").html("Select the data collection period")
        }
        else if (initialDate == "Invalid Date") {
            $("#error-return").html('Select the start date')
        }
        else if (finalDate == "Invalid Date") {
            $("#error-return").html('Select the final date')
        }
        else if (initialDate > finalDate) {
            $("#error-return").html('Start date greater than end date')
        }
        else if (initialDate > currentDate) {
            $("#error-return").html('Start Date greater than current date')
        }
        else if (finalDate > currentDate) {
            $("#error-return").html('End date greater than current date')
        } else {

            $.ajax({
                url: `https://economia.awesomeapi.com.br/json/${selectCoin}/?start_date=${initialDateString}&end_date=${finalDateString}`,
                method: "GET"
            }).done((data) => {
                let resData = data[0]
                
                $("#selected-period-quote-return").append(`
                    <tr>
                        <td>${new Date(resData.timestamp * 1000).toDateString()}</td>
                        <td>${resData.low}</td>
                        <td>${resData.high}</td>
                        <td>${resData.bid}</td>
                    </tr>`)
                    $("#error-return").html('A culpa é do programador da API')
            });
        }
    });
    ///////////////////////////////Get Period//////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
})