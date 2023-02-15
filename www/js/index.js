/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    $('.sidenav').sidenav();
    M.Tabs.init($('.tabs'), {swipeable: true})
    M.Tabs.getInstance($(".tabs")).select('div-tab-1')
    $("#loadArticlesButton").click(loadArticles)

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    $("#cameraButton").click(function() {
        let cameraOptions = {}
        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions)
    })


}

function cameraSuccess(imageData) {
    let image = document.getElementById("image")
    image.src = "data:image/jpeg;base64," + imageData
}

function cameraError(message) {
    alert(message)
}

function loadArticles() {

    $(".collection-item").remove()
    $.ajax({
        method: "GET",
        url: "https://api.spaceflightnewsapi.net/v3/articles?_limit=8",
        dataType: "json",   // necessitem això pq ens retorni un objecte JSON
    }).done(function (msg) {
        for(let item in msg) {
            console.log(msg[item]);
            title = msg[item].title

            let html = `
            <div class="col s12 m6 l3">
            <div class="card">
            <div class="card-image">
            <img src="${msg[item].imageUrl}">
            <span class="card-title">${msg[item].title}</span>
            </div>
            <div class="card-content">
            <p>${msg[item].summary}</p>
            </div>
            <div class="card-action">
            <a href="${msg[item].url}">Full article</a>
            </div>
            </div>
            </div>`

            $("#div-tab-3 .row").append(html)
            $("#articleList").append(`<li class="collection-item" id="${item}"><div>${title}<a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>`)
            $(`#${item}`).off().on("click", function() {
                let html = `
                <div class="card-image">
                <img src="${msg[item].imageUrl}">
                <span class="card-title">${msg[item].title}</span>
                </div>
                <div class="card-content">
                <p>${msg[item].summary}</p>
                </div>
                <div class="card-action">
                <a href="${msg[item].url}">Full article</a>
                </div>
                `
                $("#articleCard").html(html)

                M.Tabs.getInstance($(".tabs")).select('div-tab-2')
            })
        };
    }).fail(function () {
        alert("ERROR");
    });
}