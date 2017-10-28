(function() {
    window.SPX_CONF = {
        ptype: 1,
        retag_min_page_views: 2,
        
        regular_script: function() {
            
        },
        
        retag_script: function() {
    //Utarg
    (new Image(1,1)).src="//utarget.ru/rtcode/b0cb9d513d/?url=1";
           
        }        
    };

     var s = document.createElement( 'script' );
     s.setAttribute( 'src', '//www.dmpcloud.net/spx/framework.js' );
     document.body.appendChild(s);
    
})()
