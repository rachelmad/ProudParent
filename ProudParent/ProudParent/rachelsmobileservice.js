// http://go.microsoft.com/fwlink/?LinkID=290993&clcid=0x409
var rachelsmobileserviceClient;
document.addEventListener("deviceready", function () {    
    rachelsmobileserviceClient = new WindowsAzure.MobileServiceClient(
                    "https://rachelsmobileservice.azure-mobile.net/",
                    "FybjaWRRXhfhrKtjnpfwLiBLJIZLzZ95");
});