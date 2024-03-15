var Locator = (function () {
    function init() {
        $(document).ready(function () {
            initBranchMap();
        });
    }

    function initBranchMap() {
        $(".open-search-options").on('click', function (e) {
            $(this).addClass("active");
            $(".branch-map-search").fadeIn();
        });

        $(".close-search-options").on('click', function (e) {
            $(".branch-map-search").fadeOut();
            $(".open-search-options").removeClass("active");
        });

        var map_cont = $("#branch_map");
        if (map_cont.length > 0) {
            var mapOpts = {
                zoom: 15,
                center: new google.maps.LatLng(map_cont.attr("data-lat"), map_cont.attr("data-lon")),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                fullscreenControl: false,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };

            var map = new google.maps.Map(document.getElementById("branch_map"), mapOpts);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(map_cont.attr("data-lat"), map_cont.attr("data-lon")),
                map: map,
                icon: {
                    url: '/images/branch_pin.png'
                }
            });
            marker.setMap(map);
        }
    }

    return {
        Init: init
    };
}());

var Maps = (function () {
    function initialize() {
        $(document).ready(function () {
            var mapCanvas = document.getElementById('map_canvas');
            var mapOptions = {
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                fullscreenControl: false,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            }
            var head = document.getElementsByTagName('head')[0];

            // Save the original method
            var insertBefore = head.insertBefore;

            // Replace it!
            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0) {
                    return;
                }

                insertBefore.call(head, newElement, referenceElement);
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);

            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];
                marker.setMap(map);
                var infowindow = new google.maps.InfoWindow({
                    pixelOffset: new google.maps.Size(250, 150)
                });
                bounds.extend(marker.position);

                var lat = 0, lng = 0;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude,
                            lng = position.coords.longitude;
                    },
                        function () {
                        });
                }

                var myOptions = {
                    disableAutoPan: false
                    , maxWidth: 0
                    , pixelOffset: new google.maps.Size(30, -50)
                    , zIndex: null,
                    boxClass: "infowindow branch"
                    , boxStyle: {
                        background: "#fff"
                        , opacity: 1
                        , width: "260px"
                    }
                    , closeBoxURL: ""
                    , infoBoxClearance: new google.maps.Size(1, 1)
                    , isHidden: false
                    , pane: "floatPane"
                    , enableEventPropagation: false
                };

                var ib = new InfoBox(myOptions);

                google.maps.event.addListener(marker,
                    'click',
                    (function (marker) {
                        return function () {
                            var address = $("<div/>").html(marker.ccs_address).text();
                            var boxText = document.createElement("div");
                            boxText.innerHTML = '<div class="infowindow-content">' +
                                '<div class="infowindow-main-content">' +
                                '<img src="/images/infowindow-arrow.svg" class="infowindow-arrow">' +
                                '<div class="location-info-title">' +
                                '<div class="location-info-heading">' +
                                '<h2 class="location-info-inline">' + marker.ccs_name + '</h2></div></div>' +
                                '<div class="location-info-address">' + address + ', ' + marker.ccs_city + ' ' + marker.ccs_province + ' ' + marker.ccs_zip + '</div>' + '<div>' + marker.ccs_contacts + '</div>' + '<div>' + marker.ccs_hours + '</div>' + '</div>' +
                                '<div class="infowindow-footer row"><div class="col-6 images-content">' +
                                '<a class="location-info-button" href="http://maps.google.com/maps?daddr=' + marker.getPosition().lat() + ',+' + marker.getPosition().lng() + '" target="_blank">' +
                                '<img src="/images/ic_directions.svg" height="31" width="31"><div>Directions</div></a></div>' +
                                '<div class="col-6 images-content"><a class="location-info-button" href="/contact/find-a-branch?show=branchDetail&amp;branch_id=' + marker.ccs_id + '">' +
                                '<img src="/images/ic_moreinfo@1x.svg" height="31" width="31"><div>More Info</div></a></div></div></div>';

                            ib.setContent(boxText);
                            $('.infowindow.atm').remove();
                            ib.open(map, marker);
                            $('.infowindow.branch').show();
                        }
                    })(marker));
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    map.setCenter(pos);
                },
                    function () {
                        map.fitBounds(bounds);
                    });
            } else {
                map.fitBounds(bounds);
            }

            google.maps.event.addListener(map,
                'idle',
                function () {
                    showVisibleMarkers(map);
                });

            $(document).mouseup(function (e) {
                var branchInfo = $(".infowindow.branch");
                var atmInfo = $(".infowindow.atm");

                if (branchInfo.length) {
                    // if the target of the click isn't the container nor a descendant of the container
                    if (!branchInfo.is(e.target) && branchInfo.has(e.target).length === 0) {
                        branchInfo.hide();
                    }
                }

                if (atmInfo.length) {
                    // if the target of the click isn't the container nor a descendant of the container
                    if (!atmInfo.is(e.target) && atmInfo.has(e.target).length === 0) {
                        atmInfo.hide();
                    }
                }
            });

            $('#branchMap_Search').keyup(delay(function (e) {
                branchFilter(map);
                toggleATM(map);
            }, 500));

            $(document).on('click', '#btn_branchMapSearch', function () {
                var val = $("#branchMap_Search").val().trim();

                if (val !== "") {
                    branchFilter(map);
                    toggleATM(map);
                }
            });
        });
    }

    function delay(callback, ms) {
        var timer = 0;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                callback.apply(context, args);
            }, ms || 0);
        };
    }

    function branchFilter(map) {
        var val = $("#branchMap_Search").val().trim(), count = 0;
        var bounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            marker = markers[i];
            var visible = true;
            var infoPanel = $(".branch-filter[data_id='" + marker.get("ccs_id") + "']");

            if (val === "") {
                visible = true;
            } else {
                if (marker.ccs_address.toUpperCase().includes(val.toUpperCase())) {
                    visible = true;
                } else if (marker.ccs_zip.toUpperCase().includes(val.toUpperCase())) {
                    visible = true;
                } else if (marker.ccs_city.toUpperCase().includes(val.toUpperCase())) {
                    visible = true;
                }
                else if (marker.ccs_name != null) {
                    if (marker.ccs_name.toUpperCase().includes(val.toUpperCase())) {
                        visible = true;
                    }
                }
                else {
                    visible = false;
                }
            }

            if (visible) {
                count++;
                marker.setVisible(true);
                infoPanel.addClass("map-visible");

                bounds.extend(marker.position);
            } else {
                marker.setVisible(false);
                infoPanel.css("display", "").removeClass("map-visible");
            }
        }

        if (count > 0) {
            map.fitBounds(bounds);
            var zoom = map.getZoom();
            map.setZoom(zoom > 15 ? 15 : zoom);
        }
    }

    function toggleATM(map) {
        var val = $("#branchMap_Search").val().trim(), count = 0;
        var bounds = new google.maps.LatLngBounds();

        addATMMarkers(map);

        for (i = 0; i < markers.length; i++) {
            marker = markers[i];
            var visible = true;

            if (marker.ccs_Type === "ATM") {
                if (val === "") {
                    visible = true;
                }

                else {
                    if (marker.ccs_address.toUpperCase().includes(val.toUpperCase())) {
                        visible = true;
                    } else if (marker.ccs_zip.toUpperCase().includes(val.toUpperCase())) {
                        visible = true;
                    } else if (marker.ccs_city.toUpperCase().includes(val.toUpperCase())) {
                        visible = true;
                    } else {
                        visible = false;
                    }
                }

                if (visible) {
                    count++;
                    marker.setVisible(true);

                    bounds.extend(marker.position);

                    if ($(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']").length == 0) {
                        var atmsList = document.createElement("div");
                        atmsList.setAttribute("id", 'a_' + marker.ccs_ATMID);
                        atmsList.setAttribute("class", "atm-filter");
                        atmsList.setAttribute("data-id", 'atm_' + marker.ccs_ATMID);
                        atmsList.innerHTML = '<div class="row">' +
                            '<div class="col-9">' +
                            '<div class="row">' +
                            '<div class="col-2 no-pad-right">' +
                            ' <img class="pin" src="/images/ATM_Icon_V1.svg" alt="' + marker.ccs_Title + '" />' +
                            '</div>' +
                            '<div class="col-10 no-pad-right">' +
                            ' <div class="atm-title">' +
                            ' <span class="title">' + marker.ccs_Title + '</span>' +
                            '</div>' +
                            '<div class="street-address">' +
                            '<span class="street">' + marker.ccs_address + '</span> ' +
                            '<span class="city">' + marker.ccs_city + '</span> ' +
                            '<span class="province">' + marker.ccs_province + '</span> ' +
                            '<span class="postal-code">' + marker.ccs_zip + '</span> ' +
                            '</div>' +
                            '<div class="see-more">' +
                            '<a onclick="Maps.TriggerMarker(\'atm_' +
                            marker.ccs_ATMID +
                            '\');$(\'.atm-filter[id != \\\'a_' +
                            marker.ccs_ATMID +
                            '\\\']\').removeClass(\'open\'); $(\'#a_' +
                            marker.ccs_ATMID +
                            '\').toggleClass(\'open\'); ">See Details </a>' +
                            '</div> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div> ' +
                            '<div class="col-3"><span id="distance-indicator"></span></div>' +
                            '</div> ' +
                            '<div class="row inner-info">' +
                            '<div class="col-12 operated-by">' +
                            '<span class="operator">Operated by</span>' +
                            '<span class="owner">' + marker.ccs_owner + '</span>' +
                            '</div>' +
                            '<div class="col-12 pad-images">' +
                            '<div class="direction">' +
                            '<a href="http://maps.google.com/maps?daddr=' + marker.getPosition().lat() + ',+' + marker.getPosition().lng() + '" target="_blank">' +
                            '<img src="/images/ic_directions.svg" />' +
                            '<span>Directions</span></a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-12 hide-details">' +
                            '<a onclick="Maps.TriggerMarker(\'atm_' +
                            marker.ccs_ATMID +
                            '\');$(\'.atm-filter[id != \\\'a_' +
                            marker.ccs_ATMID +
                            '\\\']\').removeClass(\'open\'); $(\'#a_' +
                            marker.ccs_ATMID +
                            '\').toggleClass(\'open\'); ">Hide Details </a>' +
                            '</div></div></div>';

                        var atmNode = $(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']");
                        atmNode.addClass("map-visible");
                    }
                } else {
                    marker.setVisible(false);
                    var removeAtmNode = $(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']");
                    removeAtmNode.remove();
                }
            }
        }

        if (count > 0) {
            map.fitBounds(bounds);
            var zoom = map.getZoom();
            map.setZoom(zoom > 15 ? 15 : zoom);
        }
    }

    function addATMMarkers(map) {
        var bounds = map.getBounds();
        var atmArray;
        if (bounds !== undefined) {
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();

            var data = {
              'lat1': ne.lat().toString(),
              'long1': ne.lng().toString(),
              'lat2': sw.lat().toString(),
              'long2': sw.lng().toString(),
              'language': "en",
                //'deposits': deposits,
                //'allDay': allDay,
                //'drive': drive
            };
            $.ajax({
              url: '/umbraco/api/ATMApi/GetATMByBounds',
                async: true,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                data: JSON.stringify(data),
                success: function (data) {
                    atmArray = data;
        for (var i = 0; i < atmArray.length; i++) {
            var atm = atmArray[i];
            var exists = false;
            for (var xi = 0; xi < markers.length; xi++) {
                if (markers[xi].ccs_id == 'atm_' + atm.atmId) {
                    markers[xi].setVisible(true);
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                var subtitle = '';
                if (atm.isCCS == false) {
                    subtitle = " operated by " + atm.owner;
                }
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(atm.latitude, atm.longitude),
                    map: map,
                    icon: "/images/ATM_pin.png",
                    animation: google.maps.Animation.DROP
                });
              var address = atm.street;
              if (atm.streetNumber) {
                address = atm.streetNumber + ' ' + address;
              }
              if (atm.streetType) {
                address = address + ' ' + atm.streetType;
              }
              if (atm.streetDirection) {
                address = address + ' ' + atm.streetDirection;
              }
                marker.set("ccs_id", 'atm_' + atm.atmId);
                marker.set("ccs_ATMID", atm.atmId);
                marker.set("ccs_Type", 'ATM');
                marker.set("ccs_Title", atm.title);
                marker.set("ccs_SubTitle", subtitle);
                marker.set("ccs_Type", 'ATM');
                marker.set("ccs_address", address);
                marker.set("ccs_zip", atm.postalCode);
                marker.set("ccs_city", atm.city);
                marker.set("ccs_province", atm.province);
                marker.set("ccs_owner", atm.owner);
                marker.set("ccs_ccua", atm.isCCUA);
                marker.set("ccs_excahnge", atm.isExchange);
                marker.set("ccs_acceptDeposits", atm.acceptsDeposits);
                marker.set("ccs_is24", atm.is24);
                marker.set("ccs_isDriveThru", atm.isDriveThru);
                marker.set("ccs_language", atm.languages);
                markers.push(marker);

                marker.setMap(map);
                var infowindow = new google.maps.InfoWindow({
                    pixelOffset: new google.maps.Size(250, 150)
                });
                bounds.extend(marker.position);

                var lat = 0, lng = 0;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude,
                            lng = position.coords.longitude;
                    },
                        function () {
                        });
                }

                google.maps.event.addListener(marker,
                    'click',
                    (function (marker) {
                        return function () {
                            var myOptions = {
                                disableAutoPan: false,
                                maxWidth: 0,
                                pixelOffset: new google.maps.Size(30, -50),
                                zIndex: null,
                                boxClass: "infowindow atm " + marker.ccs_id,
                                boxStyle: {
                                    background: "#fff",
                                    opacity: 1,
                                    width: "220px"
                                },
                                closeBoxURL: "",
                                infoBoxClearance: new google.maps.Size(1, 1),
                                isHidden: false,
                                pane: "floatPane",
                                enableEventPropagation: false
                            };

                            var ib = new InfoBox(myOptions);
                            var boxText = document.createElement("div");
                            boxText.innerHTML = '<div class="infowindow-content">' +
                                '<div class="infowindow-main-content">' +
                                '<img src="/images/infowindow-arrow.svg" class="infowindow-arrow">' +
                                '<div class="location-info-title">' +
                                '<div class="location-info-heading">' +
                                '<h2 class="location-info-inline">' +
                                marker.ccs_Title +
                                '<span>' +
                                marker.ccs_SubTitle +
                                '</span></h2></div></div>' +
                                '<p class="">' +
                                marker.ccs_address +
                                ', ' +
                                marker.ccs_city +
                                ' ' +
                                marker.ccs_province +
                                ' ' +
                                marker.ccs_zip +
                                '</p></div>' +
                                '<div class="infowindow-footer"><div class="col-12 images-content">' +
                                '<a class="location-info-button" href="http://maps.google.com/maps?daddr=' + marker.getPosition().lat() + ',+' + marker.getPosition().lng() + '" target="_blank">' +
                                '<img src="/images/ic_directions.svg" height="31" width="31"><div>Directions</div></a></div>' +
                                '</div></div>';

                            ib.setContent(boxText);
                            $('.infowindow.atm').remove();
                            $('.infowindow.branch').hide();
                            ib.open(map, marker);
                        }
                    })(marker));
                var imgs = '';

                if (atm.isCCUA == true && atm.isExchange == true) {
                    imgs =
                        '<img alt="icon of ding free network" title="ding free network" src="/images/dingfree.gif"><img alt="icon of acculink network" title="acculink network" src="/images/acculink.gif"><img alt="icon of exchange network" title="exchange network" src="/images/exchange.gif">';
                } else if (atm.isCCUA == false && atm.isExchange == true) {
                    imgs =
                        '<img alt="icon of ding free network" title="ding free network" src="/images/dingfree.gif"><img alt="icon of exchange network" title="exchange network" src="/images/exchange.gif">';
                } else if (atm.isCCUA == true && atm.isExchange == false) {
                    imgs =
                        '<img alt="icon of ding free network" title="ding free network" src="/images/dingfree.gif"><img alt="icon of acculink network" title="acculink network" src="/images/acculink.gif">';
                } else {
                    imgs =
                        '<img alt="icon of ding free network" title="ding free network" src="/images/dingfree.gif">';
                }

                $(".filter-container").append('<div id="a_' +
                    atm.atmId +
                    '" class="branch-filter map-visible atm" data_id="' +
                    atm.atmId +
                    '">' +
                    '<div class="row"><div class="col-6"><img class="pin" src="/images/ATM_pin.png" alt="" /></div><div class="col-6"><span id="distance-indicator"></span></div>' +
                    '</div><div class="row"><div class="col-12 title">' +
                    atm.title +
                    '<span>' +
                    subtitle +
                    '</span></div>' +
                    '</div><div class="row">' +
                    '<div class="col-12  address-container"><span class="street-address">' +
                    atm.street +
                    '</span>' +
                    '<span class="locality">' +
                    atm.city +
                    '</span>' +
                    '<abbr class="region">' +
                    atm.province +
                    '</abbr><br>' +
                    '<span class="postal-code">' +
                    atm.postalCode +
                    '</span></div>' +
                    '</div><div class="row inner-info"><div class="col-12"><div class="row"><div class="col-6"><div class="direction"><a href="http://maps.google.com/maps?daddr=@item.GetPropertyValue(DataProperties.Widgets.BranchLocator.Latitude),+@item.GetPropertyValue(DataProperties.Widgets.BranchLocator.Longitude)"><img src="/images/ic_directions.svg" /><span>Directions</span></a>' +
                    '</div></div><div class="col-6 images">' +
                    imgs +
                    '</div></div></div></div>' +
                    '<div class="expand-icon" onclick="Maps.TriggerMarker(\'atm_' +
                    atm.atmId +
                    '\');$(\'.branch-filter[id != \\\'a_' +
                    atm.atmId +
                    '\\\']\').removeClass(\'open\'); $(\'#a_' +
                    atm.atmId +
                    '\').toggleClass(\'open\'); "><i class="fas fa-caret-down expand-list"></i><i class="fas fa-caret-up collapse-list"></i></div></div>');
            }
        }
              }
            });
      }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            },
            );
        }
    }

    function showVisibleMarkers(map) {
        var bounds = map.getBounds(), count = 0;
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i], infoPanel = $(".branch-filter[data_id='" + marker.get("ccs_id") + "']");

            if (bounds != null && bounds.contains(marker.getPosition()) === true && marker.visible) {
                if (marker.ccs_Type == "Branch") {
                    infoPanel.addClass("map-visible");
                }

                else if (marker.ccs_Type == "ATM") {

                    if ($(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']").length == 0) {
                        var atmsList = document.createElement("div");
                        atmsList.setAttribute("id", 'a_' + marker.ccs_ATMID);
                        atmsList.setAttribute("class", "atm-filter");
                        atmsList.setAttribute("data-id", 'atm_' + marker.ccs_ATMID);
                        atmsList.innerHTML = '<div class="row">' +
                            '<div class="col-9">' +
                            '<div class="row">' +
                            '<div class="col-2 no-pad-right">' +
                            ' <img class="pin" src="/images/ATM_Icon_V1.svg" alt="' + marker.ccs_Title + '" />' +
                            '</div>' +
                            '<div class="col-10 no-pad-right">' +
                            ' <div class="atm-title">' +
                            ' <span class="title">' + marker.ccs_Title + '</span>' +
                            '</div>' +
                            '<div class="street-address">' +
                            '<span class="street">' + marker.ccs_address + '</span> ' +
                            '<span class="city">' + marker.ccs_city + '</span> ' +
                            '<span class="province">' + marker.ccs_province + '</span> ' +
                            '<span class="postal-code">' + marker.ccs_zip + '</span> ' +
                            '</div>' +
                            '<div class="see-more">' +
                            '<a onclick="Maps.TriggerMarker(\'atm_' +
                            marker.ccs_ATMID +
                            '\');$(\'.atm-filter[id != \\\'a_' +
                            marker.ccs_ATMID +
                            '\\\']\').removeClass(\'open\'); $(\'#a_' +
                            marker.ccs_ATMID +
                            '\').toggleClass(\'open\'); ">See Details </a>' +
                            '</div> ' +
                            '</div> ' +
                            '</div> ' +
                            '</div> ' +
                            '<div class="col-3"><span id="distance-indicator"></span></div>' +
                            '</div> ' +
                            '<div class="row inner-info">' +
                            '<div class="col-12 operated-by">' +
                            '<span class="operator">Operated by</span>' +
                            '<span class="owner">' + marker.ccs_owner + '</span>' +
                            '</div>' +
                            '<div class="col-12 pad-images">' +
                            '<div class="direction">' +
                            '<a href="http://maps.google.com/maps?daddr=' + marker.getPosition().lat() + ',+' + marker.getPosition().lng() + '" target="_blank">' +
                            '<img src="/images/ic_directions.svg" />' +
                            '<span>Directions</span></a>' +
                            '</div>' +
                            '</div>' +
                            '<div class="col-12 hide-details">' +
                            '<a onclick="Maps.TriggerMarker(\'atm_' +
                            marker.ccs_ATMID +
                            '\');$(\'.atm-filter[id != \\\'a_' +
                            marker.ccs_ATMID +
                            '\\\']\').removeClass(\'open\'); $(\'#a_' +
                            marker.ccs_ATMID +
                            '\').toggleClass(\'open\'); ">Hide Details </a>' +
                            '</div></div></div>';

                        var atmNode = $(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']");
                        atmNode.addClass("map-visible");

                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                var pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                };
                            },
                            );
                        }
                    }
                }

                count++;
            }
            else {
                if (marker.ccs_Type == "Branch") {
                    infoPanel.css("display", "").removeClass("map-visible");
                }

                else if (marker.ccs_Type == "ATM") {
                    var removeAtmNode = $(".atm-filter[id='a_" + marker.get("ccs_ATMID") + "']");
                    removeAtmNode.remove();
                }
            }
        }
    }

    function triggerMarker(id) {
        var outWidht = $(window).outerWidth();

        if (outWidht > 767) {
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];

                if (marker.ccs_id === id) {
                    new google.maps.event.trigger(marker, 'click');
                }
            }
        }
    }

    return {
        Initialize: initialize,
        TriggerMarker: triggerMarker
    }
}());

$(Locator.Init());