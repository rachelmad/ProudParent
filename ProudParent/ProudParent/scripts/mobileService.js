var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient('https://proudparent.azure-mobile.net/', 'GNfvCzrtbLcdewuARUUjlKeLCFlWIT39');

var userTable = client.getTable('User');

function signUp(form) {
    var checkUnique = userTable.where({
        userName: form.uName.value
    }).read().done(function (results) {
        if (JSON.stringify(results)=="[]") {
            userTable.insert({
                firstName: form.fName.value,
                lastName: form.lName.value,
                userName: form.uName.value,
                password: form.pword.value
            })

            alert("Done");
        } else {
            alert("Sorry. That email is already in use.");
        }
    })
};
    


function authenticateEmail(form) {
    var authenticate = userTable.where({
        userName: form.uName.value,
        password: form.pword.value
    }).select('firstName')
        .read().done(function (results) {
            if (JSON.stringify(results) == "[]") {
                alert("Sorry. Your email or password were incorrect.")
            } else {
                alert(JSON.stringify(results));
            };
        }, function (err) {
            alert("Error: " + err);
        })
};
         
        
    