var ids = [];
        
var index = 0;

function nextImage(){
        index++;
        downloadImage();
    }

function downloadImage(){
    if(ids[index]){
        var id = ids[index];
        let promise = new Promise(function(resolve, reject) {
        window.promiseHandle = function (message){
            console.log(`${message} | ${id} | ${index}`);
            resolve(message);
        }
        });

        promise.then(
            result => nextImage(),
            error => alert(error)
        );

        var win = window.open('https://www.alamy.com/' + id);
        var script = document.createElement('script');
        script.innerHTML = `
            console.log("running script");
            var change_index = 0;
            window.onload = (event) => {
                if(document.getElementById('UC_ImageDetailsV2_PackDownloadExistsWarning').style.display === 'none'){
                    $('#btnBuyNwCusPrice').click();
                    var observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if(mutation.attributeName === 'style'){
                                if(change_index < 1){
                                    change_index++;
                                    console.log('style changed to indicate image is purchased');
                                    window.opener.promiseHandle('Image purchased');
                                    window.close();
                                }
                            }
                        });    
                    });
                    var observerConfig = {
                        attributes: true, 
                        attributeFilter: ["style"]
                    };
                    var targetNode = document.getElementById('UC_ImageDetailsV2_PackDownloadExistsWarning');
                    observer.observe(targetNode, observerConfig);
                } else {
                    window.opener.promiseHandle('Image skipped, already purchased');
                    window.close();
                }
            };
        `;
        win.document.head.appendChild(script);
    } else {
        console.log('Automation finished running');
    }
}
downloadImage();