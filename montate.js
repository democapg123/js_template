<script type="text/javascript">var monetateT = new Date().getTime();</script>
<script type="text/javascript" src="//se.monetate.net/js/2/a-c9ef22a6/d/gyw.webshop-uat.rexel.com/entry.js"></script>
<script type="text/javascript">
var monetatePageType = pageType;
if (window.location.pathname.indexOf("/cart") != -1)
{
	monetatePageType="Cart";
} 
if(window.location.pathname.indexOf("/orderConfirmation") != -1)
{
monetatePageType="Order Confirmation";
}
if(window.location.pathname.indexOf("/joblistDetails") != -1)
{
monetatePageType="Joblist";
}


window.monetateQ = window.monetateQ || [];
window.monetateQ.push([
    "setPageType", monetatePageType.replace(/\s/g, '')
]);
console.log("start getting recommendations");
switch (monetatePageType) {
    case 'Product Page':
        window.monetateQ.push([
            "addProductDetails", [{
                "productId": productId,
                "sku": productId
            }]
        ]);



        break;
		
	case 'Joblist':

        var monetateProductRows = [];
        var jobListProductMonetate = document.querySelectorAll("a.joblist-details-product-name")
		for (var i = 0; i < jobListProductMonetate.length; i++) {
			var id = jobListProductMonetate[i].getAttribute('data-product-code');
            var productInfo = {};
            productInfo.productId = id;
            productInfo.sku = id;
            monetateProductRows.push(productInfo);
        }
		jobListProductMonetate = document.querySelectorAll("#wishlistEntries #checkboxContainer input.joblistDetailsChk");
		for (var i = 0; i < jobListProductMonetate.length; i++) {
			var id = jobListProductMonetate[i].getAttribute('value').split('_')[0];
            var productInfo = {};
            productInfo.productId = id;
            productInfo.sku = id;
            monetateProductRows.push(productInfo);
        }
		jobListProductMonetate = document.querySelectorAll("#wishlistEntries li.mlist-listItem");
		for (var i = 0; i < jobListProductMonetate.length; i++) {
			var id = jobListProductMonetate[i].getAttribute('id').split('_')[1];
            var productInfo = {};
            productInfo.productId = id;
            productInfo.sku = id;
            monetateProductRows.push(productInfo);
        }
		window.monetateQ.push([
            "addProducts", monetateProductRows
        ]);
		
		break;

    case 'Search Results':

        var monetateProductRows = [];
        var productsMonetate = document.querySelectorAll("#productListData .product-details-row");
        for (var i = 0; i < productsMonetate.length; i++) {



            var id = productsMonetate[i].getAttribute('data-product-code');
            var productInfo = {};
            productInfo.productId = id;
            productInfo.sku = id;
            monetateProductRows.push(productInfo);
        }

        window.monetateQ.push([
            "addProducts", monetateProductRows
        ]);
       history.pushState = function() {
       if (arguments[2].indexOf("?text=") > 0) {
        window.monetateQ.push(["setPageType", pageType.replace(/\s/g, "")]),
        monetateProductRows = [];
        var t = document.querySelectorAll("#productListData .product-details-row");
        for (i = 0; i < t.length; i++)
            id = t[i].getAttribute("data-product-code"),
            productInfo = {},
            productInfo.productId = id,
            productInfo.sku = id,
            monetateProductRows.push(productInfo);
        window.monetateQ.push(["addProducts", monetateProductRows]),
        window.monetateQ.push(["trackData"])
        }
       History.prototype.pushState.apply(history, arguments)
       };


        break;

    case 'Product Category':

        var monetateProductRows = [];
        var productsMonetate = document.querySelectorAll("#productListData .product-details-row");
        for (var i = 0; i < productsMonetate.length; i++) {



            var id = productsMonetate[i].getAttribute('data-product-code');
            var productInfo = {};
            productInfo.productId = id;
            productInfo.sku = id;
            monetateProductRows.push(productInfo);
        }

        window.monetateQ.push([
            "addProducts", monetateProductRows
        ]);
       history.pushState = function() {
       if (arguments[2].indexOf("?text=") > 0) {
        window.monetateQ.push(["setPageType", pageType.replace(/\s/g, "")]),
        monetateProductRows = [];
        var t = document.querySelectorAll("#productListData .product-details-row");
        for (i = 0; i < t.length; i++)
            id = t[i].getAttribute("data-product-code"),
            productInfo = {},
            productInfo.productId = id,
            productInfo.sku = id,
            monetateProductRows.push(productInfo);
        window.monetateQ.push(["addProducts", monetateProductRows]),
        window.monetateQ.push(["trackData"])
        }
       History.prototype.pushState.apply(history, arguments)
       };

        break;



    case 'Order Confirmation':
        var ordernumber = $("#gtm-erporderid").attr("gtm-erporderid");
        var purchasedRows = [];



        for (i = 0; i < $(".cartItem").length; i++) {
            var $item = $("#product_" + i);
            var productcode = $item.data("product-code");
            var qty = $item.data("item-qty");
            var unitAmount = $item.data("item-unitamount")+"";
			unitAmount = unitAmount=unitAmount.replace(",",".") ;unitAmount=unitAmount.replace(/[^\d.-]/g, '');
            var currency = $item.data("currency");
            var productInfo = {};
            productInfo.purchaseId = ordernumber;
            productInfo.productId = productcode;
            productInfo.quantity = qty;
            productInfo.unitPrice = unitAmount.substring(0, (unitAmount.indexOf('.') != -1) ? unitAmount.indexOf('.')+3 : unitAmount.length);
            productInfo.currency = currency;



            purchasedRows.push(productInfo);



        }
		window.monetateQ.push([ "addPurchaseRows",purchasedRows]);




        break;

    case 'Cart':
	
	     if  ( (canSeeMyPrices !=  'true') || (customerPriceflag != 'true'))
		{
        var monetateProductRows = [];
        $("#cartDetailsContainer .cart-item-entry .cart-details-container").each(function(index) {
		var productId = $(this).data("gtm-productcode");
			var productInfo = {};
            productInfo.productId = productId;
            productInfo.sku = productId;
            monetateProductRows.push(productInfo);
        });

        window.monetateQ.push([
            "addProducts", monetateProductRows
        ]);
		}

        var isCartReady = function() {
		   if (isAnonymousUser != 'false')
		    {
		     return $('#cartDetailsContainer input[name="productQuantity"]').length !=0;
		    }
		   if ($('#cartDetailsContainer .price div[data-lineamount]').length)
		   {
		      return $('#cartDetailsContainer .price div[data-lineamount=""]').length ==0;
		   }
		
		    return false;
        };
        var endTime = Number(new Date()) + 6000;
        var interval = 250;
        if (document.getElementById("cartDetailsContainer")) {
            if (isCartReady()) {
                var addCartRows = [];
			    var pricePresent = true;
                $("#cartDetailsContainer .cart-item-entry .cart-details-container").each(function(index) {
				    var productArray = {};
					var productElement = $('#cartLineQuantity_' + index);
					var productId = productElement.attr("data-productcode");
					productArray.productId = productId;
					var quantity = productElement.attr("value");
					var totalPriceElement = $('#cartLineListPriceContainer_' + $.escapeSelector(productId) + "_" + index + "[data-lineamount]");
					if (totalPriceElement.length > 0) {
						var totalPrice = totalPriceElement.data('lineamount') + "";
						totalPrice = totalPrice.replace(",", ".");
						totalPrice = totalPrice.replace(/[^\d.-]/g, '');
						var n = Number(totalPrice);
						var q = Number(quantity);
						var uprice = n / q;
						totalPrice = uprice.toString();
						var currency = $(this).data("currency");
						productArray.quantity = quantity;
						productArray.unitPrice = totalPrice.substring(0, (totalPrice.indexOf('.') != -1) ? totalPrice.indexOf('.') + 3 : totalPrice.length);
						productArray.currency = currency;
					} else {
						pricePresent = false;
						productArray.sku = productId;

					}

					addCartRows.push(productArray);
                });
				if (pricePresent)
				{
					window.monetateQ.push(["addCartRows", addCartRows]);
				}
				else {
					window.monetateQ.push(["addProducts", addCartRows]);
				   }
				    window.monetateQ.push([
                            "trackData"
                        ]);
            } else {

                (function poll() {
                    if (isCartReady()) {
                        window.monetateQ = window.monetateQ || [];
                        window.monetateQ.push([
                            "setPageType", pageType.replace(/\s/g, '')
                        ]);
                        var addCartRows = [];
						var pricePresent = true;
                        $("#cartDetailsContainer .cart-item-entry .cart-details-container").each(function(index) {
						var productArray = {};
						var productElement = $('#cartLineQuantity_' + index);
						var productId = productElement.attr("data-productcode");
						productArray.productId = productId;
						var quantity = productElement.attr("value");
						var totalPriceElement = $('#cartLineListPriceContainer_' + $.escapeSelector(productId) + "_" + index + "[data-lineamount]");
						if (totalPriceElement.length > 0) {
							var totalPrice = totalPriceElement.data('lineamount') + "";
							totalPrice = totalPrice.replace(",", ".");
							totalPrice = totalPrice.replace(/[^\d.-]/g, '');
							var n = Number(totalPrice)
							var q = Number(quantity);
							var uprice = n / q;
							totalPrice = uprice.toString()
							var currency = $(this).data("currency");
							productArray.quantity = quantity;
							productArray.unitPrice = totalPrice.substring(0, (totalPrice.indexOf('.') != -1) ? totalPrice.indexOf('.') + 3 : totalPrice.length);
							productArray.currency = currency;
						} else {
							pricePresent = false;
							productArray.sku = productId;

						}

						addCartRows.push(productArray);
                        });
                        if (pricePresent)
						{
							window.monetateQ.push(["addCartRows", addCartRows]);
						}
						else {
							window.monetateQ.push(["addProducts", addCartRows]);
						}
                        window.monetateQ.push([
                            "trackData"
                        ]);

                    } else if (Number(new Date()) < endTime)

                    {
                        setTimeout(poll, interval);
                    }

                })();
            }


        } else {
            var addCartRows = [];
            $("#cartItemsDisplay .cart-list-item-row .item-in-cart").each(function() {
                var productId = $(this).data("product-code");
                var quantity = $(this).data("item-qty");
                var unitPrice = $(this).data("item-unitamount")+"";
				unitPrice=unitPrice.replace(",",".") ;unitPrice=unitPrice.replace(/[^\d.-]/g, '');;
                var currency = $(this).data("currency");
                var productArray = {};
                productArray.productId = productId;
                productArray.quantity = quantity;
                productArray.unitPrice = unitPrice.substring(0, (unitPrice.indexOf('.') != -1) ? unitPrice.indexOf('.')+3 : unitPrice.length);
                productArray.currency = currency;
                addCartRows.push(productArray);
            });

            for (i = 0; i < $("#cartItemsDisplay .cart .cartItem").length; i++) {
                var $item = $("#product_" + i);
                var productId = $item.data("product-code");
                var quantity = $item.data("item-qty");
                var unitPrice = $item.data("item-unitamount")+"";
				unitPrice=unitPrice.replace(",",".") ;unitPrice=unitPrice.replace(/[^\d.-]/g, '');;
                var currency = $item.data("currency");
                var productArray = {};
                productArray.productId = productId;
                productArray.quantity = quantity;
                productArray.unitPrice = unitPrice.substring(0, (unitPrice.indexOf('.') != -1) ? unitPrice.indexOf('.')+3 : unitPrice.length);
                productArray.currency = currency;
                addCartRows.push(productArray);
            };
            window.monetateQ.push(["addCartRows", addCartRows]);
			 window.monetateQ.push([
                            "trackData"
                        ]);

        }


        break;




}
if(monetatePageType != "Cart")
{
window.monetateQ.push([
    "trackData"
]);
}

</script>
