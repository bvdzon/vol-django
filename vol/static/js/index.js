$(document).ready(function () {
    // From https://github.com/twitter/typeahead.js/blob/master/doc/bloodhound.md
    // WARNING: While it's possible to get away with it for smaller data sets, prefetched data isn't meant
    // to contain entire sets of data. Rather, it should act as a first-level cache. Ignoring this warning
    // means you'll run the risk of hitting local storage limits.
    var interests = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: 'static/data/interests.json',
            cacheKey: 'interests', // Key that data will be stored in local storage under. Defaults to value of url.
            ttl: 300,              // 5 minutes (vs the default of 1 day)
        }
    });

    var locations = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
            url: 'static/data/locations.json',
            cacheKey: 'locations', // Key that data will be stored in local storage under. Defaults to value of url.
            ttl: 300,              // 5 minutes (vs the default of 1 day)
        },
    });

    function interestsWithDefaults(q, sync) {
        if (q === '') {
            //  console.log(interests.get('Nature', 'People', 'Animals')); // Should return ["Nature"]
            sync(interests.get("Youth", "Animal Welfare", "Community Service", "Mental Health", "IT"));

        } else {
            interests.search(q, sync);
        }
    }

    function locationsWithDefaults(q, sync) {
        if (q === '') {
            //  console.log(locations.get('Wellington', 'ChristChurch', 'Auckland')); // Should return ["Wellington"]
            sync(locations.get('Wellington', 'London', 'Auckland'));
        } else {
            locations.search(q, sync);
        }
    }

    $('#interests .typeahead').typeahead({
            minLength: 0,
            highlight: true,

        },
        {
            name: 'interests',
            limit: 20,
            source: interestsWithDefaults
        });

    $('#locations .typeahead').typeahead({
            minLength: 0,
            highlight: true,
        },
        {
            name: 'locations',
            limit: 20,
            source: locationsWithDefaults
        });


    $('#submit').on('click', function (e) {
        var interestsInput = $("#interestsInput").val();
        var locationInput = $("#locationInput").val();

        if (interestsInput == "") interestsInput = "Youth";   // Same values, but less descriptive than the placeholder
        if (locationInput == "") locationInput = "Wellington"; // TODO: get default location from browser

        target = '/results/' + locationInput + '/' + interestsInput;
        location.href = target;
        return false;
    });
});