/*
 * xpapaya: /home/rherrick/Development/XNAT/miccai/xpapaya/src/main/resources/META-INF/resources/scripts/xnat-plugins/xpapaya/xpapaya.js
 * XNAT http://www.xnat.org
 * Copyright (c) 2016, Washington University School of Medicine
 * All Rights Reserved
 *
 * Released under the Simplified BSD.
 */

function launchPapayaForScan(scanUri) {
    var params = {};
    params.worldSpace = true;
    params.images = []; // this will be set in the ajax callback

    function papayaFunction() {
        xmodal.open({
            width: '90%',
            height: '90%',
            footer: false,
            content: '<div class="xnat-papaya-container"></div>',
            beforeShow: function (obj) {
                // get the div that's inside the dialog
                var _viewer = obj.__modal.find('div.xnat-papaya-container');

                var xnatPapaya = document.createElement("div");
                xnatPapaya.className = "papaya";
                _viewer.append(xnatPapaya);

                // do whatever else you need to do to initialize papaya
                // and use the _viewer as the 'wrapper' div
                papaya.Container.startPapaya();
                papaya.Container.resetViewer(0, params);
            }
        });
    }

    XNAT.xhr.getJSON(XNAT.url.csrfUrl(scanUri), function (data) {
        params.images = data.ResultSet.Result.filter(function (entry) {
            return entry['file_format'] == "DICOM";
        }).map(function (entry) {
            return siteUrl + XNAT.url.restUrl(entry['URI']);
        });
        papayaFunction();
    })
}
