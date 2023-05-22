
$('#add_user').submit(function(event){
    alert("Data Inserted Successfully!");
});

$('#update_user').submit(function(event){
    event.preventDefault();

    var unindexed_array= $('#update_user').serializeArray();
    var data = {}
    $.map(unindexed_array, function(n,i){
        data[n['name']]= n['value']
    })
    console.log(data);

    var request = {
        'url': `http://localhost:3000/api/users/${data.id}`,
        'method': 'PUT',
        'data': data,
        'headers':{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods':'OPTIONS, GET, POST, PUT',
      }

    }
    $.ajax(request).done(function(response){
        alert('Data Updated Successfully!');
    })
});

if(window.location.pathname == '/'){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            'url': `http://localhost:3000/api/users/${id}`,
            'method': 'DELETE'
        }

        if(confirm('Are you sure?')){
            $.ajax(request).done(function(response){
                alert('Data deleted successfully!');
                location.reload()
            })
        }
    })
}