var ids = [
    "f505c4ff-df10-4bbf-943b-3b72c225911d",
    "c577fe83-6290-4abb-95f5-bb82ec4d5070",
    "9294dc50-3210-4b92-a478-a29bc915de0f",
    "aaedb8cf-39a0-44cb-b3a6-994314dd207f",
    "13f06fb8-59c6-47f7-9447-fbe8aaa0827e",
    "9a684020-722e-4f63-9bbf-c05abff2afe9",
    "733caf69-3cf0-4fa1-8301-833f7fbc6542",
    "6f2d14e8-7d4d-4aac-8977-6f5389401fe1",
    "89e6e91f-1591-494b-935c-d76f2f0910c8",
    "8669a29a-3de0-4035-b05d-1fea7a2b6015",
    "efcdfe89-70ee-45cf-8eff-43b49a96e018",
    "8c494ab3-30c4-43a0-8f41-8ff49164a5ac",
    "55052ec1-4e8c-4b05-b4cb-0a7ba53456a1",
    "57d9e311-7cb0-4646-9ada-ea93c7d8beef"
];

var index = 0;

var imageIds = [];

function nextLightbox(){
        index++;
        openLightbox();
    }

function openLightbox(){
    if(ids[index]){
        var id = ids[index];
        let promise = new Promise(function(resolve, reject) {
        window.promiseHandle = function (message, ids){
            console.log(`${message} | ${id} | ${index}`);
            imageIds = imageIds.concat(ids);
            resolve(message);
        }
        });

        promise.then(
            result => nextLightbox(),
            error => alert(error)
        );

        var win = window.open('printLightBox.aspx?lbid=' + id);
        var script = document.createElement('script');
        script.innerHTML = `
            console.log("running script");
            window.onload = (event) => {
                (async () => {
                    await import('https://code.jquery.com/jquery-2.2.4.min.js');
                    var $ = jQuery;
                    var imageIds = [];
                    $('.imageRef').each(function(){
                        var id = this.innerText;
                        id = id.slice(10);
                        id = id.split('-')[0].trim();
                        imageIds.push(id);
                    })
                    console.log(imageIds);
                    window.opener.promiseHandle('IDs received', imageIds);
                    window.close();
                  })()
            }
        `;
        win.document.head.appendChild(script);
    } else {
        console.log('Automation finished running');
        console.log(imageIds);
    }
}
openLightbox();