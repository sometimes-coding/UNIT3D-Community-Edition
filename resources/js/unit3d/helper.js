class facetedSearchBuilder {
    constructor() {
        this.active = '';
        this.start = 0;
        this.memory = {};
        this.api = '';
        this.xhr = new XMLHttpRequest();
        this.csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    }
    show(page,nav) {
        var search = $("#search").val();
        var description = $("#description").val();
        var uploader = $("#uploader").val();
        var imdb = $("#imdb").val();
        var tvdb = $("#tvdb").val();
        var tmdb = $("#tmdb").val();
        var mal = $("#mal").val();
        var categories = [];
        var types = [];
        var genres = [];
        var qty = $("#qty").val();
        var freeleech = (function () {
            if ($("#freeleech").is(":checked")) {
                return $("#freeleech").val();
            }
        })();
        var doubleupload = (function () {
            if ($("#doubleupload").is(":checked")) {
                return $("#doubleupload").val();
            }
        })();
        var featured = (function () {
            if ($("#featured").is(":checked")) {
                return $("#featured").val();
            }
        })();
        var stream = (function () {
            if ($("#stream").is(":checked")) {
                return $("#stream").val();
            }
        })();
        var highspeed = (function () {
            if ($("#highspeed").is(":checked")) {
                return $("#highspeed").val();
            }
        })();
        var sd = (function () {
            if ($("#sd").is(":checked")) {
                return $("#sd").val();
            }
        })();
        var internal = (function () {
            if ($("#internal").is(":checked")) {
                return $("#internal").val();
            }
        })();
        var alive = (function () {
            if ($("#alive").is(":checked")) {
                return $("#alive").val();
            }
        })();
        var dying = (function () {
            if ($("#dying").is(":checked")) {
                return $("#dying").val();
            }
        })();
        var dead = (function () {
            if ($("#dead").is(":checked")) {
                return $("#dead").val();
            }
        })();
        $(".category:checked").each(function () {
            categories.push($(this).val());
        });
        $(".type:checked").each(function () {
            types.push($(this).val());
        });
        $(".genre:checked").each(function () {
            genres.push($(this).val());
        });

        if (this.view == 'card') {
            var sorting = $("#sorting").val();
            var direction = $("#direction").val();
            qty = 33;
        } else if(this.view == 'group') {
            var sorting = $("#sorting").val();
            var direction = $("#direction").val();
        } else {

            if ($('#created_at').attr('state') && $('#created_at').attr('state') > 0) {
                var sorting = 'created_at';
                if ($('#created_at').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#created_at').attr('state') == 2) {
                    var direction = 'desc';
                }
            }
            if ($('#name').attr('state') && $('#name').attr('state') > 0) {
                var sorting = 'name';
                if ($('#name').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#name').attr('state') == 2) {
                    var direction = 'desc';
                }
            }
            if ($('#seeders').attr('state') && $('#seeders').attr('state') > 0) {
                var sorting = 'seeders';
                if ($('#seeders').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#seeders').attr('state') == 2) {
                    var direction = 'desc';
                }
            }
            if ($('#leechers').attr('state') && $('#leechers').attr('state') > 0) {
                var sorting = 'leechers';
                if ($('#leechers').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#leechers').attr('state') == 2) {
                    var direction = 'desc';
                }
            }
            if ($('#times_completed').attr('state') && $('#times_completed').attr('state') > 0) {
                var sorting = 'times_completed';
                if ($('#times_completed').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#times_completed').attr('state') == 2) {
                    var direction = 'desc';
                }
            }
            if ($('#size').attr('state') && $('#size').attr('state') > 0) {
                var sorting = 'size';
                if ($('#size').attr('state') == 1) {
                    var direction = 'asc';
                } else if ($('#size').attr('state') == 2) {
                    var direction = 'desc';
                }
            }

        }
        this.xhr = $.ajax({
            url: this.api,
            data: {
                _token: this.csrf,
                search: search,
                description: description,
                uploader: uploader,
                imdb: imdb,
                tvdb: tvdb,
                view: this.view,
                tmdb: tmdb,
                mal: mal,
                categories: categories,
                types: types,
                genres: genres,
                freeleech: freeleech,
                doubleupload: doubleupload,
                featured: featured,
                stream: stream,
                highspeed: highspeed,
                sd: sd,
                internal: internal,
                alive: alive,
                dying: dying,
                dead: dead,
                sorting: sorting,
                direction: direction,
                page: page,
                qty: qty
            },
            type: 'get',
            beforeSend: function () {
                $("#facetedSearch").html('<i class="fa-spinner fa-spin fa-3x fa-fw"></i>')
            }
        }).done(function (e) {
            $data = $(e);
            $("#facetedSearch").html($data);
            if (page) {
                $("#facetedHeader")[0].scrollIntoView();
            }
            if (!nav) {
                if (window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ' ');
                }
            }
            torrentBookmark.update();
            facetedSearch.refresh();
        });
    }
    inform() {
        return this.active;
    }
    handle(id) {
        var trigger = $('#'+id).attr('trigger');
        this.active = id;
        if(trigger && trigger == 'keyup') {
            var length = $('#'+id).val().length;
            if(length == this.memory[id]) return;
            this.memory[id] = length;
        } else if(trigger && trigger == 'sort') {
            $('.facetedSort').each(function() {
                if($(this).attr('id') && $(this).attr('id') == facetedSearch.inform()) {
                    if($('#'+id).attr('state') && ($('#'+id).attr('state') == 0 || $('#'+id).attr('state') == 2)) {
                        $('#'+id).attr('state',1);
                    } else if($('#'+id).attr('state') && ($('#'+id).attr('state') == 1)) {
                        $('#'+id).attr('state',2);
                    } else {
                        $('#'+id).attr('state',1);
                    }
                } else {
                    $(this).attr('state', 0);
                }
            });
        }
        this.show(0);
    }
    refresh(callback) {
        $('.facetedSearch').each(function() {
            var trigger = $(this).attr("trigger") ? $(this).attr("trigger") : 'click';
            var cloner = trigger;
            if(cloner == 'sort') { cloner='click'; }
            $(this).off(cloner);
            $(this).on(cloner, function(e) {
                if($(this).attr('trigger') == 'sort') {
                    e.preventDefault();
                }
                facetedSearch.handle($(this).attr('id'));
            });
        });
        $('#facetedFiltersToggle').off('click');
        $('#facetedFiltersToggle').on('click', function(e) {
            e.preventDefault();
            if ($('#facetedFilters').css('display') == 'none'){
                $('#facetedFilters').css({ 'display': 'block' });
                return;
            }
            $('#facetedFilters').css({ 'display': 'none' });
        });
        if(callback) {
            callback();
        }
    }
    force() {
        this.show(this.start,true);
    }
    init(type) {
        this.type = type;
        if (this.type == 'card') {
            this.api = '/filterTorrents';
            this.view = 'card';
        }
        else if (this.type == 'request') {
            this.api = '/filterRequests';
            this.view = 'request';
        }
        else if (this.type == 'group') {
            this.api = '/filterTorrents';
            this.view = 'group';
        }
        else {
            this.api = '/filterTorrents';
            this.view = 'list';
        }

        var page = 0;
        if (window.location.hash && window.location.hash.indexOf('page')) {
            page = parseInt(window.location.hash.split('/')[1]);
        }
        if (page && page > 0) {
            this.start = page;
            this.refresh(function() { facetedSearch.force(); });
        }
        else {
            this.refresh(function() { });
        }
    }
}
class torrentBookmarkBuilder {
    constructor() {
        this.xhr = new XMLHttpRequest();
        this.csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    }
    update() {
        $('.torrentBookmark').each(function() {
            var active = $(this).attr("state") ? $(this).attr("state") : 0;
            var id = $(this).attr("id") ? $(this).attr("id") : 0;
            $(this).off('click');
            $(this).html('<button data-toggle="tooltip" data-original-title="Bookmark" state="'+active+'" torrent="'+id+'" class="btn ' + (active > 0 ? 'btn-circle btn-danger' : 'btn-circle btn-primary') + '"><i class="fal fa-bookmark"></i></button>');
            $(this).on('click', function() {
                torrentBookmark.handle($(this).attr("torrent"),$(this).attr("state"));
            });
        });
    }
    handle(id,active) {
        if(!active || active == 0) {
            this.create(id);
            return;
        }
        this.destroy(id);
    }
    create(id) {
        this.xhr = $.ajax({
            url: '/torrents/bookmark/' + id,
            data: {
                _token: this.csrf,
            },
            type: 'get'
        }).done(function (e) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Torrent Has Been Bookmarked Successfully!',
                showConfirmButton: false,
                timer: 4500,
            });
            $('#torrentBookmark'+id).html('<button data-toggle="tooltip" data-original-title="Bookmark" state="1" torrent="'+id+'" class="btn btn-circle btn-danger"><i class="fal fa-bookmark"></i></button>');
            $('#torrentBookmark'+id).attr("state",'1');
        });
    }
    destroy(id) {
        this.xhr = $.ajax({
            url: '/torrents/unbookmark/' + id,
            data: {
                _token: this.csrf,
            },
            type: 'get'
        }).done(function (e) {
            swal({
                position: 'center',
                type: 'success',
                title: 'Torrent Has Been Unbookmarked Successfully!',
                showConfirmButton: false,
                timer: 4500,
            });
            $('#torrentBookmark'+id).html('<button data-toggle="tooltip" data-original-title="Bookmark" state="0" torrent="'+id+'" class="btn btn-circle btn-primary"><i class="fal fa-bookmark"></i></button>');
            $('#torrentBookmark'+id).attr("state",'0');
        });
    }
}
$(document).ajaxComplete(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function () {
    if (document.getElementById('request-form-description')) {
        $('#request-form-description').wysibb({});
        emoji.textcomplete()
    }
    if(document.getElementById('facetedSearch')) {
        var facetedType = document.getElementById('facetedSearch').getAttribute('type');
        facetedSearch.init(facetedType);
    }
    torrentBookmark.update();
});
$(document).on('click', '.pagination a', function (e) {
    if(!document.getElementById('facetedSearch')) return;
    e.preventDefault();
    var sub = null;
    if (window.location.hash && window.location.hash.substring) {
        sub = window.location.hash.substring(1).split('/')[0];
    }
    if (!sub) {
        sub = 'page';
    }
    var link_url = $(this).attr('href');
    var page = parseInt(link_url.split('page=')[1]);
    var url = (window.location.href.split("#")[0]) + '#'+sub+'/' + page;
    if (window.history && window.history.pushState) {
        window.history.pushState("", "", url);
    }
    facetedSearch.show(page,true);
});
const facetedSearch = new facetedSearchBuilder();
const torrentBookmark = new torrentBookmarkBuilder();