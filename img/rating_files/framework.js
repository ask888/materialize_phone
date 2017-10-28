(function(){

    var CONFIG = {
        ptype: 0 /* regular page for default */,
        retag_min_page_views: 1, /* always show retag for default */
        regular_script: function() {},
        retag_script: function() {}
    };

    // ---------------------------------------------------------
    // just extend CONFIG with window.SPX_CONF
    extendConfig();

    // increment v_cnt cookie value (for session)
    updateVisitsCount();

    // set cookie has_affsub if affsub parameter exists in url
    checkAffSub();

    // execute functions from CONFIG.regular array
    executeRegularScript();

    // execute functions from CONFIG.retag array if needed
    var visits_count = getVisitsCount();
    var reach_min_visits = (visits_count >= CONFIG.retag_min_page_views);
    var has_affsub = hasAffSub();
    if(!has_affsub && reach_min_visits) {
        executeRetagScript();
    }

    // ---------------------------------------------------------
    function extendConfig() {
        window.SPX_CONF = window.SPX_CONF || {};
        for(var key in window.SPX_CONF) {
            CONFIG[key] = window.SPX_CONF[key];
        }
    }

    function updateVisitsCount() {
        var count = getVisitsCount();
        count ++;
        createCookie('v_cnt', count, 0);
    }

    function getVisitsCount() {
        var count = readCookie('v_cnt');
        return parseInt(count) || 0;
    }

    function checkAffSub() {
        var regex = new RegExp("[\\?&]aff_sub=([^&#]*)");
        var result = regex.exec(window.location.search);
        if (result) {
            createCookie('has_affsub', '1', 0);
        }
    }

    function hasAffSub() {
        var has_affsub = readCookie('has_affsub');
        return (has_affsub === '1');
    }

    function executeRegularScript() {
        try {
            CONFIG.regular_script();
        } catch(e) {
            console && console.log && console.log('can not execute regular script!', e);
        }
    }

    function executeRetagScript() {
        try {
            CONFIG.retag_script();
        } catch(e) {
            console && console.log && console.log('can not execute retag script!', e);
        }
    }

    // ---------------------------------------------------------
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
})();
