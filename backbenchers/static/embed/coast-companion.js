(function (embedUrl, defaultHidden, buttonColor, showToggleBtnPrompt) {

    // Insert iFrame into the Page
    var iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.frameBorder = '0';
    iframe.style.minHeight = '600px';
    iframe.style.minWidth = '400px';
    iframe.id = 'chatbot-iframe';
    iframe.style.width = "400px"
    iframe.style.height = "600px"
    iframe.style.borderRadius = '10px';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '35px';
    iframe.style.right = '70px';
    iframe.style.display = 'none';
    iframe.style.zIndex = '10000';
    iframe.style.boxShadow = 'rgba(0, 52, 164, 0.4) 0px 4px 12px';
    document.body.appendChild(iframe);

    // Insert the Show/Hide button
    var toggleBtn = document.createElement('button');
    var hidden = defaultHidden;
    iframe.style.display = hidden ? 'none' : 'block';
    toggleBtn.innerHTML = '<img src="assets/cc-logo.png" width="28"/>';
    toggleBtn.onclick = function () {
        hidden = !hidden;
        alert.style.display = 'none';
        iframe.style.display = hidden ? 'none' : 'block';
        toggleBtn.style.borderColor = buttonColor;
        toggleBtn.style.borderLeftColor = buttonColor;
        toggleBtn.style.borderRightColor = buttonColor;
        toggleBtn.style.accentColor = buttonColor;
        toggleBtn.style.backgroundColor = buttonColor;
        toggleBtn.style.backgroundColor = buttonColor;
    };
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '20px';
    toggleBtn.style.right = '10px';
    toggleBtn.style.height = '50px';
    toggleBtn.style.width = '50px';
    toggleBtn.style.borderRadius = '100%';
    toggleBtn.style.borderColor = buttonColor;
    toggleBtn.style.accentColor = buttonColor;
    toggleBtn.style.backgroundColor = buttonColor;
    toggleBtn.style.backgroundColor = buttonColor;
    toggleBtn.style.zIndex = '100';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.color = 'white';
    document.body.appendChild(toggleBtn);

    window.addEventListener('message', function (event) {
        if (event.origin !== embedUrl) {
            return;
        }
        console.log(JSON.stringify(event.data));
        if (event.data.action === 'grow') {
            iframe.style.width = "400px";
            iframe.style.height = "600px";
        } else if(event.data.action === 'shrink') {
            iframe.style.width = "800px";
            iframe.style.height = "700px";
        }
    });


    var alert = document.createElement('div');
    alert.style.display = showToggleBtnPrompt? 'flex' : none;
    alert.innerHTML = 'Click here to ask me a question!';

    alert.style.boxShadow = "rgba(22, 91, 239, 0.2) 0px 4px 8px";
    alert.style.backgroundColor = '#FFFFFF';
    alert.style.color = "black"

    alert.style.position = 'fixed';
    alert.style.bottom = '20px';
    alert.style.right = '80px';
    alert.style.borderRadius = '10px';
    alert.style.paddingBlock = '0.5em 0.5em';
    alert.style.paddingInline = '1.5em 1.5em';
    alert.style.inline = '1.5em 1.5em';
    alert.style.width = '10%';
    alert.style.justifyContent = 'center';
    alert.style.alignItems = 'center';
    document.body.appendChild(alert);


})('https://chatbot.d2z99dzbnhjdr2.amplifyapp.com', true, '#007bff', true);
