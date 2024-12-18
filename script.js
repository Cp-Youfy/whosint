function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true ); // false for synchronous request

    xmlHttp.onload = function () {
        if (callback) {
            callback(xmlHttp.status);
        }
    }
    
    xmlHttp.onerror = function() {
        if (callback) {
            callback(null);
        }
    };

    xmlHttp.send();
}

function getData(form) {
    var formData = new FormData(form);
    return Object.fromEntries(formData)
}

function validateId(userId) {
    // checks validity of the user id
    regexStr = /^[a-zA-Z0-9_\- .!#]*$/
    return regexStr.test(userId)
}

async function processResult(results) {
    userId = results['username'];

    if (!validateId(userId)) {
        document.getElementById('response').innerHTML  = "Invalid username provided!"
        return
    }

    document.getElementById('response').innerHTML  = ""
    resultHtml = ``

    if (results['facebook'] == 'true') {
        var fbLink = `https://graph.facebook.com/${userId}/picture`;
        httpGet(fbLink, function (fbStatus) {
            if (fbStatus !== null && fbStatus !== 400) {
                console.log("Response Status:", fbStatus); // Logs the response status (e.g., 200, 404)
                resultHtml += `<a href='https://facebook.com/${userId}' target='_blank'>Facebook</a>\n`
                document.getElementById('response').innerHTML = resultHtml;
            } else {
                console.log("Facebook account not found.");
            }        
        });
    }

    if (results['instagram'] == 'true') {
        resultHtml += `<a href='https://instagram.com/${userId}' target='_blank' class='unknown'>Instagram</a>\n`
        document.getElementById('response').innerHTML = resultHtml;        
    }

    if (results['twitter'] == 'true') {
        resultHtml += `<a href='https://twitter.com/${userId}' target='_blank' class='unknown'>Twitter</a>\n`
        document.getElementById('response').innerHTML = resultHtml;        
    }

    if (results['github'] == 'true') {
        const octokit = new window.Octokit();
        var githubLink = `https://github.com/${userId}`;
        try {
            githubResult = await octokit.request(`GET /users/${userId}`)
        }
        catch (e) {
            console.log("GitHub account not found")
        }
        resultHtml += `<a href='https://github.com/${userId}' target='_blank'>GitHub</a>\n`
        document.getElementById('response').innerHTML = resultHtml;     
    }
        
}
  
document.getElementById("search-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const results = getData(e.target);
    processResult(results)
});
  

