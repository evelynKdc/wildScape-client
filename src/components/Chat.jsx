
import React, { Component } from 'react'

export class Chat extends Component {

    componentDidMount(){

        (function(d, m){
            var kommunicateSettings = 
                {"appId":"3258dbe79f221a588e40ec93d6b85fdb1","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});

    }
  render() {
    return (
      <></>
    )
  }
}


export default Chat