/**
* This is to load pizzas from pizzas.json file when the page loaded first time.
**/
$(document).ready(function() {
    //window so that we can use these variable across the window as a global variable
    window.totalAmount = 0;
    window.discountedAmount = 0;
    var url = 'http://localhost/wisdmlbs/pizzas.json';
    $('#div2').append('<div class="row" id="pizzas">');
    $.get(url).done(function(json) {
        window.json=json;
        console.log(json);
        for( var i=0; i<json.length;i++) {
            $("#pizzas").append('<div class="col s12 m6 l4"><div class="card"><span class="card-title ">'+json[i].name+'<br> @ &#8377;'+json[i].prize+'</span><div class="card-image"><img src="'+json[i].image+'"><a class="btn-floating halfway-fab waves-effect waves-light red" ><i class="material-icons" id ="'+i+'" onclick="addPizza(this.id);">add</i></a></div><div class="card-content"><span class="card-title ">Discount : '+json[i].discount+'%</span><p>'+json[i].ingredients+'</p></div></div></div>');
        }
    });
});


/**
* This function adds a pizza to order summary and also do the calulation for discount.
* @param it takes id of the pizza as a parameter
* @return returns nothing
**/
function addPizza(id){
    var name = window.json[id].name;
	var ingredients = window.json[id].ingredients;
	var price = window.json[id].prize;
	var discount = window.json[id].discount;
	swal({'title':'Pizza added','text':'select another pizza or continue to checkout!','type':'success'}); 
	$('#odsm').append('<h6>'+name + '<span style="float:right;">&#8377;' + price + "</span></h6>");
	window.totalAmount += parseInt(price);
	window.discountedAmount += price - (price*discount)/100;
	$('#total').html('&#8377;'+window.totalAmount);
	$('#disamount').html('&#8377;'+window.discountedAmount);
}

/**
* When user checkout this function make an AJAX call and print the message from order.json file
* @param it takes no parameter
* @return returns nothing
**/
function orderConf(){ 
    $.get('http://localhost/wisdmlbs/order.json')
        .done(function(data){
		  swal(data['message']);
	   });
}
