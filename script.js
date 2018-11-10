$( document ).ready(function() {
    console.log( "ready!" );

    $('#submit').click(function(){
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();

        $.ajax({
            url: "create_contact.php",
            type: 'get',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                phone: phone
            }
          })
        .done(function( data ) {
            console.log(data)
        });
    })

    $.ajax({
        url: "get_contacts.php",
        type: 'get',
        dataType: 'json'
      })
    .done(function( data ) {
        // console.log(data)
        var html = ''
        data.forEach(function(v, i, a){
            html += tablehtml(v)
        })

        $('#data').append(html);
    });

    function tablehtml(v){
        return '<tr><td>'+v.ID+'</td><td>'+v.name+'</td><td>'+v.email+'</td><td>'+v.phone+'</td><td style="background-color: green" class="edit">EDIT</td</tr>';
    }

    $('#data').on('click', 'tr', function(){
        console.log($(this).find('td').eq(0).text())

        var v = $(this).find('td').eq(0).text()

        window.location.href = "edit.html?id="+v
    })

    var url_string = window.location.href //window.location.href
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    console.log(id);

    if(id != null){
        $.ajax({
            url: "get_contact.php",
            type: 'get',
            dataType: 'json',
            data: {
                id: id
            }
          })
        .done(function( data ) {
            console.log(data)

            $('#name').val(data.name)
            $('#email').val(data.email)
            $('#phone').val(data.phone)
        });
    }

    $('#save_edit').click(function(){

        var url_string = window.location.href //window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        console.log(id);

        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();

        $.ajax({
            url: "edit_contact.php",
            type: 'get',
            dataType: 'json',
            data: {
                id: id,
                name: name,
                email: email,
                phone: phone
            }
          })
        .done(function( data ) {
            console.log(data)
            if(data.success){
                window.location.href = "view"
            }
        });
    })

    $('#search').keyup(function(){
        var val = $('#search').val();
        val = val.toLowerCase()

        // console.log($('#data tr'))

        $('#data tr').css('display', 'table-row')

        $.each($('#data tr'), function(i, v){
            if(i != 0) {
                var name = $(v).children().eq(1).text()
                var email = $(v).children().eq(2).text()
                var phone = $(v).children().eq(3).text()

                if(name.toLowerCase().indexOf(val) == -1 && email.toLowerCase().indexOf(val) == -1 && phone.toLowerCase().indexOf(val) == -1) {
                    $(v).css('display', 'none')
                }
            }
        })
    })
});